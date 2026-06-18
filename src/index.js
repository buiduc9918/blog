const path = require('path');
const express = require('express');
const morgan = require('morgan');

const handlebars = require('express-handlebars');


const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(morgan('combined'));

app.engine('.hbs', handlebars.engine({extname: '.hbs'}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resource/views'));
console.log('path: ', path.join(__dirname, 'resource/views'));


app.get('/', (req, res) => {
  res.render('home');
});

app.get('/news', (req, res) => {
  console.log('query: ', req.query.q);

  res.render('news');
});

app.get('/search', (req, res) => {
  console.log('query: ', req.query.q);
  res.render('search');
});


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

