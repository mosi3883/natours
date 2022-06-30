const fs = require('fs');

const express = require('express');

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello from middleware ✋');
  next();
});

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

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8')
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    'utf-8',
    (err) => {
      if (err) {
      }
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const getTour = (req, res) => {
  const { tourId } = req.params;
  const tour = tours.find((tour) => tour.id === +tourId);
  if (!tour) {
    res.status(404).json({
      status: 'fail',
      message: 'tour not found!',
    });
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  }
};

const updateTour = (req, res) => {
  const { tourId } = req.params;
  const tour = tours.find((tour) => tour.id === +tourId);
  if (!tour) {
    res.status(404).json({
      status: 'fail',
      message: 'tour not found!',
    });
  }
  const newTours = tours.map((tour) => {
    if (tour.id === +tourId) {
      return Object.assign(tour, req.body);
    } else {
      return tour;
    }
  });
  const updatedTour = {};
  res.json(200).json({
    status: 'success',
    data: {
      tour,
      status: 'success',
      data: {
        tour: updatedTour,
      },
    },
  });
};

const deleteTour = (req, res) => {
  const { tourId } = req.params;
  const tour = tours.find((tour) => tour.id === +tourId);
  if (!tour) {
    res.status(404).json({
      status: 'fail',
      message: 'tour not found!',
    });
  } else {
    const deletedTour = {};
    res.status(204).json({
      status: 'success',
      data: null,
    });
  }
};

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:tourId', getTour);
// app.patch('/api/v1/tours/:tourId', updateTour);
// app.delete('/api/v1/tours/:tourId', deleteTour);

app.route('/api/v1/tours').get(getAllTours).post(createTour);
app
  .route('/api/v1/tours/:tourId')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

// creating server
const port = 8000;
app.listen(port, () => {
  console.log(`server running at http://127.0.0.1:${port}`);
});
