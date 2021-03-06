// server.js for ENV and server and database configuration and error handling
const mongoose = require('mongoose');
require('dotenv').config();
const app = require('./app');

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

// const testTour = new Tour({
//   name: 'The Forest hiker 3',
//   price: 549,
// });

// testTour
//   .save()
//   .then((doc) => console.log(doc))
//   .catch((err) => console.log('Error ', err.message));

// creating server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`server running at http://127.0.0.1:${port}`);
});

// console.log(app.get('env')); // development
// console.log(process.env);
