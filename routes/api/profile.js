const express = require("express");
const router = express.Router();
const passport = require("passport");
const key = require("../../setup/config");
const Person = require("../../models/Person");

// @route    -  GET   /api/user/profile
// @desc    -   A route to login page
// @access  -   PRIVATE
router.get(
   "/user",
   passport.authenticate("jwt", { session: false }),
   (req, res) => {
      // console.log(req);
      const { id, name, email, profilepic } = req.user;
      res.json({ id, name, email, profilepic });
   }
);

// @route    -  GET   /api/user/allusers
// @desc    -   A route to login page
// @access  -   PRIVATE
router.get("/allusers", (req, res) => {
   Person.find({}, (err, person) => {
      if (err || !person) {
         res.status(400).json({
            error: "No record Found !",
         });
      }
      res.status(200).json({
         person,
      });
   });
});

module.exports = router;
