const mongoose = require('mongoose');
// creating schema
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name!'],
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, 'a tour must have duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'a tour must have group size'],
  },
  difficulty: {
    type: String,
    required: [true, 'a tour must have difficulty'],
  },
  // rating: Number,
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    required: [true, 'A tour must have a summary'],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a image cover'],
  },
  images: [String], //array of string
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDates: [Date],
});

// creating model

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
