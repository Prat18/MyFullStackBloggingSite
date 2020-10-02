const express = require("express");
const blogSchema = require("../models/blogs");
const checkAuth = require("../middleware/authCheck");
const router = express.Router();

router.put("/like-blog", checkAuth, (req, res, next) => {
  blogSchema
    .findById({ _id: req.body.blogId })
    .then((blog) => {
      if (!blog)
        return res
          .status(404)
          .json({ success: false, message: "Blog not found!" });
      if (req.body.isLiked) {
        var found = false;
        for (var i = 0; i < blog.likedBy.length; i++) {
          if (blog.likedBy[i].id === req.userData.userId) {
            found = true;
            break;
          }
        }
        if (found)
          return res
            .status(400)
            .json({ success: false, message: "You already liked the blog!" });
        blog.likedBy.push({ name: req.userData.name, id: req.userData.userId });
        blog
          .save()
          .then((result) => {
            res
              .status(200)
              .json({ success: true, message: "Blog liked successful!" });
          })
          .catch((error) => {
            console.log(error);
            res
              .status(500)
              .json({ success: false, message: "Some error occured!" });
          });
      } else {
        var found = false;
        for (var i = 0; i < blog.likedBy.length; i++) {
          if (blog.likedBy[i].id === req.userData.userId) {
            found = true;
            break;
          }
        }
        if (!found)
          return res
            .status(400)
            .json({ success: false, message: "You already unliked the blog!" });
        blog.likedBy.splice({ name: req.userData.name, id: req.userData.userId });
        blog
          .save()
          .then((result) => {
            res
              .status(200)
              .json({ success: true, message: "Blog unliked successful!" });
          })
          .catch((error) => {
            console.log(error);
            res
              .status(500)
              .json({ success: false, message: "Some error occured!" });
          });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ success: false, message: "Some error occured!" });
    });
});

module.exports = router;
