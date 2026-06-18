const path = require('path');
const express = require('express');
const morgan = require('morgan');

const handlebars = require('express-handlebars');


const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

// Middleware parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(morgan('combined'));

app.engine('.hbs', handlebars.engine({extname: '.hbs'}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resource/views'));
console.log('path: ', path.join(__dirname, 'resource/views'));


app.get('/', (req, res) => {
  res.render('home');
});

app.get('/news', (req, res) => {
  res.render('news');
});

app.get('/search', (req, res) => {
  console.log(req.query.q);
  res.render('search');
});

app.post('/search', (req, res) => {


  console.log(req.body);


  res.send('');
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

