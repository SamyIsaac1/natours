const express = require('express');

const router = express.Router();
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');
const reviewRouter = require('./reviewRoutes');

// GET   /tour/12354/reviews
// POST  /tour/12354/reviews
router.use('/:tourId/reviews', reviewRouter);

// ignored if there is not id provided
// router.param('id', tourController.checkID);

//? Aliasing
router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);
router
  .route('/monthly-plan/:year')
  .get(
    authController.protect,
    authController.restrictTo('lead-guide', 'admin', 'guide'),
    tourController.getMonthlyPlan,
  );

router
  .route('/')
  .get(tourController.getAllTours)
  .post(
    authController.protect,
    authController.restrictTo('lead-guide', 'admin'),
    tourController.createTour,
  );

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo('lead-guide', 'admin'),
    tourController.updateTour,
  )
  .delete(
    authController.protect,
    authController.restrictTo('lead-guide', 'admin'),
    tourController.deleteTour,
  );

module.exports = router;
