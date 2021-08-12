const express = require('express');
const mongoose = require('mongoose');
// const data = require('./info.json');

const db = mongoose
  .connect(
    'mongodb+srv://admin:admin@cluster0.xaqqp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    { useNewUrlParser: true },
  )
  .then(() => console.log('MangoDB connect success'))
  .catch(e => console.log(e.message));

const ElementSchema = new mongoose.Schema({
  path: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const Element = mongoose.model('Element', ElementSchema);
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
  // console.log(req.headers);
  // console.log(req.url);
  Element.find()
    .then(elements => res.send(elements))
    .catch(e => res.send(e));
});

app.post('/', (req, res) => {
  console.log('post');

  res.setHeader('Access-Control-Allow-Origin', '*');

  mongoose.connection.collections['elements'].remove({}, function (err) {
    console.log('collection dropped');
  });
  console.log(db);
  const { body } = req;
  // console.log('req1', data);
  // console.log('req2', body);
  const newElements = req.body.data.forEach(element => {
    // console.log('element', element);
    Element.create({
      path: `${element.path}`,
      title: `${element.title}`,
    }).catch(e => console.log(e));
  });
  // Element.create({
  //   pathEL: 'ivan',
  //   title: 'not stupid',
  // })
  //   .then(console.log)
  //   .catch(e => console.log(e));
  data.elements = newElements;

  res.status(201).json(req.body);
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
