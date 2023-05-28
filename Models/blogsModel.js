const mongoose = require("mongoose");

const blogsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author_Model",
    },
    tags: {
      type: [String],
    },
    category: {
      type: String,
      required: true,
    },
    subcategory: {
      //[technology-[web development, mobile development, AI, ML etc]
      //"subcategory": ["Non fiction", "Self Help"],
      type: [String],
    },
    deletedAt: {
      type: Date,
      default: null,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
      default: null,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const BlogsModel = new mongoose.model("projectBlog", blogsSchema);
module.exports = { BlogsModel };
