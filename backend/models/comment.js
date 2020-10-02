const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  name: {type: String, required: true},
  userId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  blogId: {type: mongoose.Types.ObjectId, required: true, ref: "Blog"},
  comment: {type: String, required: true},
  createdAt: {type: Date, default: Date.now},
  edited: {type: Boolean, default: false}
});

module.exports = mongoose.model('Comment', commentSchema)
