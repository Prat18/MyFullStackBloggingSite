const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const getBlogRoute = require("./routes/getBlog");
const postBlogRoute = require("./routes/postBlog");
const deleteBlogRoute = require("./routes/deleteBlog");

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
app.use(bodyParser.urlencoded({extended: false}));
app.use('/images', express.static(path.join('backend/images')));

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

app.use(getBlogRoute);
app.use(postBlogRoute);
app.use(deleteBlogRoute);

module.exports = app;
