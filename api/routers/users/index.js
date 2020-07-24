const express = require('express');
const router = express.Router();
const controller = require('./../../controllers/users');

router.route('/')
    .get(controller.getAll)
    .post(controller.create)
    .delete(controller.remove);

router.route('/tweets/count')
    .get(controller.getCountTweets);

router.route('/:id')
    .get(controller.getByID)
    .put(controller.update)

router.route('/:id/tweets')
    .get(controller.getUserTweets);

module.exports = router;