const express = require('express');
const router = express.Router();
const controller = require('./../../controllers/tweets');
const authentication = require('./../../middlewares/authentication');

router.route('/')
    .get(authentication,controller.getAll)
    .post(authentication, controller.create)
    .delete(controller.remove);

router.route('/lasts/:count')
    .get(authentication,controller.getLastNTweets);

router.route('/top/commenters/:count')
    .get(authentication,controller.getTopNTweet);


router.route('/:id')
    .get(authentication,controller.getByID)
    .put(authentication,controller.update);

router.route('/:id/comment')
    .post(authentication,controller.newComment);

router.route('/:id/comments')
    .delete(authentication,controller.removeComment);

router.route('/:id/comments/count')
    .get(authentication,controller.getCommentsCount)

router.route('/top/:count')
    .get(authentication,controller.getTopCommentedTweets)

module.exports = router;