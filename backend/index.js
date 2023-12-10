import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import userRoute from '../backend/routes/userRoute.js';
import signupRoute from '../backend/routes/signupRoute.js';
const app = express();
const port = 3000;
dotenv.config();

mongoose
.connect(process.env.MONGO_URL)
.then(() => {
    console.log('MongoDB Connected');
})
.catch((err) => {
    console.log(err);
});


app.use(express.json());

app.listen(port, () => {
  console.log(`Sever running on port ${port}`)
})

app.use('/backend', userRoute)
app.use('/backend', signupRoute)


app.use((err, req, res, next) => {
  const statuscode = err.statuscode || 500;
  const message = err.message || 'Internar Server Error';
  return res.status(statuscode).json({
    success: false,
    message,
    statuscode
  });
});