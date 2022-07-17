// app.js mainly used for middleware declartion
const morgan = require('morgan');
const express = require('express');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const app = express();
// middlewares
app.use(express.json());

// app.use((req, res, next) => {
//   console.log('Hello from middleware ✋');
//   next();
// });

app.use(morgan('dev'));

// app.use((req, res, next) => {
//   console.log('another middleware 🙂');
//   req.requestTime = new Date().toISOString();
//   next();
// });
// // for specific route
// app.use('/a', (req, res, next) => {
//   console.log(req.requestTime);
//   next();
// });

// Routes
// mounting routers
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
