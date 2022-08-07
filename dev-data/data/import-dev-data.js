const fs = require('fs');
const mongoose = require('mongoose');
const { exit } = require('process');
require('dotenv').config();
const Tour = require('./../../models/tourModel.js');

const dbString = process.env.DATABASE.replace('<USERNAME>', process.env.DB_USER)
  .replace('<PASSWORD>', process.env.DB_PASSWORD)
  .replace('<DBNAME>', process.env.DB_NAME);

const main = async () => {
  try {
    const conn = await mongoose.connect(dbString);
    // console.log(conn.connections);
    console.log('DB Connection success');
  } catch (err) {
    console.log(`connection error (${err.message})`);
  }
};
main();

const toursjson = fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8');
const tours = JSON.parse(toursjson);
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('data loadeded');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('delete');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};
// deleteData();
// importData();

switch (process.argv[2]) {
  case '--import':
    importData();
    break;

  case '--delete':
    deleteData();
    break;

  default:
    console.log('use --import or --delete');
    process.exit();
}
