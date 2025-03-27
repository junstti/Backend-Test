const express = require("express");
const router = express.Router();

// API nhận request POST từ frontend
router.post("/", (req, res) => {
  console.log("✅ Request received at /api/play_btn");
  console.log("Body:", req.body);

  // Xử lý logic ở đây
  const responseData = {
    status: "success",
    message: "play_btn API hoạt động!",
    data: req.body,
  };

  res.json(responseData);
});

module.exports = router;
