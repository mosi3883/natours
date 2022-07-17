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
    console.log(conn.connections);
  } catch (err) {
    console.log(`connection error (${err.message})`);
  }
};
main();

// creating schema
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name!'],
    unique: true,
  },
  // rating: Number,
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

// creating model

const Tour = mongoose.model('Tour', tourSchema);

// creating server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`server running at http://127.0.0.1:${port}`);
});

// console.log(app.get('env')); // development
// console.log(process.env);
