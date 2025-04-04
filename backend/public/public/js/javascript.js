let slideIndex = 1; // Đặt slideIndex ban đầu thành 1 để bắt đầu với slide đầu tiên
window.onload = function () {
    showSlides(slideIndex); // Gọi showSlides với slide đầu tiên khi trang tải
}

// Hàm hiển thị slide tương ứng
function showSlides(n) {
    let slides = document.getElementsByClassName("mySlides");

    if (slides.length === 0) return;

    // Kiểm tra nếu chỉ số n vượt qua số lượng slide, quay về slide đầu tiên
    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;

    // Ẩn tất cả các slide
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // hiển thị slide hiện tại
    slides[slideIndex - 1].style.display = "block";

}

// Điều khiển các nút điều hướng
function plusSlides(n) {
    showSlides(slideIndex += n);
}

function ShowDropdown() {
    const dropdown = document.querySelector('.dropdown');
    dropdown.style.display = 'block';
}

function HideDropdown() {
    const dropdown = document.querySelector('.dropdown');
    dropdown.style.display = 'none';
}
// Tự động chuyển đổi slide sau mỗi 5 giây
setInterval(() => {
    plusSlides(1);
}, 5000);

function updateQuantity(index, change) {
    var quantityElement = document.getElementById('quantity-' + index);
    var totalPriceElement = document.getElementById('total-' + index);
    var totalAmountElement = document.getElementById('tongtien');
    var maxQuantity = parseInt(document.getElementById('max-quantity-in-product-' + index).value);
    var quantity = parseInt(quantityElement.innerText);
    
    var newQuantity = quantity + change;
    if (newQuantity > maxQuantity) return; // Không cho vượt quá số lượng kho
    if (newQuantity < 1) { 
        removeProduct(index); // Xóa sản phẩm khỏi giỏ hàng nếu số lượng về 0
        return;
    }

    // Cập nhật số lượng trên giao diện
    quantityElement.innerText = newQuantity;

    // Tính toán lại tổng giá sản phẩm
    var discount = Cart[index][3]; // Giá giảm giá
    var newTotal = newQuantity * discount;
    totalPriceElement.innerText = newTotal.toLocaleString() + 'đ';

    // Cập nhật tổng tiền toàn giỏ hàng
    var totalAmount = 0;
    Cart[index][4] = newQuantity; // Cập nhật session tạm thời
    Cart[index][5] = newTotal;
    Cart.forEach(item => totalAmount += item[5]);

    totalAmountElement.innerText = totalAmount.toLocaleString() + 'đ';

    // Gửi AJAX request để cập nhật session PHP
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "index.php?Page=gio_hang", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("update_quantity=true&idcart=" + index + "&newQuantity=" + newQuantity);
}

// Hàm xóa sản phẩm khỏi giỏ hàng khi số lượng về 0
function removeProduct(index) {
    document.getElementById('quantity-' + index).closest('tr').remove();
    
    // Xóa khỏi session tạm thời
    Cart.splice(index, 1);

    var totalAmount = 0;
    Cart.forEach(item => totalAmount += item[5]);
    document.getElementById('tongtien').innerText = 'Tổng: ' + totalAmount.toLocaleString() + 'đ';

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "index.php?Page=gio_hang", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("remove_product=true&idcart=" + index);
}

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("add-to-cart-form");
    const cartCount = document.getElementById("cart-count");

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            addToCart(new FormData(form));
        });
    }
});

/**
 * Hàm gửi request thêm sản phẩm vào giỏ hàng bằng Fetch API
 * @param {FormData} formData - Dữ liệu từ form
 */
function addToCart(formData) {
    fetch("/asm/api/add-to-cart.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            updateCartCount(data.totalQuantity);
            alert("Sản phẩm đã được thêm vào giỏ hàng!");
        } else {
            alert("Có lỗi xảy ra, vui lòng thử lại.");
        }
    })
    .catch(error => console.error("Lỗi:", error));
}

/**
 * Cập nhật số lượng hiển thị trên giỏ hàng
 * @param {number} quantity - Số lượng sản phẩm trong giỏ hàng
 */
function updateCartCount(quantity) {
    const cartCount = document.getElementById("cart-count");
    if (cartCount) {
        cartCount.textContent = quantity;
    }
}


