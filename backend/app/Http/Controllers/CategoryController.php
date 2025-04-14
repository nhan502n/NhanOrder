<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    public function index()
    {
        $category = Category::all();
        return response()->json($category);
    }
    public function getCategories(Request $request)
    {
        $limit = $request->get('limit', 10);
        $products = Category::paginate($limit);
        return response()->json($products);
    }
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp',
            'description' => 'nullable|string',
            'parent_id' => 'nullable|exists:categories,id',
        ]);

        $imageName = null;
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->move(public_path('img'), $imageName);
        }

        $category = new Category();
        $category->name = $request->name;
        $category->image = $imageName;
        $category->description = $request->description;
        $category->parent_id = $request->parent_id;
        $category->save();

        return response()->json($category, 201);
    }

    public function destroy(string $id){
        $category = Category::find($id);
        if (!$category) {
            return response()->json(['message' => 'Danh mục không tồn tại'], 404);
        }else{
            $category->delete();
        return response()->json(['message' => 'Xóa danh mục thành công'], 204);
        }

    }
    public function update(Request $request, string $id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json([
                'error' => 'Danh mục không tồn tại.'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:255',
            'description' => 'sometimes|string|nullable',
            'parent_id' => 'nullable|integer|exists:categories,id',
            'image' => 'sometimes|file|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        if ($request->has('name')) $category->name = $request->name;
        if ($request->has('description')) $category->description = $request->description;
        if ($request->has('parent_id')) $category->parent_id = $request->parent_id;

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->move(public_path('img'), $imageName);
            $category->image = $imageName;
        }

        $category->save();

        return response()->json([
            'message' => 'Danh mục cập nhật thành công!',
            'category' => $category
        ], 200);
    }


}
