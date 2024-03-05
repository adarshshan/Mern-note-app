const express = require('express')
const dotenv = require('dotenv');
const connectDb = require('./config/db')
const cors = require('cors');
const path = require('path');

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

//............Deployment...........

// const __dirname1 = path.resolve()
// if (process.env.NODE_ENV === "development") {
//     app.use(express.static(path.join(__dirname1, "/frontend/build")));

//     app.get("*", (req, res) => {
//         res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"));
//     })
// } else {
//     app.get("/", (req, res) => {
//         res.send("api is running successsfully");
//     })
// }
//............Deployment...........


app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log('server started on http://localhost:5500'));