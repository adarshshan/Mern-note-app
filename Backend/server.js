const express = require('express')
const dotenv = require('dotenv');
const connectDb = require('./config/db')
const cors = require('cors');

const userRoutes = require('./Routes/userRouter');
const noteRoutes = require('./Routes/noteRoutes');
const adminRoutes = require('./Routes/adminRoutes');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config();
connectDb();



app.use('/api/users', userRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/admin', adminRoutes);



app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log('server started on http://localhost:5500'));