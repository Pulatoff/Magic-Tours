const Tour = require('../Model/tourModel');

async function getToursAll(req, res) {
  try {
    const data = await Tour.find();
    res.status(200).json({
      status: 'success',
      data: data,
    });
  } catch (e) {
    res.status(404).json({
      status: 'fail',
      message: 'invalid data',
    });
  }
}

async function addTour(req, res) {
  try {
    const data = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: data,
    });
  } catch (e) {
    res.status(404).json({
      status: 'fail',
      message: 'invalid data',
    });
  }
}

async function updateTour(req, res) {
  try {
    const data = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: data,
    });
  } catch (e) {
    res.status(404).json({
      status: 'failed',
      message: 'Invalid id',
    });
  }
}

async function deleteTour(req, res) {
  try {
    const data = await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
    });
  } catch (e) {
    res.status(404).json({
      status: 'failed',
      message: 'Invalid id',
    });
  }
}

async function getByIdTour(req, res) {
  try {
    const data = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: data,
    });
  } catch (e) {
    res.status(404).json({
      status: 'failed',
      message: 'Invalid id',
    });
  }
}

module.exports = { getToursAll, addTour, updateTour, deleteTour, getByIdTour };
