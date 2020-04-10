const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

app.get('/', (req, res) => {
    res.send('Stack Overflow');
})

app.listen(port, () => console.log(`Server is running on localhost at port ${port}`));