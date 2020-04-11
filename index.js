const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;

// mongoDB configuration
const db = require('./setup/config').mongoURL;

// Attempt to connect to database
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected Successfully!!!'))
    .catch(err => console.log(err));


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
app.set('view engine', 'ejs');


// @route    -  GET   /
// @desc    -   A route to home page
// @access  -   PUBLIC
app.get('/',(req, res) => {
    res.render('home');
})

// @route    -  POST   /welcome
// @desc    -   A route to welcome page
// @access  -   PRIVATE
app.post('/welcome', (req, res) => {
    var data = req.body;
    console.log(data);
    res.render('index', {data: data});
})

app.listen(port, () => console.log(`Server is running on localhost at port ${port}`));