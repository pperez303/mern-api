import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    // username must be lowercase
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: v => v !== "",
        message: props => `${props.value} username cannot be an empty string.`
      }
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: v => v !== "",
        message: props => `${props.value} email cannot be an empty string.`
      }
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: v => v !== "",
        message: props => `${props.value} password cannot be an empty string.`
      }
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
