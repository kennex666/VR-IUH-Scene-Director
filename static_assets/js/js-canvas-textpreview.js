function createImageCanvasWithFont({
  text = "Default",
  fontSize = 60,
  color = "#000",
  imageType = "png", // Loại ảnh: 'png' hoặc 'jpg'
  backgroundColor = "#262261" // Màu nền, chỉ áp dụng cho jpg
}) {
  // Tạo canvas mới
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const padding = 10; // Khoảng cách xung quanh chữ

  // Đặt font chữ để tính toán kích thước
  ctx.font = `${fontSize}px Arial`;

  // Tính toán kích thước canvas dựa trên nội dung
  const textWidth = ctx.measureText(text).width;
  const textHeight = fontSize; // Chiều cao font gần bằng kích thước font

  // Cập nhật kích thước canvas
  canvas.width = textWidth + padding * 2;
  canvas.height = textHeight + padding * 2;

  // Nếu là ảnh jpg, vẽ nền
  if (imageType == "jpg") {
    ctx.fillStyle = backgroundColor; // Màu nền
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Vẽ nền
  }

  // Vẽ chữ
  ctx.fillStyle = color; // Màu chữ
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `${fontSize}px Arial`;
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);

  // Tạo hình ảnh từ canvas và chuyển thành base64
  const imgData = canvas.toDataURL(`image/${imageType}`);

  // Trả về dữ liệu hình ảnh dạng base64
  return imgData;
}
