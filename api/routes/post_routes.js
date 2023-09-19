//import express from "express"
import { Router } from "express";
import PostModel from "../mongoDB_models/PostModel.js";

// Create a new router object to handle requests.
const router = Router();

//CREATE POST
router.post("/", async (req, res) => {
  const newPost = new PostModel(req.body);
  console.log('post', newPost)
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//READ ALL POSTS
router.get("/", async (req, res) => {
  const username = req.query.username;
  const catName = req.query.cat;

  try {
    let posts;
    if (username) {
      posts = await PostModel.find({ username });     // get posts by username
    } else if (catName) {
      posts = await Post.find({                       // get posts by category name
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await PostModel.find();                 // get all posts
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POST
router.get("/:id", async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
