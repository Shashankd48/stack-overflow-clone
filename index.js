require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const app = express();
const port = process.env.PORT || 5000;

// Bring all routes
const auth = require("./routes/api/auth");
const profile = require("./routes/api/profile");
const question = require("./routes/api/question");

// Middleware for body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());

// Configuration for JWT strategy
require("./strategies/jsonwtStrategy")(passport);

// mongoDB configuration
const db = require("./setup/config").mongoURL;

// Attempt to connect to database
mongoose
   .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
   })
   .then(() => console.log("MongoDB Connected Successfully!!!"))
   .catch((err) => console.log("Failed To Connect DB"));

// @middleware    -  /api/auth
// @desc    -   A route to home page
// @access  -   PUBLIC
app.use("/api/auth", auth);

// @middleware    -  /api/prfile
// @desc    -   A route to welcome page
// @access  -   PRIVATE
app.use("/api/profile", profile);

// @middleware    -  /api/quations
// @desc    -   A route to welcome page
// @access  -   PRIVATE
app.use("/api/question", question);

app.listen(port, () =>
   console.log(`Server is running on localhost at port ${port}`)
);
