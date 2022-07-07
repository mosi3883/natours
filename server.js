// server.js for ENV and server and database configuration and error handling
const app = require('./app');
// creating server
const port = 8000;
app.listen(port, () => {
  console.log(`server running at http://127.0.0.1:${port}`);
});
