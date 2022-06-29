const fs = require('fs');

const express = require('express');

const app = express();

app.use(express.json());
// Routing
// app.get('/', (req, res) => {
//   // res.send('Hello from the server side'); // simple sending text respond
//   // res.status(200).send('Hello from the server side'); // sending text with status code
//   res.status(200).json({ message: 'hello from the server', app: 'Natours' }); // sending json
// });

// app.post('/', (req, res) => {
//   res.status(200).send('you can post to this end point');
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8')
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    'utf-8',
    (err) => {
      if (err) {
      }
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
});

app.get('/api/v1/tours/:tourId', (req, res) => {
  const { tourId } = req.params;
  const tour = tours.find((tour) => tour.id === +tourId);
  if (!tour) {
    res.status(404).json({
      status: 'fail',
      message: 'tour not found!',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

// creating server
const port = 8000;
app.listen(port, () => {
  console.log(`server running at http://127.0.0.1:${port}`);
});
