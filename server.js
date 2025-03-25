// // const express = require("express");
// // const dotenv = require("dotenv");
// // const cors = require("cors");
// // const helmet = require("helmet");
// // const connectDB = require("./config/db");
// // const authRoutes = require("./routes/authRoutes");

// // dotenv.config();
// // connectDB();

// // const app = express();
// // app.use(express.json());
// // app.use(cors());
// // app.use(helmet());

// // app.use("/api/auth", authRoutes);

// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// // server.js (Backend - Node.js/Express)
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

// //backend luu cookies
// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const app = express();
// const PORT = 3000;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // API: Lấy cookie Facebook
// app.post("/api/get-cookie", (req, res) => {
//   const { fb_cookies } = req.body;
//   if (!fb_cookies) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Thiếu cookie Facebook" });
//   }
//   console.log("📌 Cookie Facebook nhận được:", fb_cookies);
//   res.json({ success: true, message: "Cookie đã lưu!" });
// });

// // API: Lấy token Facebook
// app.post("/api/get-token", (req, res) => {
//   const { fb_token } = req.body;
//   if (!fb_token) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Thiếu token Facebook" });
//   }
//   console.log("📌 Token Facebook nhận được:", fb_token);
//   res.json({ success: true, message: "Token đã lưu!" });
// });

// // API: Lấy danh sách video từ Facebook
// app.post("/api/get-videos", (req, res) => {
//   const { fb_token } = req.body;
//   if (!fb_token) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Thiếu token Facebook" });
//   }
//   console.log("📌 Đang lấy danh sách video từ Facebook...");
//   // Tạm thời trả về danh sách giả lập
//   res.json({
//     success: true,
//     videos: [
//       {
//         id: "12345",
//         title: "Video 1",
//         url: "https://facebook.com/video/12345",
//       },
//       {
//         id: "67890",
//         title: "Video 2",
//         url: "https://facebook.com/video/67890",
//       },
//     ],
//   });
// });

// // Khởi động server
// app.listen(PORT, () => {
//   console.log(`🚀 Backend chạy tại http://localhost:${PORT}`);
// });
// // code khac
// require("dotenv").config();
// const express = require("express");
// const path = require("path");
// const cors = require("cors");

// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Serve file tĩnh (trang login.html)
// app.use(express.static(path.join(__dirname, "public")));

// // Route cho đăng nhập
// app.post("/login", (req, res) => {
//   const { username, password } = req.body;
//   if (username === "admin" && password === "password") {
//     return res.json({ success: true, token: "fake-jwt-token" });
//   }
//   res
//     .status(401)
//     .json({ success: false, message: "Sai tài khoản hoặc mật khẩu" });
// });

// // Khởi động server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () =>
//   console.log(`Server running on http://localhost:${PORT}`)
// );
// //ketnoi mogo

// // const { MongoClient, ServerApiVersion } = require("mongodb");
// // const uri =
// //   "mongodb+srv://marypkitafoqxa35:<db_password>@cluster0.4mrma.mongodb.net/?appName=Cluster0";

// // // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// // const client = new MongoClient(uri, {
// //   serverApi: {
// //     version: ServerApiVersion.v1,
// //     strict: true,
// //     deprecationErrors: true,
// //   },
// // });
// const mongoose = require("mongoose"); // thêm require mongoose ở đầu
// const mongoURI = process.env.MONGO_URI;

// async function connectDB() {
//   try {
//     await mongoose.connect(mongoURI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("🔗 Đã kết nối thành công với MongoDB!");
//   } catch (error) {
//     console.error("❌ Không thể kết nối MongoDB:", error);
//     process.exit(1);
//   }
// }
// connectDB();

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

// //tao model mongo luu user
// const UserSchema = new mongoose.Schema({
//   username: { type: String, required: true },
//   password: { type: String, required: true },
//   created_at: { type: Date, default: Date.now },
// });

// const User = mongoose.model("User", UserSchema);

// //api dangky user
// //✔ Khi user đăng ký, MongoDB sẽ lưu username và password.
// // Nếu thành công, trả về "Đăng ký thành công!".
// // app.post("/api/register", async (req, res) => {
// //   const { username, password } = req.body;
// //   if (!username || !password) {
// //     return res
// //       .status(400)
// //       .json({ success: false, message: "Thiếu username hoặc password!" });
// //   }

