import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    articleheader: {
      type: String,
      required: false,
    },
    articlesubheader: {
      type: String,
      required: false,
    },
    modulenumber: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: false,
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
