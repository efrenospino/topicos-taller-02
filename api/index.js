const express = require('express');
const router = express.Router();
const users = require('./routers/users')

router.get('/', (req, res) => {
    res.send('API');
});

router.use('/users', users);

module.exports = router;