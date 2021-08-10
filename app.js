const express = require('express');
const data = require('./info.json');

const bodyParser = require('body-parser');
const PORT = process.env.PORT || 4444;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  // console.log('get elements');
  console.log(req.url);
  res.json({
    status: 200,
    data,
  });
});

app.post('/', (req, res) => {
  console.log('post');
  console.log('req', req.body);
  const elements = req.body;
  data.elements = elements;
  res.status(201).json(req.body);
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
