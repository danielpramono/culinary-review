import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv';
const app = express()
const port = 3000
dotenv.config();

mongoose
.connect(process.env.MONGO_URL)
.then(() => {
    console.log('MongoDB Connected');
})
.catch((err) => {
    console.log(err);
});

app.listen(port, () => {
  console.log(`Sever running on port ${port}`)
})