const fs = require('fs');
const Tour = require('./../models/tourModel');
// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8')
// );

const tours = [];

// exports.checkID = (req, res, next, val) => {
//   const tour = tours.find((tour) => tour.id === +val);
//   if (!tour) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'tour id is not valid',
//     });
//   } else {
//     next();
//   }
// };

// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(400).json({
//       status: 'fail',
//       message: 'invalid request(no name or price)',
//     });
//   }
//   next();
// };

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

exports.createTour = async (req, res) => {
  // method 1
  //const newTour = new Tour({});
  //newTour.save();

  // method 2
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.getTour = (req, res) => {
  const { tourId } = req.params;
  const tour = tours.find((tour) => tour.id === +tourId);
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.updateTour = (req, res) => {
  const { tourId } = req.params;
  const tour = tours.find((tour) => tour.id === +tourId);

  // const newTours = tours.map((tour) => {
  //   if (tour.id === +tourId) {
  //     return Object.assign(tour, req.body);
  //   } else {
  //     return tour;
  //   }
  // });
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

  const deletedTour = {};
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
