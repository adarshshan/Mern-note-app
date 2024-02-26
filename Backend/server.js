const express = require('express')
const notes = require('./data/note')
const dotenv = require('dotenv');

const app = express();
dotenv.config();


app.get('/', (req, res) => {
    try {
        res.send('hello world');
    } catch (error) {
        console.log(error);
    }
})
app.get('/api/notes', (req, res) => {
    try {
        res.json(notes);
    } catch (error) {
        console.log(error)
    }
})
app.get('/api/notes/:id/', (req, res) => {
    const note = notes.find((n) => n._id === req.params.id);
    res.send(note);
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('server started on http://localhost:5500'));