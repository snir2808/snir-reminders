const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  time: String,
  message: String,
  id: String,
  active: Boolean,
});

const PostMessage = mongoose.model("reminder", postSchema);

module.exports = PostMessage;
