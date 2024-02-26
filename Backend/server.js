const express = require('express')
const notes = require('./data/note')
const dotenv = require('dotenv');
const connectDb = require('./config/db')

const app = express();
dotenv.config();
connectDb();


app.get('/', (req, res) => {
    try {
        res.send('hello world');
    } catch (error) {
        console.log(error);
    }
})
app.get('/api/notes', (req, res) => {
    try {
        // console.log(notes)
        res.json(notes);
    } catch (error) {
        console.log(error)
    }
})
app.get('/api/notes/:id/', (req, res) => {
    const note = notes.find((n) => n._id === req.params.id);
    res.send(note);
})

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log('server started on http://localhost:5500'));