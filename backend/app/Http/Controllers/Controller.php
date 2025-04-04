<?php

namespace App\Http\Controllers;
abstract class Controller
{
    public function index()
    {
        $this->home();
    }
    public function home()
    {
        echo "Đây là trang chủ";
    }
    public function about()
    {
        return view('page_about');
    }
}
