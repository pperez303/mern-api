//import the libraries
//const router = require("express").Router();
import { Router } from "express";
import CategoryModel from "../mongoDB_models/CategoryModel.js";

// Create a new router object to handle requests.
const router = Router();

// CREATE Category -------------------------------------------------------------------
router.post("/", async (req, res) => {
  const newCat = new Category(req.body);
  try {
    const savedCat = await newCat.save();
    res.status(200).json(savedCat);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET (read) Category --------------------------------------------------------------------
router.get("/", async (req, res) => {
  try {
    const cats = await CategoryModel.find();
    res.status(200).json(cats);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
