const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    var data = req.body;
    console.log(data);
    res.render('profile', {data: data});
})

module.exports = router;