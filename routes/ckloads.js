// Allow the user to select a png or jpeg file and return the file path back to the requestor.
import { Router } from "express";
import bodyparser from "body-parser";
import multiparty from "connect-multiparty";

const MultipartyMiddleware = multiparty({ uploadDir: "images" });

const router = Router();

router.use(bodyparser.urlencoded({ extended: true }));

router.use(bodyparser.json());

// use this to check if your server is working
router.get("/", (req, res) => {
  res.send("Welcome to your server!");
});

router.post("/uploads", MultipartyMiddleware, (req, res) => {
  console.log("at uploads");
  // console.log(req.body);
  // console.log(req.files);
  const path = req.files.upload.path;
  console.log(path);

  res.status(200).json({
    uploaded: true,
    url: `http://localhost:8000/api/${path}`,
  });
});

export default router;
