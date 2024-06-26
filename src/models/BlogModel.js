const mongoose = require("mongoose");
const { commentSchema } = require("./CommentSchema");

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      required: false,
    },
    headerImage: {
      type: String, // URL to the file/image storage provider
      required: true,
    },
    tags: {
      // keywords defined by blog post author
      type: [String], // ["life", "travel", "photography"]
      required: true,
    },
    categories: {
      // post category defined by website admin/developer
      type: [String], // ["life", "travel", "photography"]
      enum: ["life", "travel", "photography", "coding"],
      required: true,
    },
    editHistory: {
      type: [{ user: String, timestamp: Date }],
      required: false,
    },
    comments: {
      type: [commentSchema],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const BlogModel = mongoose.model("Blog", blogSchema);

module.exports = {
  BlogModel,
};