// //   try {
// //     const newUser = new User({ username, password });
// //     await newUser.save();
// //     res.json({ success: true, message: "Đăng ký thành công!" });
// //   } catch (err) {
// //     console.error("❌ Lỗi MongoDB:", err);
// //     res.status(500).json({ success: false, message: "Lỗi database!" });
// //   }
// // });

// app.post("/login", async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     // Tìm user trong MongoDB
//     const user = await User.findOne({ username });
//     if (!user) {
//       return res
//         .status(401)
//         .json({ success: false, message: "Sai tài khoản hoặc mật khẩu" });
//     }

//     // So sánh password được băm với mật khẩu trong cơ sở dữ liệu
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res
//         .status(401)
//         .json({ success: false, message: "Sai tài khoản hoặc mật khẩu" });
//     }

//     // Tạo token JWT nếu đăng nhập thành công
//     const token = jwt.sign(
//       { username: user.username },
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" }
//     );

//     res.json({ success: true, token });
//   } catch (err) {
//     console.error("Lỗi đăng nhập:", err);
//     res.status(500).json({ success: false, message: "Lỗi server!" });
//   }
// });

// const bcrypt = require("bcrypt");
// app.post("/api/register", async (req, res) => {
//   const { username, password } = req.body;
//   if (!username || !password) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Thiếu username hoặc password!" });
//   }
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10); // Băm mật khẩu
//     const newUser = new User({ username, password: hashedPassword });
//     await newUser.save();
//     res.json({ success: true, message: "Đăng ký thành công!" });
//   } catch (err) {
//     console.error("❌ Lỗi MongoDB:", err);
//     res.status(500).json({ success: false, message: "Lỗi database!" });
//   }
// });

// // Middleware xác thực token JWT
// function authenticateJWT(req, res, next) {
//   const token = req.headers.authorization; // Token từ header Authorization

//   if (!token) {
//     return res.status(401).json({ message: "Không có token!" });
//   }

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) {
//       return res.status(403).json({ message: "Token không hợp lệ!" });
//     }

//     req.user = user; // Lưu thông tin user từ token vào request
//     next(); // Chuyển sang xử lý tiếp theo
//   });
// }
// // API được bảo vệ (chỉ cho phép truy cập khi có token hợp lệ)
// app.get("/api/protected", authenticateJWT, (req, res) => {
//   res.json({ message: "Chào mừng bạn! Đây là API bảo vệ", user: req.user });
// });
require("dotenv").config();
// console.log("🔍 MONGODB_URI từ .env:", process.env.MONGODB_URI); // Debug

const express = require("express");
const path = require("path");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoose = require("mongoose");

mongoose.set("strictQuery", true); // Thêm dòng này trước khi kết nối DB

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

// // Kết nối MongoDB
// async function connectDB() {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("🔗 Đã kết nối thành công với MongoDB!");
//   } catch (error) {
//     console.error("❌ Không thể kết nối MongoDB:", error);
//     process.exit(1);
//   }
// }
// connectDB();

// Middleware xác thực token JWT
function authenticateJWT(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: "Không có token!" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token không hợp lệ!" });
    req.user = user;
    next();
  });
}

// Model User
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});
const User = mongoose.model("User", UserSchema);

// API Đăng nhập

app.use((req, res, next) => {
  console.log(`📥 Request nhận được: ${req.method} ${req.url}`);
  next();
});
app.get("/", (req, res) => {
  res.send("🚀 Backend chạy thành công!");
});

// app.post("/login", async (req, res) => {
//   console.log("📌 Đang xử lý POST /login");
//   res.json({ success: true, message: "Route hoạt động!" });
// });

// app.post("/login", async (req, res) => {
//   console.log("📌 Đang xử lý POST /login");
//   const { username, password } = req.body;
//   if (!username || !password) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Thiếu username hoặc password!" });
//   }

//   const user = await User.findOne({ username, password });
//   if (!user) {
//     return res
//       .status(401)
//       .json({ success: false, message: "Sai tài khoản hoặc mật khẩu!" });
//   }

//   res.json({ success: true, message: "Đăng nhập thành công!" });
// });

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(401)
        .json({ success: false, message: "Sai tài khoản hoặc mật khẩu" });
    }
    const token = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ success: true, token });
  } catch (err) {
    res.status(500).json({ success: false, message: "Lỗi server!" });
  }
});

// API Đăng ký
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

// API bảo vệ
app.get("/api/protected", authenticateJWT, (req, res) => {
  res.json({ message: "Chào mừng bạn! Đây là API bảo vệ", user: req.user });
});

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server chạy tại http://localhost:${PORT}`));
