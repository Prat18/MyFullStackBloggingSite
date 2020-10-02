const express = require("express");
const Blog = require("../models/blogs");

const router = express.Router();

router.get("/blogs", (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const pageIndex = +req.query.page;
  const query = Blog.find({}, "-content");
  if(pageSize && pageIndex) {
    query.skip(pageSize * (pageIndex - 1)).limit(pageSize);
  }
  let fetchedBlog;
  query
    .then((result) => {
      fetchedBlog = result;
      return Blog.count();
    })
    .then((count) => {
      res.status(200).json({blogs: fetchedBlog, maxCount: count});
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/blog:id", (req, res, next) => {
  const id = req.params.id;
  Blog.find({ _id: id }, "-_id")
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
