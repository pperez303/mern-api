// index.js will be run by the PM2 process manaager in the droplet.
// to view the PM2 process: $ pm2 list
// ci/cd configure in the droplet ~/backend-apps/api-action-runner/

import express from "express";
import dotenv from "dotenv";
import connectDB from "./db_connect/mongoose_connect.js"
import path from "path";
import multer from "multer";
import { fileURLToPath } from 'url';
import cors from "cors";
import fs from "fs";

// the routes/ 
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
          "http://localhost:3500",
          "https://blog.nubewebdev.com",
          "https://cms.nubewebdev.com",
          "http://localhost:3800"
        ]
    })
)

// ES6 does not providde direct support to __dirname.  This is an option for solving this issue.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//console.log('dirname: ', __dirname)

// Assign a URI to a PUBLIC FOLDER to allow the front end to access the server images.
//app.use "/api/images" as the path string.  But it can be anything like "images".  This routing path is used in /front-end/src/components/SinglePost.js
app.use("/api/images", express.static(path.join(__dirname, "images"))); 

// Get the variables from the .env file.  Required for the connectDB() function for example.
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

// Upload the image888888888888888888888888888888888888888888888888888888888888888888888888888888888888
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

// Remove the old Image899999999999999999999999999999999999999999999999999999999999999999999999999999989
app.post("/api/removeoldimage/", (req, res) => {
  const image = req.body.image;
  console.log('deleting image : ', image)

  try {
    fs.unlinkSync(`./images/${image}`);
    console.log("Delete File successfully.");
  } catch (error) {
    console.log(error);
  }
  res.status(200).json("IMage file has been removed");
  //console.log("AT API remove old image file", req.body.image)
})

//0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
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