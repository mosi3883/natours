const fs = require('fs');
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8')
);
// route handlers
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
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

exports.getTour = (req, res) => {
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

exports.updateTour = (req, res) => {
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
  exports.updatedTour = {};
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

exports.deleteTour = (req, res) => {
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
