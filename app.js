const express = require('express');
// const data = require('./info.json');

let data = {
  elements: [],
};

const bodyParser = require('body-parser');
const PORT = process.env.PORT || 4444;

const app = express();
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Request-with, Content-type, Accept',
  );
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  // console.log('get elements');
  // req.header('Access-Control-Allow-Origin');
  res.setHeader('Access-Control-Allow-Origin', '*');
  console.log(req.headers);
  console.log(req.url);
  res.json({
    status: 200,
    data,
  });
});

app.post('/', (req, res) => {
  console.log('post');

  res.setHeader('Access-Control-Allow-Origin', '*');
  // const { data } = req;
  const { body } = req;
  console.log('req1', data);
  console.log('req2', body);
  const newElements = req.body.data;
  data.elements = newElements;
  res.status(201).json(req.body);
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
