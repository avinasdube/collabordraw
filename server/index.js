// importing necessary dependencies
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/dbconfig.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// importing routes
import authRoute from './routes/authRoute.js';

// configuring dotenv path
dotenv.config({
    path: './.env'
});

// creating an express app
const app = express();

// defining PORT and corsOrigin
const PORT = process.env.PORT;
const corsOrigins = process.env.CORS_ORIGIN.split(',');

// setting corsOptions
const corsOptions = {
    origin: corsOrigins,
    credentials: true
}

// configuring app middlewares
app.use(cors(corsOptions));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// defining routes
app.use("/api/auth", authRoute);

// connecting database and starting server
connectDB()
    .then(() => {
        app.listen(PORT || 8800, () => {
            console.log(`⚙️  Server is running at port : ${PORT}`);
            app.get("/", (req, res) => {
                res.status(201).send("Hi, from index.js ! Your server is running successfully.");
            })
        })
    })
    .catch((error) => {
        console.log("Error starting the server !!", error);
    })