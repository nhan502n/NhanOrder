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
        $category=new Category();
        $category->name=$request->name;
        $category->image=$request->image;
        $category->description=$request->description;
        $category->save();
        return response()->json($category,201);

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
    public function update(Request $request, string $id) {
        $category = Category::find($id);

        if (!$category) {
            return response()->json([
                'error' => 'Danh mục không tồn tại.'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:255',
            'image' => 'sometimes|string',
            'description' => 'sometimes|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()
            ], 400);
        }

        // Cập nhật nếu có giá trị mới
        if ($request->has('name')) {
            $category->name = $request->name;
        }
        if ($request->has('image')) {
            $category->image = $request->image;
        }
        if ($request->has('description')) {
            $category->description = $request->description;
        }

        $category->save();

        return response()->json([
            'message' => 'Danh mục cập nhật thành công!',
            'category' => $category
        ], 200);
    }

}
