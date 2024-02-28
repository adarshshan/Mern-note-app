const Note = require('../Model/noteModel');
const asyncHandler = require('express-async-handler');

const getNotes = asyncHandler(async (req, res) => {
    console.log(`hello world................................................................`);
    const notes = await Note.find({ user: req.user._id });
    res.json(notes)
})
const createNote = asyncHandler(async (req, res) => {
    const { title, content, category } = req.body;
    if (!title || !content || !category) {
        res.status(400);
        throw new Error('Please fill all the fields.')
    } else {
        const note = new Note({ user: req.user._id, title, content, category })
    }
})

module.exports = { getNotes }