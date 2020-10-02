const express = require('express');
const Blog = require('../models/blogs');
const extractFile = require('../middleware/files');

const router = express.Router();

router.post("/post", extractFile.module, (req, res, next) => {
  const url = req.protocol + '://' + req.get("host");
  console.log(url);
  const blog = new Blog({
    title: req.body.title,
    description: req.body.description,
    content: req.body.content,
    imagePath: url + '/images/' + req.file.filename
  });

  blog
    .save()
    .then((result) => {
      res.status(210).json("The blog has been recieved!");
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
