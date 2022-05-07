const Tour = require('../Model/tourModel');
const APIFeatures = require('../helper/APIFeatures');
const res = require('express/lib/response');

async function getToursAll(req, res) {
  try {
    // API ustunliklari

    let data = new APIFeatures(Tour, req.query)
      .filter()
      .sort()
      .pagination()
      .field();

    // Limited found

    if (req.query.page) {
      const numberOfDocument = await Tour.countDocuments();
      if (numberOfDocument <= (req.query.page - 1) * req.query.limit) {
        throw new Error('this page doesnt Exsist');
      }
    }

    const queryData = await data.surov;

    if (!queryData.length) throw new Error('Error');

    res.status(200).json({
      status: 'success',
      data: queryData,
    });
  } catch (e) {
    res.status(404).json({
      status: 'fail',
      message: e.message,
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

async function stats(req, res) {
  try {
    const data = await Tour.aggregate([
      {
        $match: { difficulty: 'medium' },
      },
      { $group: { _id: {}, averagePrice: { $avg: '$price' } } },
    ]);
    res.status(200).json({
      status: 'success',
      data: data,
    });
  } catch (e) {
    console.log(e);
    res.status(404).json({
      status: 'failed',
    });
  }
}

// Export functions

module.exports = {
  getToursAll,
  addTour,
  updateTour,
  deleteTour,
  getByIdTour,
  stats,
};
