const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jsonwt = require("jsonwebtoken");
const passport = require("passport");
const key = require("../../setup/config");

// @route    -  GET   /api/home
// @desc    -   A route to home page
// @access  -   PUBLIC
router.get("/", (req, res) => {
   res.render("home");
});

// import schema for person to register
const Person = require("../../models/Person");

// @route    -  POST   /api/auth/register
// @desc    -   A route to register page
// @access  -   PUBLIC
router.post("/register", (req, res) => {
   Person.findOne({ email: req.body.email })
      .then((person) => {
         if (person) {
            return res.status(400).json({
               emailerror: "Email is already registered, please go to login.",
            });
         } else {
            const newPerson = new Person({
               name: req.body.name,
               email: req.body.email,
               password: req.body.password,
            });
            // encrypt password here using bcryptjs
            bcrypt.genSalt(10, (err, salt) => {
               if (err)
                  res.status(200).json({ error: "Failded to generate salt!" });
               bcrypt.hash(newPerson.password, salt, (err, hash) => {
                  // Store hash in your password DB.
                  if (err) throw err;
                  newPerson.password = hash;
                  newPerson
                     .save()
                     .then((person) => res.json(person))
                     .catch((err) => {
                        res.status(400).json(err);
                        console.log(err);
                     });
               });
            });
         }
      })
      .catch((err) => console.log(err));
});

// @route    -  POST   /api/auth/login
// @desc    -   A route to login page
// @access  -   PUBLIC
router.post("/login", (req, res) => {
   const { email, password } = req.body;
   Person.findOne({ email })
      .then((person) => {
         if (!person) {
            res.status(400).json({
               error: "User not found!",
            });
         }
         bcrypt
            .compare(password, person.password)
            .then((isCorrect) => {
               if (isCorrect) {
                  res.status(200).json({
                     email,
                     message: "Login Successfully!",
                  });
               } else {
                  res.status(400).json({
                     email,
                     message: "Incorrect Password!",
                  });
               }
            })
            .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
});

module.exports = router;
