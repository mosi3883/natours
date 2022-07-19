const express = require('express');
const tourController = require('../controllers/tourController');

const router = express.Router();

// param middleware
// router.param('tourId', (req, res, next, val) => {
//   console.log('val ' + val);
//   next();
// });

// router.param('tourId', tourController.checkID);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);
router
  .route('/:tourId')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
