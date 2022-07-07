const morgan = require('morgan');
const express = require('express');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const app = express();
// middlewares
app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello from middleware ✋');
  next();
});

app.use(morgan('dev'));

app.use((req, res, next) => {
  console.log('another middleware 🙂');
  req.requestTime = new Date().toISOString();
  next();
});
// for specific route
app.use('/a', (req, res, next) => {
  console.log(req.requestTime);
  next();
});

// Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// creating server
const port = 8000;
app.listen(port, () => {
  console.log(`server running at http://127.0.0.1:${port}`);
});
