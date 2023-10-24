//import express from "express"
import { Router } from "express";
import PostModel from "../mongoDB_models/PostModel.js";

// Create a new router object to handle requests.
const router = Router();

//CREATE POST-------------------------------------------------------------
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

//READ ALL POSTS-----------------------------------------------------------
router.get("/", async (req, res) => {
  const username = req.query.username;
  const catName = req.query.cat;

  try {
    let posts;
    if (username) {
      posts = await PostModel.find({ username });     // get posts by username
    } else if (catName) {
      posts = await PostModel.find({                       // get posts by category name
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

//READ SNGLE POST-----------------------------------------------------------
router.get("/:id", async (req, res) => {
  try {
    console.log('at rouet.get', req.params.id)
    const post = await PostModel.findById(req.params.id);
    console.log('success post: ', post)
    res.status(200).json(post);
  } catch (err) {
    console.log('error  ', err)
    res.status(500).json(err);
  }
});

//UPDATE the post---------------------------------------------------------------
router.put("/:id", async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await PostModel.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE the post-------------------------------------------------------------
router.delete("/:id", async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.deleteOne();
        res.status(200).json("Post has been deleted...");
      } catch (err) {
        console.log("Error caught", err)
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


export default router;