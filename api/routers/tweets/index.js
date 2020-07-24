const express = require('express');
const router = express.Router();
const controller = require('./../../controllers/tweets');

router.route('/')
    .get(controller.getAll)
    .post(controller.create)
    .delete(controller.remove);

router.route('/lasts/:count')
    .get(controller.getLastNTweets);

router.route('/:id')
    .get(controller.getByID)
    .put(controller.update);

router.route('/:id/comment')
    .post(controller.newComment);

router.route('/:id/comments')
    .delete(controller.removeComment);

router.route('/:id/comments/count')
    .get(controller.getCommentsCount)

module.exports = router;