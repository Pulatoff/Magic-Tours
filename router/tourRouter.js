const express = require('express');
const tourController = require('../Controller/tourController');

const app = express();

const tourRouter = express.Router();

tourRouter.route('/best-3-tours').get(tourController.getToursAll);

tourRouter.route('/stat').get(tourController.stats);

tourRouter
  .route('/')
  .get(tourController.getToursAll)
  .post(tourController.addTour);
tourRouter
  .route('/:id')
  .get(tourController.getByIdTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = tourRouter;
