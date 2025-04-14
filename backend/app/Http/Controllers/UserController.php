<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Laravel\Sanctum\PersonalAccessToken;
use Illuminate\Support\Str;
use App\Mail\VerifyEmail;

class UserController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['error' => 'Email hoặc mật khẩu không đúng'], 401);
        }

        if (is_null($user->email_verified_at)) {
            return response()->json(['error' => 'Tài khoản chưa được xác minh. Vui lòng kiểm tra email.'], 403);
        }

        try {
            $token = $user->createToken('web')->plainTextToken;
        } catch (\Exception $e) {
            return response()->json(['error' => 'Không thể tạo token.'], 500);
        }

        return response()->json([
            'user' => $user,
            'token' => $token,
        ], 200);
    }

    public function index(){
        $userList = User::all();
        return response()->json($userList);
    }
    public function show(string $id){
        $user = User::find($id);
        return response()->json($user);
    }
    public function confirm($userId, $token, Request $request)
    {
        // Giải mã userId từ base64
        $decodedUserId = (int) base64_decode($userId);  // Đổi tên biến tương ứng

        // Tìm người dùng và kiểm tra token
        $user = User::find($decodedUserId);

        if ($user && $user->verify_token === $token) {
            // Xác minh tài khoản
            $user->email_verified_at = now();
            $user->verify_token = null; // Xóa token sau khi xác minh
            $user->save();

            return view('emails.verify_result', ['message' => 'Xác minh thành công!']);
        }

        return view('emails.verify_result', ['message' => 'Token không hợp lệ.']);
    }





    public function reject($userId, $token, Request $request)
    {
        $decodedUserId = (int) base64_decode($userId);  // Đổi tên biến tương ứng

        // Tìm người dùng và kiểm tra token
        $user = User::find($decodedUserId);

        if ($user && $user->verify_token === $token) {
            $user->verify_token = null; // Xóa token
            $user->save();

            return view('emails.verify_result',['message' => 'Xác minh thất bại!']);
        }

        return view('emails.verify_result', ['message' => 'Token không hợp lệ.']);
    }
    public function hi( $userId, $token)
    {
        echo $userId;
        echo $token;

    }




    public function showVerifyPrompt($userId, $token)
    {
        $decodedUserId = (int) base64_decode($userId);  // Đổi tên biến tương ứng

        // Tìm người dùng và kiểm tra token
        $user = User::find($decodedUserId);

        if (!$user) {
            return view('emails.verify_result', ['message' => 'Người dùng không tồn tại.']);
        }

        // Trường hợp người dùng đã xác minh
        if ($user->email_verified_at !== null) {
            return view('emails.verify_result', ['message' => 'Tài khoản của bạn đã được xác minh trước đó.']);
        }

        // Kiểm tra token
        if ($user->verify_token !== $token) {
            return view('emails.verify_result', ['message' => 'Token không hợp lệ hoặc đã hết hạn.']);
        }

        // Tạo URL xác minh và từ chối
        $confirmUrl = route('verify.confirm', ['userId' => base64_encode($user->id), 'token' => $user->verify_token]);
        $rejectUrl = route('verify.reject', ['userId' => base64_encode($user->id), 'token' => $user->verify_token]);

        return view('emails.verify_prompt', [
            'user' => $user,
            'confirmUrl' => $confirmUrl,
            'rejectUrl' => $rejectUrl
        ]);
    }



    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:users,name',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => 'required|string|min:6',
        ], [
            'name.unique' => 'Tên tài khoản đã tồn tại.',
            'email.unique' => 'Email đã tồn tại.',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        // Tạo user mới và tạo token xác minh
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'verify_token' => Str::random(100)
        ]);

        // Mã hóa userId
        $userId = base64_encode($user->id);  // Đổi tên từ $hashedUserId thành $userId

        // Gửi email xác minh
        try {
            $url = url('/verify/' . $userId . '/' . urlencode($user->verify_token));

            // Gửi email xác minh
            Mail::send('emails.verify', ['user' => $user, 'url' => $url], function ($message) use ($user) {
                $message->to($user->email)
                        ->subject('Xác minh email của bạn');
            });
        } catch (\Exception $e) {
            return response()->json(['error' => 'Không thể gửi email xác nhận: ' . $e->getMessage()], 500);
        }

        return response()->json(['message' => 'Đăng ký thành công! Kiểm tra email để xác nhận.', 'user' => $user], 201);
    }

    public function update(Request $request, string $id) {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'error' => 'User not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:users,name',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => 'required|string|min:6',
        ], [
            'name.unique' => 'Tên tài khoản này đã tồn tại.',
            'email.unique' => 'Email này đã tồn tại.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()
            ], 400);
        }

        // Cập nhật user nếu có trường được gửi lên
        if ($request->has('name')) {
            $user->name = $request->name;
        }
        if ($request->has('email')) {
            $user->email = $request->email;
        }
        if ($request->has('password')) {
            $user->password = Hash::make($request->password);
        }

        $user->save();

        return response()->json([
            'message' => 'User updated successfully!',
            'user' => $user
        ], 200);
    }

    public function destroy(string $id){
        $user = User::find($id);

    if (!$user) {
        return response()->json([
            'error' => 'Người dùng không tồn tại.'
        ], 404);
    }

    $user->delete();

    return response()->json([
        'message' => 'Người dùng đã được xóa thành công!'
    ], 200);
    }
}
