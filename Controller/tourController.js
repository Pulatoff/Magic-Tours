const Tour = require('../Model/tourModel');

async function getToursAll(req, res) {
  try {
    // API ustunliklari
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
        this.surov = this.surov.find(JSON.parse(queryStr));
        return this;
      }
      sort() {
        if (this.surovUrl.sort) {
          const querySort = this.surovUrl.sort.split(',').join(' ');
          this.surov = this.surov.sort(querySort);
        }
        return this;
      }
      field() {
        if (this.surovUrl.field) {
          const queryField = this.surovUrl.field.split(',').join(' ');
          this.surov = this.surov.select(queryField);
        } else {
          this.surov = this.surov.select('-__v');
        }
        return this;
      }
      pagination() {
        const page = this.surovUrl.page * 1 || 1;
        const limit = this.surovUrl.limit * 1 || 3;
        const skip = (page - 1) * limit;
        this.surov = this.surov.skip(skip).limit(limit);
        return this;
      }
    }

    let data = new APIFeatures(Tour, req.query)
      .filter()
      .sort()
      .pagination()
      .field();

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

// Export functions

module.exports = { getToursAll, addTour, updateTour, deleteTour, getByIdTour };
