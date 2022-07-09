// server.js for ENV and server and database configuration and error handling
require('dotenv').config();
const app = require('./app');
// creating server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`server running at http://127.0.0.1:${port}`);
});

// console.log(app.get('env')); // development
// console.log(process.env);
