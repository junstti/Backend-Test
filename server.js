const express = require("express");
require("dotenv").config();
const cors = require("cors");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const app = express();

// Cấu hình CORS cho frontend của bạn
// app.use(
//   cors({
//     origin: "https://blueskyfrontendphp.pages.dev",
//     credentials: true,
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );
const allowedOrigins = [
  "https://blueskyfrontendphp.pages.dev",
  "https://www.protocolmaster.xyz",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Kết nối MongoDB
mongoose.set("strictQuery", true);
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("🔗 Đã kết nối thành công với MongoDB!");
  } catch (error) {
    console.error("❌ Không thể kết nối MongoDB:", error);
  }
}
connectDB();

// Mongoose model
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});
const User = mongoose.model("User", UserSchema);

// Middleware kiểm tra JWT
function authenticateJWT(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: "Không có token!" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token không hợp lệ!" });
    req.user = user;
    next();
  });
}

// Log mỗi request
app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.url}`);
  next();
});

// Test route
app.get("/", (req, res) => {
  res.send("🚀 Backend chạy thành công!");
});

// Đăng ký
app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.json({ success: true, message: "Đăng ký thành công!" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Lỗi database!" });
  }
});

// Đăng nhập
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ success: false, message: "Thiếu thông tin!" });

  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res
        .status(401)
        .json({ success: false, message: "Sai tài khoản hoặc mật khẩu" });

    const token = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.json({ success: true, token });
  } catch (err) {
    res.status(500).json({ success: false, message: "Lỗi server!" });
  }
});

// API bảo vệ
app.get("/api/protected", authenticateJWT, (req, res) => {
  res.json({ message: "Chào mừng bạn! Đây là API bảo vệ", user: req.user });
});

// Route xử lý ảnh từ play_btn và play_btn2
const playBtnRoute = require("./api/play_btn");
const playBtn2Route = require("./api/play_btn2");
app.use("/api/play_btn", playBtnRoute);
app.use("/api/play_btn2", playBtn2Route);

// Khởi động server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Server chạy trên cổng ${PORT}`);
});
