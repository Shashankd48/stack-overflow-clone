require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const port = process.env.PORT || 5000;

// middleware for template engine
var viewPath = path.join(__dirname, "app/views");
app.set("view engine", "ejs");

// Bring all routes
const auth = require("./routes/api/auth");
const profile = require("./routes/api/profile");
const question = require("./routes/api/question");

// Middleware for body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
   .catch((err) => console.log(err));

// @route    -  GET   /api/auth
// @desc    -   A route to home page
// @access  -   PUBLIC
app.use("/api/auth", auth);
app.use("/", auth);
// @route    -  POST   /api/profile
// @desc    -   A route to welcome page
// @access  -   PRIVATE
app.use("/api/profile", profile);

// @route    -  GET   /api/question
// @desc    -   A route to welcome page
// @access  -   PRIVATE
app.use("/api/question", question);

app.listen(port, () =>
   console.log(`Server is running on localhost at port ${port}`)
);
