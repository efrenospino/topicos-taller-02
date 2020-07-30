const express = require('express');
const router = express.Router();
const users = require('./routers/users')
const tweets = require('./routers/tweets') 

router.get('/', (req, res) => {
    res.send('API');
});

router.use('/users', users);
router.use('/tweets', tweets); 



module.exports = router;