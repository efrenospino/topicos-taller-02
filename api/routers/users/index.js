const express = require('express');
const router = express.Router();
const controller = require('./../../controllers/users');
const logger = require('./../../middlewares/logger');

router.route('/')
    .get(controller.getAll)
    .post(logger, controller.create)
    .delete(logger, controller.remove);

router.route('/tweets/count')
    .get(controller.getCountTweets);

router.route('/:id')
    .get(controller.getByID)
    .put(logger, controller.update)

router.route('/:id/tweets')
    .get(controller.getUserTweets);

router.route('/login')
    .post(logger, controller.loginUser);

module.exports = router;