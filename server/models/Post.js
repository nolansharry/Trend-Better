import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title:    { type: String, required: true },
  body:     { type: String, required: true },
  imageUrl: { type: String },           // set by file upload
  author:   { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

export default mongoose.model("Post", PostSchema);