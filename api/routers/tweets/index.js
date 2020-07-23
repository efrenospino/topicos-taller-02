const express = require('express');
const router = express.Router();
const controller = require('./../../controllers/tweets');

router.route('/')
    .get(controller.getAll)
    .post(controller.create)

router.route('/:id')
    .get(controller.getByID)
    .put(controller.update)
    .delete(controller.remove);

router.route('/:id/comment')
    .post(controller.newComment);

router.route('/:id/comments')
    .delete(controller.removeComment);

module.exports = router;