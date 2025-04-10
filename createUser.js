// createUser.js
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// ✅ Log toàn bộ quá trình
console.log("🚀 Bắt đầu kết nối MongoDB...");

// 🔗 URI từ biến môi trường hoặc hardcode tạm test
const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://admin:ewMsOpce1sIJCFh7@cluster0.4mrma.mongodb.net/mydatabase?retryWrites=true&w=majority&appName=Cluster0";

// Kết nối MongoDB
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Kết nối MongoDB thành công");
    return main();
  })
  .catch((err) => {
    console.error("❌ Không thể kết nối MongoDB:", err);
  });

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

async function main() {
  const username = "admin";
  const rawPassword = "123456";

  console.log(`🔐 Hash mật khẩu cho user "${username}"...`);
  const hashedPassword = await bcrypt.hash(rawPassword, 10);
  console.log("✅ Password đã hash:", hashedPassword);

  const existing = await User.findOne({ username });
  if (existing) {
    console.log("⚠️ User đã tồn tại, xóa để tạo lại...");
    await User.deleteOne({ username });
  }

  const newUser = new User({
    username,
    password: hashedPassword,
  });

  await newUser.save();
  console.log(`✅ User "${username}" đã được tạo thành công!`);

  mongoose.disconnect();
}
