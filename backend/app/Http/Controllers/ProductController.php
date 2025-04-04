<?php

namespace App\Http\Controllers;
use App;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(){
        $products = Product::with(['category:id,name'])->get();
        return response()->json($products);


    }
    public function getProducts(Request $request)
    {
        $limit = $request->get('limit', 8);
        $products = Product::with(['category:id,name'])->paginate($limit);
        return response()->json($products);
    }

    public function getNewProducts(Request $request)
    {
        $limit = $request->input('limit', 10);

        $products = Product::orderBy('id', 'desc') // <-- lấy id mới nhất
                    ->paginate($limit);

        return response()->json([
            'data' => $products->items(),
            'total' => $products->total(),
        ]);
    }
    // ProductController.php

public function hotPromotion()
{
    $products = Product::select('*')
                ->selectRaw('((price - sale_price) / price * 100) as discount_percent')
                ->where('sale_price', '>', 0)
                ->orderByDesc('discount_percent')
                ->limit(8)
                ->get();

    return response()->json([
        'data' => $products
    ]);
}
public function store(Request $request)
{
    $request->validate([
        'name' => 'required|string|max:255',
        'slug' => 'required|string|max:255|unique:products,slug',
        'image' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
        'price' => 'required|numeric|min:0',
        'sale_price' => 'nullable|numeric|min:0|lte:price', // Không được lớn hơn price
        'description' => 'nullable|string',
        'category_id' => 'required|exists:categories,id',
        'quantity' => 'required|integer|min:1',
    ]);

    // Xử lý upload ảnh
    $imageName = null;
    if ($request->hasFile('image')) {
        $image = $request->file('image');
        $imageName = time() . '_' . $image->getClientOriginalName();

        // Kiểm tra lỗi khi di chuyển ảnh
        if (!$image->move(public_path('img'), $imageName)) {
            return response()->json(['error' => 'Không thể lưu ảnh'], 500);
        }
    }

    // Tạo sản phẩm mới

    $product =new Product();
        $product->name=$request->name;
        $product->slug=$request->slug;
        $product->image=$request->image;
        $product->price=$request->price;
        $product->sale_price=$request->sale_price;
        $product->description=$request->description;
        $product->category_id=$request->category_id;
        $product->quantity=$request->quantity;

    $product->save();
        return response()->json($product,201);
}

public function show($slug)
{
    $productDetail = Product::with(['category:id,name'])
        ->select('*')
        ->selectRaw('COALESCE((price - sale_price) / price * 100, 0) as discount_percent')
        ->where('slug', $slug)
        ->first();

    if (!$productDetail) {
        return response()->json(['message' => 'Sản phẩm không tồn tại'], 404);
    }

    return response()->json($productDetail);
}



    public function product()
    {
        return view('product_show');
    }
    public function detail($id)
    {
        $data = ['id'=>$id];
        return view('product.detail', $data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function addProduct(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:products,slug',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
            'price' => 'required|numeric|min:0',
            'sale_price' => 'nullable|numeric|min:0|lte:price',
            'description' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
            'quantity' => 'required|integer|min:1',
        ], [
            'slug.unique' => 'slug này đã tồn tại.',
        ]);

        $product = new Product();
        $product->name = $request->name;
        $product->slug = $request->slug;
        $product->price = $request->price;
        $product->sale_price = $request->sale_price;
        $product->description = $request->description;
        $product->category_id = $request->category_id;
        $product->quantity = $request->quantity;

        // ✅ Xử lý lưu ảnh
        if ($request->file('image')) {
            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->move(public_path('img'), $imageName);
            $product->image = $imageName;
        }

        $product->save();

        return response()->json([
            'message' => 'Sản phẩm đã được thêm!',
            'product' => $product
        ], 201);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
{
    $product = Product::find($id);

    if (!$product) {
        return response()->json([
            'error' => 'Sản phẩm không tồn tại.'
        ], 404);
    }
    $request->merge([
        'sale_price' => $request->sale_price === "" ? null : $request->sale_price
    ]);

    // Validation chỉ kiểm tra nếu trường đó được gửi lên
    $validator = Validator::make($request->all(), [
        'name' => 'sometimes|string|max:255',
        'slug' => 'sometimes|string|max:255|unique:products,slug,' . $id,
        'image' => 'sometimes|image|mimes:jpg,jpeg,png,gif|max:2048',
        'price' => 'sometimes|numeric|min:0',
        'sale_price' => 'nullable|sometimes|numeric|min:0|lte:price',
        'description' => 'sometimes|string',
        'category_id' => 'sometimes|exists:categories,id',
        'quantity' => 'sometimes|integer|min:1',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'error' => $validator->errors()
        ], 400);
    }

    // Cập nhật nếu có dữ liệu gửi lên
    if ($request->has('name')) {
        $product->name = $request->name;
    }
    if ($request->has('slug')) {
        $product->slug = $request->slug;
    }
    if ($request->has('price')) {
        $product->price = $request->price;
    }
    if ($request->has('sale_price')) {
        $product->sale_price = $request->sale_price;
    }
    if ($request->has('description')) {
        $product->description = $request->description;
    }
    if ($request->has('category_id')) {
        $product->category_id = $request->category_id;
    }
    if ($request->has('quantity')) {
        $product->quantity = $request->quantity;
    }

    // ✅ Xử lý cập nhật ảnh nếu có ảnh mới
    if ($request->hasFile('image')) {
        // Xóa ảnh cũ nếu có
        if ($product->image && file_exists(public_path('img/' . $product->image))) {
            unlink(public_path('img/' . $product->image));
        }

        $image = $request->file('image');
        $imageName = time() . '_' . $image->getClientOriginalName();
        $image->move(public_path('img'), $imageName);
        $product->image = $imageName;
    }


    $product->save();

    return response()->json([
        'message' => 'Sản phẩm đã được cập nhật!',
        'product' => $product
    ], 200);
}


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id){
        $product = Product::find($id);

    if (!$product) {
        return response()->json([
            'error' => 'Sản phẩm không tồn tại.'
        ], 404);
    }
    $product->delete();

    return response()->json(200,[
        'message' => 'Sản phẩm đã được xóa thành công!'
    ]);
    }
}
