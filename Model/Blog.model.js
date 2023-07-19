const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    likes: { type: Number, required: true },
    dislike: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const BlogModel = mongoose.model("blog", BlogSchema);

module.exports = {
  BlogModel,
};
