const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Blog = require("./models/blogs");

const app = express();
const constr =
  "mongodb+srv://prat__18:pPKWr61POTNTj4CS@cluster0-soezx.mongodb.net/myBlog?retryWrites=true&w=majority";

mongoose
  .connect(constr, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database connection successful!");
  })
  .catch((err) => {
    console.log("Connection failed!");
    console.log(err);
  });

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS, PUT"
  );
  next();
});

app.get("/blogs", (req, res, next) => {
  Blog.find({}, "-content")
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/blog:id", (req, res, next) => {
  const id = req.params.id;
  Blog.find({ _id: id }, "-_id").then((result) => {
    res.status(200).json(result);
  })
  .catch((err) => {
    console.log(err);
  })
});

app.post("/post", (req, res, next) => {
  const blog = new Blog({
    title: req.body.title,
    description: req.body.description,
    content: req.body.content,
  });

  blog
    .save()
    .then((result) => {
      console.log("Blog added to database!");
      res.status(210).json("The blog has been recieved!");
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = app;
