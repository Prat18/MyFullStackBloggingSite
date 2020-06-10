const express = require('express');
const Blog = require('../models/blogs');

const router = express.Router();

router.get("/blogs", (req, res, next) => {
  console.log(req.query);
  const pageSize = req.query.pagesize;
  const pageIndex = req.query.page;
  const query = Blog.find();
  Blog.find({}, "-content")
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/blog:id", (req, res, next) => {
  const id = req.params.id;
  Blog.find({ _id: id }, "-_id").then((result) => {
    res.status(200).json(result);
  })
  .catch((err) => {
    console.log(err);
  })
});

module.exports = router;
