const express = require("express");
const router = express.Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../middleware/multer");
const Post = require("../models/PostModel")

// POST route to upload an image along with additional fields
router.post('/upload', upload.single('image'), async (req, res) => {
    // Extract additional fields from the request body
    const { title, summary, content } = req.body;
  
    // Check if required fields are present
    if (!title || !summary || !content ) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }
  
    try {
      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, { folder: 'blogpage-website' });
      // Generate id
      let posts = await Post.find({}).sort({ id: -1 }).limit(1);
      let id = 1;
      if (posts.length > 0) {
          id = posts[0].id + 1;
      }
      // Create a new post document
      const newPost = new Post({
        id:id,
        title,
        summary,
        content,
        image: result.secure_url,
        
      });
  
      // Save the post to the database
      await newPost.save();
  
      // Respond with success
      res.status(200).json({
        success: true,
        message: "Image uploaded and product saved successfully",
        data: newPost
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Error uploading image or saving product"
      });
    }
  });

  router.get('/getAllPosts', async (req, res) => {
    try {
      const data = await Post.find();
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

 // PUT route to update an existing post with an optional image upload
router.put('/update/:id', upload.single('image'), async (req, res) => {
  // Extract additional fields from the request body
  const { title, summary, content } = req.body;
  const { id } = req.params; // Get post ID from route parameter

  // Check if required fields are present
  if (!title || !summary || !content) {
      return res.status(400).json({
          success: false,
          message: 'Missing required fields'
      });
  }

  try {
      // Find the existing post by ID
      const post = await Post.findById(id);
      if (!post) {
          return res.status(404).json({
              success: false,
              message: 'Post not found'
          });
      }

      // Update post fields
      post.title = title;
      post.summary = summary;
      post.content = content;

      // If an image file is uploaded, upload it to Cloudinary and update the post
      if (req.file) {
          const result = await cloudinary.uploader.upload(req.file.path, { folder: 'blogpage-website' });
          post.image = result.secure_url;
      }

      // Save the updated post to the database
      await post.save();

      // Respond with success
      res.status(200).json({
          success: true,
          message: "Post updated successfully",
          data: post
      });
  } catch (err) {
      console.log(err);
      res.status(500).json({
          success: false,
          message: "Error updating post"
      });
  }
});

  

  router.get('/post', async (req,res) => {
    res.json(
      await Post.find()
        .populate('author', ['username'])
        .sort({createdAt: -1})
        .limit(20)
    );
  });

  router.get('/post/:id', async (req, res) => {
    const {id} = req.params;
    const postDoc = await Post.findById(id).populate('author', ['username']);
    res.json(postDoc);
  })
  router.post('/removeproduct', async(req, res) =>{
    await Post.findOneAndDelete({id:req.body.id});
    console.log("Removed")
    res.json({
        success: true,
        name: req.body.name
    })
})

module.exports = router;