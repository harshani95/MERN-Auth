const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require('./routes/UserRoute');
const authRoute = require('./routes/AuthRoute');

dotenv.config();

mongoose.connect(process.env.MONGODB)
.then(() => {
  console.log("Connected to MongoDB");
})
.catch((err) => {
    console.error(err);
})
;

const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use('/api/v1/user', userRoute);
app.use('/api/v1/auth', authRoute);