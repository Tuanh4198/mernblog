const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

/**
 * domain:
 * kid
 * news
 */
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      min: 3,
      max: 160,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
      lowercase: true,
    },
    content: {
      type: {},
      required: true,
      min: 20,
      max: 2000000,
    },
    user: {
      type: String,
      default: "Admin",
    },
    productLink: {
      type: String,
    },
    domain: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
