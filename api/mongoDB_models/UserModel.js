import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    // username must be lowercase
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

//module.exports = mongoose.model("User", PostSchema);
export default mongoose.model("User", UserSchema);
