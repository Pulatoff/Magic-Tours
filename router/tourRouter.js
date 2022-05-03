const fs = require('fs');
const express = require('express');
const tourController = require('../Controller/tourController');

const app = express();

const tourRouter = express.Router();

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
