const fs = require('fs');

const tour = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8')
);

function getToursAll(req, res) {
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
}
function addTour(req, res) {
  const data = req.body;
  const newId = tour[tour.length - 1].id + 1;
  const completeObj = Object.assign({ id: newId }, data);
  tour.push(completeObj);
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tour),
    'utf-8',
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: tour,
        },
      });
    }
  );
}
function updateTour(req, res) {
  const id = +req.params.id;
  const data = tour.find((val) => val.id == id);
  res.status(200).json({
    status: 'success',
    data: {
      tours: 'ishladi',
    },
  });
}
function deleteTour(req, res) {
  const id = +req.params.id;
  const data = tour.filter((val) => val.id !== id);
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(data),
    'utf-8'
  );
}
function getByIdTour(req, res) {
  const id = +req.params.id;
  const data = tour.find((val) => val.id == id);
  if (!data) {
    res.status(404).json({
      status: 'failed',
      message: 'Invalid id',
    });
  } else {
    res.status(200).json({
      status: 'success',
      time: req.time,
      data: {
        data,
      },
    });
  }
}

module.exports = { getToursAll, addTour, updateTour, deleteTour, getByIdTour };
