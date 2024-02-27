const express = require('express')
const notes = require('./data/note')
const dotenv = require('dotenv');
const connectDb = require('./config/db')

const userRoutes = require('./Routes/userRouter');
const noteRoutes = require('./Routes/noteRoutes');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');

const app = express();
dotenv.config();
connectDb();
app.use(express.json());


app.get('/', (req, res) => {
    try {
        res.send('hello world');
    } catch (error) {
        console.log(error);
    }
})

app.use('/api/users', userRoutes);
app.use('/api/notes', noteRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log('server started on http://localhost:5500'));