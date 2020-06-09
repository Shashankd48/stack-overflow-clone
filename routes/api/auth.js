const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jsonwt = require("jsonwebtoken");
const key = require("../../setup/config");

const ProfilePic = {
   male:
      "https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png",
   female:
      "https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_female2-512.png",
   default:
      "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png",
};
// import schema for person to register
const Person = require("../../models/Person");

// @route    -  POST   /api/auth/register
// @desc    -   A route to register page
// @access  -   PUBLIC
router.post("/register", (req, res) => {
   Person.findOne({ email: req.body.email, username: req.body.username })
      .then((person) => {
         if (person) {
            return res.status(400).json({
               emailerror: "Email is already registered, please go to login.",
            });
         } else {
            const { name, email, password, username, gender } = req.body;
            let profilepic =
               gender !== undefined && gender !== ""
                  ? gender === "Male"
                     ? ProfilePic.male
                     : ProfilePic.female
                  : ProfilePic.default;
            const newPerson = new Person({
               name,
               email,
               password,
               username,
               profilepic,
               gender,
            });
            // encrypt password here using bcryptjs
            bcrypt.genSalt(10, (err, salt) => {
               if (err) {
                  res.status(200).json({ error: "Failded to generate salt!" });
               }

               bcrypt.hash(newPerson.password, salt, (err, hash) => {
                  // Store hash in your password DB.
                  if (err) throw err;

                  newPerson.password = hash;
                  newPerson
                     .save()
                     .then((person) => {
                        person.password = undefined;
                        person.date = undefined;
                        person.__v = undefined;
                        res.status(200).json(person);
                     })
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
                  // JWT authentication with passport.js strategy
                  const payload = {
                     id: person._id,
                     email: person.email,
                     name: person.name,
                  };
                  jsonwt.sign(
                     payload,
                     key.secret,
                     { expiresIn: 3600 },
                     (error, token) => {
                        if (error) {
                           res.status(500).json({
                              success: false,
                              error,
                           });
                        }
                        res.status(200).json({
                           success: true,
                           token: `Bearer ${token}`,
                        });
                     }
                  );
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
