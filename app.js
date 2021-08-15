const express = require('express');
const mongoose = require('mongoose');
// const data = require('./info.json');

mongoose
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
  description: {
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
app.post('/:id', (req, res) => {
  console.log('post:id');

  res.setHeader('Access-Control-Allow-Origin', '*');
  console.log(req.body.data);
  Element.findOneAndRemove({
    _id: req.body.data,
  }).then(console.log);

  res.status(201).send(`delete: ${req.body.data}`);
});
// Element.where({ _id: id }).update({ title: 'words' })

app.post('/', (req, res) => {
  console.log('post');

  res.setHeader('Access-Control-Allow-Origin', '*');

  const { body } = req;
  // console.log('req2', body.data);
  const newElements = req.body.data.forEach(element => {
    if (element['_id']) {
      // console.log('element with id', element);
      Element.where({ _id: element['_id'] }).update({
        path: element.path,
        description: element.description,
      });
    } else {
      // console.log('element', element.description);
      Element.create({
        path: `${element.path}`,
        description: `${element.description}`,
      }).catch(e => console.log(e));
    }
  });

  data.elements = newElements;

  res.status(201).json(req.body);
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
