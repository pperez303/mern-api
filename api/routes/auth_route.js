import { Router } from "express";
import bcrypt from "bcrypt";
import UserModel from "../mongoDB_models/UserModel.js"

// Create a new router object to handle requests.
const router = Router();

//REGISTER
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new UserModel({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  console.log("at auth_routes.js Login")
  try {
    const user = await UserModel.findOne({ username: req.body.username });
    //const pw = req.body.password;
    //!user && res.status(400).json("Wrong credentials!");  // this statement does not work.  replace with If statement.
    if (!user) {
      return res.status(404).json("Invalid User Name");
    }

    const userPassword = await bcrypt.compare(req.body.password, user.password);
    if (userPassword === false) {
      return res.status(404).json("Invalid password!");
    }

    const { password, ...otherData } = user._doc;              // deconstruct the user elements to separate the password from the other data elements.
    res.status(200).json(otherData);                           // this will return all user elements except for the password.
    console.log(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
