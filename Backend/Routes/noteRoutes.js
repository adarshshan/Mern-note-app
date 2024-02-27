
const express = require('express');
const router = express.Router();
const { getNotes } = require("../Controllers/notesController");
const protect = require('../middlewares/authMiddleware');

router.route('/').get(protect, getNotes);
// router.route('/create').post();
// router.route('/:id').get().put().delete();

module.exports = router;

