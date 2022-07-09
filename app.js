// app.js mainly used for middleware declartion
const morgan = require('morgan');
const express = require('express');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
// middlewares
app.use(express.json());
// serve static
app.use(express.static(`${__dirname}/public`));
app.use(morgan('dev'));

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
