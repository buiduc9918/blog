const path = require("path");
const express = require("express");
const methodOverride = require('method-override');
const morgan = require("morgan");
const handlebars = require("express-handlebars");
const app = express();
const port = 3000;
const route = require("./routes/index");
const db = require("./config/db");
const SortMiddleware = require('./app/middlewares/sortMiddleware');

// Connect to DB
db.connect();

app.use(express.static(path.join(__dirname, "public")));



// Middleware parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ 
  extended: true 
}));
app.use(methodOverride('_method'));
// custumn midleware
app.use(SortMiddleware);

app.use(morgan("combined"));
app.engine(".hbs", handlebars.engine({ 
  extname: ".hbs",
  helpers:{
    sum(a,b){return a+b},
    sortable(field,sort){
      const sortType= field === sort.column ? sort.type : 'default';
      const icons = {
        default: "oi oi-elevator",
        asc:"oi oi-sort-ascending",
        desc:"oi oi-sort-descending",
      };

      const types = {
        default: 'desc',
        asc:'desc',
        desc:'asc'
      };
      const icon = icons[sortType];
      const type = types[sortType];


        return `<a href="?_sort&column=${field}&type=${type}">
                               <span class="${icon}"></span>
                            </a>`;
    }
  }
}));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resource/views"));
console.log("path: ", path.join(__dirname, "resource", "views"));
// Route init
route(app);

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});
