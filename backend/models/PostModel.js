const mongoose = require('mongoose');
const {Schema} = mongoose;

const postSchema = new mongoose.Schema({
    id:{
        type: Number,
       
    },
    title:{
        type: String,
    
    },
    summary:{
        type: String,
      
    },
    content:{
        type: String,
      
    },
    image:{
        type: String,
       
    },
    author:{type:Schema.Types.ObjectId, ref:"User"}
    
},
{
    timestamps: true,
});

const Post = mongoose.model("posts", postSchema);
module.exports = Post;