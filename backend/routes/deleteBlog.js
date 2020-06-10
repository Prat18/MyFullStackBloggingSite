const express = require("express");
const Blog = require("../models/blogs");

const router = express.Router();

router.delete("/:id", (req, res, next) => {
  Blog.findByIdAndDelete({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(204).json("The blog has been deleted!");
  })
});

module.exports = router;
