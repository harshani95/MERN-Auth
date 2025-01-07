const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoute = require('./routes/UserRoute');
const authRoute = require('./routes/AuthRoute');

require('dotenv').config();

const port = process.env.SERVER_PORT | 3000;
const app = express();
app.use(express.json());
app.use(cors());


const startServer = async () => {
  try {
      await mongoose.connect('mongodb://127.0.0.1:27017/mernAuth');
      app.listen(port, () => {
          console.log(`Server started & running on port ${port}`);
      });
  } catch (e) {
      console.log('Error connecting to MongoDB:', e);
  }
};

startServer();


app.use('/api/v1/user', userRoute);
app.use('/api/v1/auth', authRoute);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success : false,
    message,
    statusCode,
  });
});