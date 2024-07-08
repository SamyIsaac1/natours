const morgan = require('morgan');
const express = require('express');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// MIDDELWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
//  Body parsing
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// custom middleware
// app.use((req, res, next) => {
//   console.log('hello from middleware');
//   next();
// });

app.get('/', (req, res) => {
  res.status(200).json({ hello: 'hello' });
});

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// Not Found
app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can't found ${req.originalUrl} on this server!`,
  // });
  const err = new AppError(
    `Can't found ${req.originalUrl} on this server!`,
    404,
  );
  next(err);
});

app.use(globalErrorHandler);

module.exports = app;
