const Note = require('../Model/noteModel');
const asyncHandler = require('express-async-handler');

const getNotes = asyncHandler(async (req, res) => {
    console.log(`hello world................................................................`);
    const notes = await Note.find();
    res.json(notes)
})

module.exports = { getNotes }