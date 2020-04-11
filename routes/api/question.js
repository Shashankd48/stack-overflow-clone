const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('question');
})

module.exports = router;