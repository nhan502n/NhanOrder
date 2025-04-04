<?php

namespace App\Http\Controllers;
use App\Models\Product;
use Illuminate\Http\Request;

class PageController extends Controller
{
    public function home(){
        $productList = Product::all();
        $data = [
            "productList" => $productList,
        ];
        return view('page.home',$data);
    }
    public function cart(){
        return view('page.cart');
    }
}
