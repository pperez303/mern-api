import { Router } from "express";
import bcrypt from "bcrypt";

import PostModel from "../mongoDB_models/PostModel.js";
import UserModel from "../mongoDB_models/UserModel.js";

// Create a new router object to handle requests.
const router = Router();

// READ-------------------------------------------------------------------
router.get("/:id", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    //hide the password
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(404).json("User not found");
  }
});

// CREATE (Post) method not required because add a new use is handled by the /api/auth_route/register.

// UPDATE-------------------------------------------------------------------
router.put("/:id", async (req, res) => {
    console.log('req params id: ', req.params.id)
    console.log(req.body)
  if (req.body._id === req.params.id) {                      // called from /pages/acctupdate.js(Setting.js) in handleSubmit function.
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    // old logic--------------------------------------------------------
    // try {
    //   const updatedUser = await UserModel.findByIdAndUpdate(
    //     req.params.id,
    //     {
    //       $set: req.body,
    //     },
    //     { new: true }
    //   );
    //   res.status(200).json(updatedUser);
    //---------------------------------------------------------------------
    try {
      const updatedUser = await User.findById(req.params.id)
      //console.log('find by ID passed')
      //console.log('updateUser ', updatedUser)
      updatedUser.username = req.body.username
      updatedUser.email = req.body.email;
      updatedUser.password = req.body.password;
      //console.log('after username updated ', updatedUser)
      await updatedUser.save()
      res.status(200).json(updatedUser);
      //console.log("save Passed ", updatedUser)
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    console.log('Error 401')
    res.status(401).json("You can only update your account.");
  }
});

// DELETE--------------------------------------------------------------------
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await UserModel.findById(req.params.id);
      try {
        // delete all posts where the username is equal to the username retreived by the User.findById function.
        await PostModel.deleteMany({ username: user.username });
        // delete the user account where user id in the User table is equal to the id in the endpoint.
        await UserModel.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(404).json("User not found!");
    }
  } else {
    res.status(401).json("You can delete only your account!");
  }
});


export default router;
