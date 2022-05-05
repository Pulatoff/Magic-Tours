const Tour = require('../Model/tourModel');

async function getToursAll(req, res) {
  try {
    class APIFeatures {
      constructor(surov, surovUrl) {
        this.surov = surov;
        this.surovUrl = surovUrl;
      }
      filter() {
        const query = { ...this.surovUrl };
        const removeQuery = ['sort', 'page', 'limit', 'field'];
        removeQuery.forEach((val) => delete query[val]);
        const queryStr = JSON.stringify(query)
          .replace(/\bgt\b/g, '$gt')
          .replace(/\bgte\b/g, '$gte')
          .replace(/\blt\b/g, '$lt')
          .replace(/\blte\b/g, '$lte');
        this.surov.find(JSON.parse(queryStr));
        return this;
      }
      sort() {
        if (this.surovUrl.sort) {
          const querySort = this.surovUrl.sort.split(',').join(' ');
          this.surov.sort(querySort);
          return this;
        }
      }
    }

    // 1 Filtering

    let data = new APIFeatures(Tour, req.query).filter().sort();
    // 2 Sorting

    // 3 Field

    // if (req.query.field) {
    //   const queryField = req.query.field.split(',').join(' ');
    //   data = data.select(queryField);
    // } else {
    //   data = data.select('-__v');
    // }

    // 4 Pagination

    // const page = req.query.page * 1 || 1;
    // const limit = req.query.limit * 1 || 3;
    // const skip = (page - 1) * limit;
    // data = data.skip(skip).limit(limit);

    const queryData = await data.surov;
    // if (req.query.page) {
    //   const numberOfDocument = await Tour.countDocuments();
    //   if (numberOfDocument <= skip) {
    //     throw new Error('this page doesnt Exsist');
    //   }
    // }

    if (!queryData.length) throw new Error('Error');
    res.status(200).json({
      status: 'success',
      data: queryData,
    });
  } catch (e) {
    console.log(e);
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

module.exports = { getToursAll, addTour, updateTour, deleteTour, getByIdTour };
