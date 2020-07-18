const express = require('express');
const router = express.Router();
const controller = require('./../../controllers/users');

router.route('/')
    .get(controller.getAll)
    .post(controller.create)

router.route('/:id([0-9])')
    .get(controller.getByID)
    .put(controller.update)
    .delete(controller.remove);

module.exports = router;