// index.js will be run by the PM2 process manaager in the droplet.
import express from "express";
//import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./db_connect/mongoose_connect.js"
import path from "path";
import multer from "multer";
import { fileURLToPath } from 'url';
import cors from "cors";

// Routes 
import postRoute from "./routes/post_routes.js";
import userRoute from "./routes/user_routes.js";
import categoryRoute from "./routes/category_route.js";
import authRoute from "./routes/auth_route.js";
import ckloadRoute from "./routes/ckloads.js";

const app = express();

app.use(express.json());

// Allowed origines
app.use(
    cors({
        origin: [
          "http://localhost:3000", 
          "http://localhost:3500"
        ]
    })
)

// ES6 does not providde direct support to __dirname.  This is an option for solving this issue.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log('dirname: ', __dirname)

// Assign a URI to a PUBLIC FOLDER to allow the front end to access the server images.
//app.use "/api/images" as the path string.  But it can be anything like "images".  This routing path is used in /front-end/src/components/SinglePost.js
app.use("/api/images", express.static(path.join(__dirname, "images"))); 

// call dotenv and it will return an Object with a parsed key
dotenv.config();                                   

// Connect to Mongoose cluster and collections
connectDB();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });

// add logic here to remove the old file before inserting a new png/jpg file.
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

// Assign a URI to the route module.  Test with postman: localhost:8000/api/posts/<some post id>
// Format app.use("URI text", imported-module);
app.use("/api/posts", postRoute);              // Referenced by Axios in /frontend-react/pages/Home.js
app.use("/api/users", userRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/auth", authRoute);
app.use("/api/ckloads", ckloadRoute);


// Requests are sent to Port 8000.
app.listen("8000", () => {
    console.log('Express Server Has Started!')
});