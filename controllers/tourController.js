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
    // access query strings with req.query
    //console.log(req.query);
    // first way of filtering
    //const tours = await Tour.find(req.query);

    // second way of filtering(using where equals ,lt,lte,lg,lgt,... methids)
    // // remmeber find will return Query so we can chain othermethods(like where,lt,...)
    // const tours = await Tour.find()
    //   .where('duration')
    //   .equals(5)
    //   .where('difficulty')
    //   .equals('easy');
    // creating query
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]); // remove excludes

    // advanced
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
    const newQuereyObj = JSON.parse(queryStr);
    const query = Tour.find(newQuereyObj); // if we await here we cant chain methods on result

    // find on advanced filtering
    // {   difficulty: 'easy', duration: {$gte: 5}  }

    // query string on advanced filtering
    // 127.0.0.1:9000/api/v1/tours?duration[gte]=5&difficulty=easy
    // console.log(req.query); { difficulty: 'easy', duration: { gte: '5' } }
    // so will need convert gte to $gte

    const tours = await query; // converting query to document(execute query after chaning methods)
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

exports.deleteTour = async (req, res) => {
  try {
    const { tourId } = req.params;

    await Tour.findByIdAndDelete(tourId);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};
