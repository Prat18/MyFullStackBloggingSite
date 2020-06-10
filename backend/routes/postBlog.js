const express = require('express');
const multer = require('multer');
const Blog = require('../models/blogs');

const router = express.Router();

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if(isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },

  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + '.' + ext);
  }
})

router.post("/post",multer({storage: storage}).single('image') , (req, res, next) => {
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
      console.log(result);
      res.status(210).json("The blog has been recieved!");
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
