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
exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
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

exports.getTour = async (req, res) => {
  try {
    const { tourId } = req.params;
    const tour = await Tour.findById(tourId);
    // const tour = await Tour.findOne({ _id: tourId });
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const { tourId } = req.params;
    const updatedTour = await Tour.findByIdAndUpdate(tourId, req.body, {
      return: true,
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        tour: updatedTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
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
