require('dotenv').config({ path: __dirname + '/.env' });

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// routes
const exerciseRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exerciseRouter);
app.use('/users', usersRouter);

app.get('/', (req, res) => {
  res.send('API is running. Try /users or /exercises');
});

// db + server start
const uri = process.env.ATLAS_URI;

if (!uri) {
  console.error('ATLAS_URI is missing. Check backend/.env');
  process.exit(1);
}

mongoose
  .connect(uri)
  .then(() => {
    console.log('MongoDB database connection established successfully');
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
      console.log(`http://localhost:${port}/`);
      console.log(`http://localhost:${port}/users`);
      console.log(`http://localhost:${port}/exercises`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });