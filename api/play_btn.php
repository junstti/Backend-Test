<?php
header("Access-Control-Allow-Origin: https://frontend-publish.pages.dev"); // Chỉ cho phép frontend của bạn
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

// Xử lý preflight request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(204);
    exit;
// }

// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Methods: POST");
// header("Access-Control-Allow-Headers: Content-Type");
// header("Content-Type: application/json");

// if ($_SERVER['REQUEST_METHOD'] === 'POST') {
//     // Xử lý POST request ở đây
// } else {
//     http_response_code(405); // Trả về lỗi 405 nếu không phải POST
//     echo "Method Not Allowed";
}

$image_url = $_POST['image_url'] ?? '';
if (!$image_url) {
    echo json_encode(["error" => "No image URL provided"]);
    exit;
}

Giả lập xử lý hình ảnh và trả về URL ảnh mới
$processed_image = $image_url . "?processed=true";

echo json_encode(["success" => true, "image" => $processed_image]);
?>
