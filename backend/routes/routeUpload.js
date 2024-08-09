const express = require('express');
const router = express.Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../middleware/multer");


router.post('/upload', upload.single('image'), (req, res) => {
   cloudinary.uploader.upload(req.file.path, { folder: 'blogpage-website' }, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Error uploading image"
      });
    }

    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      data: result
    });
  });
});


router.get('/getImagesInFolder', (req, res) => {
  cloudinary.api.resources({
    type: 'upload',
    prefix: 'blog-page/', // Folder path (including trailing slash)
    max_results: 100
  }, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Error retrieving images"
      });
    }

    res.status(200).json({
      success: true,
      message: "Images retrieved successfully",
      data: result.resources
    });
  });
});
module.exports = router;
