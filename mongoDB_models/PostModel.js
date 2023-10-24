import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: false,
      default: "../images/7YaFqXLFskN0RHMqiunoDYIQ.jpg"
    },
    username: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
      required: false,
    },
    postbody: {
      type: String,
      required: false,
      default: " ",
    },
  },
  { timestamps: true }
);

//module.exports = mongoose.model("Post", PostSchema);
export default mongoose.model("Post", PostSchema);
