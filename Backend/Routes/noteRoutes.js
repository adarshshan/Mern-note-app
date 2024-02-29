
const express = require('express');
const router = express.Router();
const {
    getNotes,
    createNote,
    getNoteById,
    updateNote, 
    deleteNote} = require("../Controllers/notesController");
const { protect } = require('../middlewares/authMiddleware');

// router.route('/').get(protect, getNotes);
// router.route('/create').post();
// router.route('/:id').get().put().delete();
router.get('/', protect, getNotes)
router.post('/create', protect, createNote);
router.get('/:id', getNoteById)
    .put('/:id', protect, updateNote)
    .delete('/:id',protect,deleteNote);

module.exports = router;

