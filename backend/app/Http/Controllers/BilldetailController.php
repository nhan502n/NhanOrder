<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BillDetail; // Import model BillDetail

class BilldetailController extends Controller
{
    /**
     * Hiển thị danh sách chi tiết hóa đơn.
     */
    public function index()
    {
        $billDetails = BillDetail::all();
        return response()->json($billDetails);
    }

}
