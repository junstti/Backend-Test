<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["error" => "Method not allowed"]);
    exit;
}

$image_url = $_POST['image_url'] ?? '';
if (!$image_url) {
    echo json_encode(["error" => "No image URL provided"]);
    exit;
}

// Giả lập xử lý hình ảnh và trả về URL ảnh mới (khác với play_btn.php)
$processed_image = $image_url . "?filtered=true";

echo json_encode(["success" => true, "image" => $processed_image]);
?>
