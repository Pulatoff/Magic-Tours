// Global uzgaruvchilaga olish kutubhonasi

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE;

// Proekitimiz app.js kodlari

const app = require('./app');

const User = require('./Model/User');

// Database bilan ulash Applicationimizni

const mongoose = require('mongoose');

// MONGOOSE drayverini DATABASE bn ulash

mongoose.connect(
  DB,
  () => {
    console.log('DATABASE conected');
  },
  (e) => {
    console.log(e);
  }
);

// mongoose.set({ autoIndex: false });

// DATABASEga kirib keluvchi maulmotlarni Schemalashtirish

async function run() {
  const data = {
    firstName: 'Niyozbek',
    lastName: 'Pulatov',
    age: 18,
  };
  const user = new User(data);
  await user.save();
  console.log(user);
}

// run();

// ++==--**= Serverni ishlashi =**--==++

const port = dotenv.PORT || 8000;
app.listen(port, dotenv.URL);
