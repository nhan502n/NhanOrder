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
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    public function login(Request $request)
    {
        // Validate thông tin đăng nhập
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where('email', $request->email)->first();

        // Kiểm tra thông tin đăng nhập
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['error' => 'Email hoặc mật khẩu không đúng'], 401);
        }

        // ✅ Tạo token đúng cách
        $token = $user->createToken('auth_token')->plainTextToken;


        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user
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
    public function verifyEmail($token)
    {
        $user = User::where('verify_token', $token)->first();

        if (!$user) {
            return response()->json(['message' => 'Token không hợp lệ hoặc đã được xác minh.'], 400);
        }

        $user->email_verified_at = now(); // Đánh dấu email đã xác minh
        $user->verify_token = null; // Xóa token sau khi xác minh
        $user->save();

        return response()->json(['message' => 'Xác minh email thành công!'], 200);
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
        'verify_token' => Str::random(32)
    ]);

    // Gửi email xác minh
try {
    $url = url('/verify-email/' . $user->verify_token);
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
