require('dotenv').config();
require('express-async-errors');
// const errorHandlerMiddleware = require('./Middlewares/ErrorHandler');
const connectDB = require('./Utils/connectDB');
const express = require('express');
const app = express();
const cors = require('cors');

const Kitchen = require('./Routes/Kitchen');

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.send('ok');
});

app.use('/api/v1/kitchen', Kitchen);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(3000, () => {
      console.log('server is listening on port 3000');
    });
  } catch (error) {
    console.log(error);
  }
};

start();
