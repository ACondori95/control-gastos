const express = require("express");
const {
  registerUser,
  loginUser,
  getUserInfo,
} = require("../controllers/authControllers");
const {protect} = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const cloudinary = require("../utils/cloudinary");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUser", protect, getUserInfo);

router.post("/upload-image", upload.single("image"), (req, res) => {
  cloudinary.uploader.upload(req.file.path, function (err, result) {
    if (err) {
      console.log(err);
      return res.status(500).json({success: false, message: "Error"});
    }

    res
      .status(200)
      .json({success: true, message: "Imagen subida con éxito", data: result});
  });
});

module.exports = router;
