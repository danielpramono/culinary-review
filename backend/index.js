import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import userRoute from '../backend/routes/userRoute.js';
import signupRoute from '../backend/routes/signupRoute.js';
import signinRoute from '../backend/routes/signinRoute.js';
import googleRoute from '../backend/routes/googleRoute.js';
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
app.use('/backend', signinRoute)
app.use('/backend', googleRoute)


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});