const express = require('express');
require('dotenv').config();
const connectDB = require('./db');
const cookieParser = require('cookie-parser')
const postRoute = require('./routes/postRoute')
const uploadRoute = require('./routes/routeUpload');
const userRoutes = require('./routes/userRoutes')

require("dotenv").config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
const cors = require('cors');
app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173'
}));
app.use(cookieParser())
//the route 
app.use("/api/users" , uploadRoute);
app.use("/api/posts", postRoute);
app.use("/api/auth", userRoutes)


//posrt connection 
app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});

//cloudinary account:  https://cloudinary.com/signup