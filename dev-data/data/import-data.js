const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE;
const Tour = require('../../Model/tourModel');

const data = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

async function dataRun() {
  try {
    const dataBit = await Tour.create(data);
  } catch (e) {
    console.log('hatto');
  }
}

mongoose.connect(
  DB,
  () => {
    console.log('conect');
  },
  (e) => {
    console.log(e);
  }
);

async function deleteFunct() {
  try {
    const deleteD = await Tour.deleteMany();
    console.log('hamma malumot uchirildi');
  } catch (e) {
    console.log(e);
  }
}

if (process.argv[2] === '--add') {
  dataRun();
} else if (process.argv[2] === '--remove') {
  deleteFunct();
}
console.log(process.argv);
