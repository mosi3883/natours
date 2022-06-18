const express = require('express');

const app = express();
// Routing
app.get('/', (req, res) => {
  // res.send('Hello from the server side'); // simple sending text respond
  // res.status(200).send('Hello from the server side'); // sending text with status code
  res.status(200).json({ message: 'hello from the server', app: 'Natours' }); // sending json
});

app.post('/', (req, res) => {
  res.status(200).send('you can post to this end point');
});

// creating server
const port = 8000;
app.listen(port, () => {
  console.log(`server running at http://127.0.0.1:${port}`);
});
