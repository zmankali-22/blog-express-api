const mongoose = require("mongoose");

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
      type: String, // come back later and replace with a MOngoose object ID
      required: true,
    },
    likes : {
        type : [String], // come back later, replace this with mongoose object ID
        required: false,
    },
    headerImage : {
        type : String, // URL to the file/image storage provider
        required: true,
    },
    tags : { // keywords defined by blog post author
        type : [String], // ["life", "travel", "photography"]
        required: true,
    },
    categories : { // post category defined by website admin/developer
        type : [String], // ["life", "travel", "photography"]
        enum : ["life", "travel", "photography", "coding"],
        required: true,
    },
    editHistory : {
        type : [{user: String, timestamp: Date}], 
        required: false,
    }
  },
  {
    timestamps: true,
  }
);


const BlogMOdel = mongoose.model("Blog", blogSchema)

module.exports = {
  BlogMOdel,
};
