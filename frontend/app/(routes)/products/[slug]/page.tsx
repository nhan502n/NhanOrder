"use client";
import { useEffect, useState} from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
};

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    fetch(`http://localhost:8000/api/san-pham/${slug}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error("Lỗi khi lấy sản phẩm:", err));
  }, [slug]);

  if (!product) return <p className="text-center text-gray-500">Sản phẩm không tồn tại</p>;

  return (
    <>

<div className="container">
        <div className="brand">
            <div className="thuonghieu">Thương hiệu: </div>
            <div className="brand-con"><a href="#"><img src="http://localhost:8000/api/image/Samsung_r4o3-uh.webp" alt=""/></a> </div>
            <div className="brand-con"><a href="#"><img src="http://localhost:8000/api/image/iphone_fmqr-gq.png" alt=""/></a></div>
            <div className="brand-con"><a href="#"><img src="http://localhost:8000/api/image/oppo.png" alt=""/></a></div>
            <div className="brand-con"><a href="#"><img src="http://localhost:8000/api/image/Realme.webp" alt=""/></a></div>
            <div className="brand-con"><a href="#"><img src="http://localhost:8000/api/image/Xiaomi_ru8d-2w.webp" alt=""/></a></div>
            <div className="brand-con"><a href="#"><img src="http://localhost:8000/api/image/vivo_40u2-a7.webp" alt=""/></a></div>
            <div className="brand-con"><a href="#"><img src="http://localhost:8000/api/image/Nokia_hrgh-42.webp" alt=""/></a></div>
            <div className="brand-con"><a href="#"><img src="http://localhost:8000/api/image/TCL_2owi-9h.webp" alt=""/></a></div>
        </div>
        <div className="sanpham-chitiet">
            <div className="slideshow-product"><img src={`http://localhost:8000/api/image/${product?.image}`} alt="{product?.name}"/></div>
            {/* <div className="hinhanh-chitiet">
                <div className="hinhanh-chitiet-layout"><a href="video.html" target="main"><img src="http://localhost:8000/api/image/Screenshot 2024-01-28 193628.png" alt=""/></a></div>
                <div className="hinhanh-chitiet-layout"><a href="z-anh-1.html" target="main"><img src="http://localhost:8000/api/image/2.jpg" alt=""/></a></div>
                <div className="hinhanh-chitiet-layout"><a href="z-anh-2.html" target="main"><img src="http://localhost:8000/api/image/4.jpg" alt=""/></a></div>
                <div className="hinhanh-chitiet-layout"><a href="z-anh-4.html" target="main"><img src="http://localhost:8000/api/image/3.jpg" alt=""/></a></div>
                <div className="hinhanh-chitiet-layout"><a href="z-anh-3.html" target="main"><img src="http://localhost:8000/api/image/5.jpg" alt=""/></a></div>
            </div> */}
            <div className="mieuta">
                <h3>Đặc điểm nổi bật</h3>
                details
            </div>
        </div>
        <div className="sanpham-chitiet-right">
            <div className="duong-dan">
                <a href="index.html">Trang chủ</a><span><FontAwesomeIcon icon={faAnglesRight} /></span>
                <a href="#"> {product?.category?.name}</a><span><FontAwesomeIcon icon={faAnglesRight} /></span>
                <a id="duongdan1" href="#">Chi tiết</a>
            </div>
            <div className="ten-sp-chitiet">{product?.name}</div>
            <div className="gia-sp-ct">{product?.sale_price ? formatCurrency(product.sale_price) : formatCurrency(product.price)}
            {product?.sale_price && <del><br />{formatCurrency(product.price)}</del>}</div>
            {product?.discount_percent > 0 && (
            <div className="giamgia">{Number(product.discount_percent).toFixed(0)}%</div>
            )}

            <div className="tragop0-phantram">Trả góp 0%</div>
            <div className="uudai-chitiet">
                <div className="only-nk">ƯU ĐÃI</div>
                <div className="number1">1</div>
                <div className="number2">2</div>
                <div className="number3">3</div>
                <div className="number4">4</div>
                <div className="number5">5</div>
                <div className="number6">6</div>
                <div className="number7">7</div>
                <div className="text-uudai-chitiet">
                    Mua Online nhập mã MIDMONTH giảm thêm đến 500.000đ từ 15/01 - 19/01.
                    Xem chi tiết <br/>
                    Chuột quang không dây Forter V1 <br/>
                    Nhập mã NK300 giảm 1% tối đa 300,000đ khi thanh toán qua VNPay (áp dụng tại cửa hàng NhanOrder)
                    <br/>
                    Giảm 500.000đ khi thanh toán bằng thẻ tín dụng Sacombank <br/>
                    Nhập mã NK2024 giảm 2% tối đa 200.000đ khi thanh toán qua MoMo (áp dụng tại cửa hàng NhanOrder)
                    <br/>
                    Giảm 500.000đ khi thanh toán bằng thẻ tín dụng UOB <br/>
                    Giảm 500.000đ cho sản phẩm từ 10 triệu đồng khi thanh toán qua thẻ tín dụng VPBank
                </div>
            </div>
            <div className="muangay-chitiet">
                <a href="#">
                    <p>giao hàng tận nơi</p>
                    <h2>MUA NGAY</h2>
                </a>
            </div>
            <div className="muangay-chitiet-2">
                <div className="giohang-chitiet">
                <form action="/asm/gio-hang" method="post">
    <input type="hidden" name="ID" value="<?php echo $row['ID']; ?>"/>
    <input type="hidden" name="Name" value="<?php echo $row['Name']; ?>"/>
    <input type="hidden" name="Image" value="<?php echo $row['Image']; ?>"/>
    <input type="hidden" name="Price" value="<?php echo $row['Price']; ?>"/>
    <input type="hidden" name="Discount" value="<?php echo $row['Discount']; ?>"/>
    <input type="hidden" name="Quantity" value="1" id="quantity"/>
    <button type="submit" className="btn-add-cart-detail">THÊM VÀO GIỎ HÀNG</button>
</form>

                
</div>
                <div className="tragop-chitiet"><a href="#">MUA TRẢ GÓP</a></div>
            </div>
            <div className="text-duoi">Gọi đặt mua 1800.6800 (08h - 21h)</div>
        </div>
</div>
<div className="container-2">
        <div className="trungtam-trungbay">Xem trung tâm trung bày</div>
        <div className="diachi-trungbay">
            <b>TP.HCM</b> <br/>
            Có 14 trung tâm còn hàng trưng bày <br/>
            Quận Gò Vấp. 855 Quang Trung, Phường 12 <br/>
            Quận Bình Tân. 56 Lê Văn Quới, P. Bình Hưng Hoà <br/>
            Quận 2. 378 Nguyễn Duy Trinh, P. Bình Trưng Đông <br/>
            Quận Bình Tân. Số 1231 Quốc lộ 1A, P. Bình Trị Đông B <br/>
            Quận Phú Nhuận. 216 Phan Đăng Lưu, Phường 3 <br/>
            Quận Gò Vấp. 03 Nguyễn Oanh, Phường 10
        </div>
        <div className="diachi-trungbay">
            Quận 12. 312-314, Phan Văn Hớn, Phường Tân Thới Nhất <br/>
            Quận Tân Phú. 1/1 Trường Chinh, Phường Tây Thạnh <br/>
            Quận 9. 99, Lê Văn Việt, Phường Tăng Nhơn Phú A <br/>
            Quận Thủ Đức. 307-309, Võ Văn Ngân, Kp 5, Phường Linh Chiểu <br/>
            Quận Tân Bình. 527 Lạc Long Quân, P.10, Q.TÂN BÌNH <br/>
            Quận 7. 10-10A Nguyễn Thị Thập, Phường Bình Thuận <br/>
            Quận Bình Thạnh. 292 Nguyễn Xí, Phường 13 <br/>
            Huyện Củ Chi. 73 Đường Tỉnh Lộ 8, Khu Phố 1, Thị Trấn Củ Chi

        </div>
        <hr color="white"/>
        <div className="xemthem-chitiet-sp">
        mo ta
        </div>
        <div className="history">
            SẢN PHẨM BẠN ĐÃ XEM
        </div>

        {/* Hiển thị danh sách bình luận */}
    {/* <div className="comment-list1">
        <?php if (!empty($comments)) { ?>
            <ul className="comment-list">
                <h1>Bình luận</h1>
                <?php foreach ($comments as $comment) { ?>
                    <li>
                        <strong><?php echo htmlspecialchars($comment['User_Name']); ?></strong> -
                        <span><?php echo date('d/m/Y H:i', strtotime($comment['Sent_Date'])); ?></span>
                        <p style="color: black;" ><?php echo nl2br(htmlspecialchars($comment['Comment'])); ?></p>
                    </li>
                <?php } ?>
            </ul>
        <?php } else { ?>
            <p>Chưa có bình luận nào.</p>
        <?php } ?>
    </div> */}
        </div>
        </>
  );
}
