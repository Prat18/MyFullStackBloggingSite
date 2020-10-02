const express = require("express");
const bcrypt = require("bcryptjs");
const userSchema = require("../models/user");
const tokenSchema = require("../models/token");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { env } = require("process");

const router = express.Router();

router.post("/signup", (req, res, next) => {
  console.log(req.body.username, req.body.email, req.body.password);
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new userSchema({
        name: req.body.username,
        email: req.body.email,
        password: hash,
      });

      user
        .save()
        .then((user) => {
          let savedUser = user;
          const token = new tokenSchema({
            userId: user._id,
            token: crypto.randomBytes(16).toString("hex"),
          });
          token
            .save()
            .then((token) => {
              var transporter = nodemailer.createTransport({
                service: env.SERVICE,
                auth: {
                  user: env.GMAIL_ID,
                  pass: env.GMAIL_PASSWORD,
                },
              });
              var mailOptions = {
                from: env.GMAIL_ID,
                to: savedUser.email,
                subject: "Account Verification Token",
                text:
                  "Hello,\n\n" +
                  "Please verify your account by clicking the link: \n\nhttp://localhost:4200" +
                  "/confirmation/" +
                  token.token +
                  ".\n\n" +
                  "Regards,\nPratyush K.",
              };
              transporter
                .sendMail(mailOptions)
                .then(() => {
                  return res
                    .status(200)
                    .json({ message: "User created successfully!" });
                })
                .catch((error) => {
                  console.log(error);
                });
            })
            .catch((error) => {
              console.log(error);
              res.status(500).json({ message: "Invalid verification token!" });
            });
        })
        .catch((error) => {
          console.log(error);
          res
            .status(500)
            .json({ message: "Invalid authentication credentials!" });
        });
    })
    .catch((error) => {
      res.status(500).json({ message: "Invalid authentication credentials!" });
    });
});

router.post("/confirm-account", (req, res, next) => {
  tokenSchema
    .findOne({ token: req.body.token })
    .then((token) => {
      userSchema
        .findOne({ _id: token.userId, email: req.body.email })
        .then((user) => {
          if (user.isVarified)
            return res.status(400).json({
              type: "already-verified",
              message: "This user has already been verified.",
            });
          user.isVerified = true;
          user
            .save()
            .then((user) => {
              console.log(user);
              res.status(200).json({
                message: "The account has been verified. Please log in.",
              });
            })
            .catch((error) => {
              console.log(error);
              return res
                .status(500)
                .json({ message: "User could not be verified." });
            });
        })
        .catch((error) => {
          console.log(error);
          res
            .status(400)
            .json({ message: "We were unable to find a user for this token." });
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({
        type: "not-verified",
        msg:
          "We were unable to find a valid token. Your token may have expired.",
      });
    });
});

router.post("/resend-token", (req, res, next) => {
  console.log(req.body.email);
  let savedUser;
  userSchema.findOne({ email: req.body.email }).then((user) => {
    savedUser = user;
    if (!user) return res.status(400).json({ message: "user not found." });
    if (user.isVarified)
      return res.status(400).json({ message: "user is already verified." });
    const token = new tokenSchema({
      userId: user._id,
      token: crypto.randomBytes(16).toString("hex"),
    });
    token
      .save()
      .then((token) => {
        const transporter = nodemailer.createTransport({
          service: process.env.SERVICE,
          auth: {
            user: process.env.GMAIL_ID,
            pass: process.env.GMAIL_PASSWORD,
          },
        });
        const mailOptions = {
          from: process.env.GMAIL_ID,
          to: savedUser.email,
          subject: "Account Verification Token",
          text:
            "Hello,\n\n" +
            "Please verify your account by clicking the link: \n\nhttp://localhost:4200" +
            "/confirmation/" +
            token.token +
            ".\n\n" +
            "Regards,\nPratyush K.",
        };
        transporter
          .sendMail(mailOptions)
          .then(() => {
            return res.status(200).json({ message: "Token sent!" });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ message: "Invalid verification token!" });
      });
  });
});

router.post("/login", (req, res, next) => {
  let fetchedUser;
  userSchema
    .findOne({ email: req.body.email })
    .then((user) => {
      if (!user) return res.status(401).json({ message: "Invalid email!" });
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result)
        return res.status(401).json({ message: "Invalid password!" });
      const token = jwt.sign(
        {
          name: fetchedUser.name,
          email: fetchedUser.email,
          userId: fetchedUser._id,
        },
        "this-is-my-secret-sauce",
        { expiresIn: "1h" }
      );
      res
        .status(200)
        .json({ token: token, expiresIn: 3600, userId: fetchedUser._id });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post("/password-reset-request", (req, res, next) => {
  const email = req.body.email;
  let savedUser;
  userSchema
    .findOne({ email: email })
    .then((user) => {
      savedUser = user;
      const token = new tokenSchema({
        userId: user._id,
        token: crypto.randomBytes(16).toString("hex"),
      });
      token
        .save()
        .then(() => {
          const transporter = nodemailer.createTransport({
            service: env.SERVICE,
            auth: {
              user: env.GMAIL_ID,
              pass: env.GMAIL_PASSWORD,
            },
          });

          const mailOptions = {
            from: env.GMAIL_ID,
            to: savedUser.email,
            subject: "Password reset request.",
            text:
              "Hello,\n\n" +
              "Please reset your password by clicking the link: \n\nhttp://localhost:4200" +
              "/reset-password/" +
              token.token +
              ".\n\n" +
              "Regards,\nPratyush K.",
          };

          transporter
            .sendMail(mailOptions)
            .then(() => {
              res.status(200).json({ message: "email sent." });
            })
            .catch((error) => {
              console.log(error);
              res.status(500).json({
                message: "Could not send the email. Please try again!",
              });
            });
        })
        .catch((error) => {
          console.log(error);
          res.status(500).json({ message: "failed to generate token." });
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ message: "Invalid email." });
    });
});

router.post("/reset-password", (req, res, next) => {
  const token = req.body.token;
  const email = req.body.email;
  userSchema
    .findOne({ email: email })
    .then((user) => {
      if (user.isVarified)
        return res.status(400).json({
          message:
            "Your account is not varified! Please verify your account first.",
        });
      tokenSchema
        .findOne({ token: token })
        .then((savedToken) => {
          if (!savedToken)
            return res.status(400).json({ message: "Invalid token." });
          bcrypt.hash(req.body.password, 10).then(
            (hash) => {
              userSchema
                .updateOne({ _id: savedToken.userId }, { password: hash })
                .then(
                  (result) => {
                    res
                      .status(200)
                      .json({ message: "password reset successful!" });
                    tokenSchema.deleteOne({ token: token }).then((result) => {
                      console.log(result);
                    });
                  },
                  (error) => {
                    res.status(500).json({ message: "password reset failed!" });
                  }
                );
            },
            (error) => {
              return res.status(500).json({ message: "hashiig failed!" });
            }
          );
        })
        .catch((error) => {
          console.log(error);
          res.status(400).json({ message: "Invalid token." });
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ message: "Invalid email." });
    });
});

module.exports = router;
