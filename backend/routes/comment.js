const commentSchema = require("../models/comment");
const authCheck = require("../middleware/authCheck");
const express = require("express");

const router = express.Router();

router.post("/post-comment", authCheck, (req, res, next) => {
  const comment = new commentSchema({
    name: req.userData.name,
    userId: req.userData.userId,
    blogId: req.body.blogId,
    comment: req.body.comment,
  });

  comment
    .save()
    .then((result) => {
      console.log(result);
      res.status(200).json({ message: "Comment saved!", result: result });
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ message: "Something went wrong. Please try again!" });
    });
});

router.get("/get-comment:id", (req, res, next) => {
  commentSchema
    .find({ blogId: req.params.id })
    .then((comments) => {
      res
        .status(200)
        .json({ comments: comments, message: "Fetch successful!" });
    })
    .catch((error) => {
      res.status(404).json({ message: "Comments not found!" });
    });
});

router.delete("/delete-comment/:id", authCheck, (req, res, next) => {
  commentSchema
    .findById({ _id: req.params.id })
    .then((comment) => {
      if (!comment)
        return res
          .status(404)
          .json({ success: false, message: "Comment not found!" });
      if (toString(comment.userId) !== toString(req.userData.userId))
        return res
          .status(401)
          .json({ success: false, message: "You are not authorize!" });
      commentSchema.deleteOne({ _id: req.params.id }).then((result) => {
        console.log(result);
        return res
          .status(200)
          .json({ success: true, message: "Comment deleted successfully!" });
      });
    })
    .catch((error) => {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Some error occcured!" });
    });
});

router.put("/edit-comment", authCheck, (req, res, next) => {
  console.log(req.body.commentId);
  if (toString(req.userData.userId) !== toString(req.body.userId))
    return res
      .status(401)
      .json({ success: false, message: "You are not authorize!" });
  commentSchema
    .findOne({ _id: req.body.commentId })
    .then((comment) => {
      console.log(comment);
      if (!comment)
        return res
          .status(404)
          .json({ success: false, message: "Comment not found!" });
      if (toString(comment.userId) !== toString(req.userData.userId))
        res
          .status(401)
          .json({ success: false, message: "You are not authorize!" });
      commentSchema
        .updateOne(
          { _id: req.body.commentId },
          {
            _id: req.body.commentId,
            comment: req.body.updatedComment,
            edited: true,
          }
        )
        .then((updatedComment) => {
          console.log(updatedComment);
          res
            .status(200)
            .json({ success: true, message: "Comment updated sucessfully!" });
        })
        .catch((error) => {
          console.log(error);
          res
            .status(500)
            .json({ success: false, message: "Some error occured!" });
        });
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Something went wrong!" });
    });
});

module.exports = router;
