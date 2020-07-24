const express = require('express');
const router = express.Router();
const controller = require('./../../controllers/tweets');

router.route('/')
    .get(controller.getAll)
    .post(controller.create)
    .delete(controller.remove);

router.route('/:id')
    .get(controller.getByID)
    .put(controller.update);

router.route('/:id/comment')
    .post(controller.newComment);

module.exports = router;