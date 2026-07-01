const handlebars = require('handlebars');

module.exports = {
    sum(a,b){return a+b},
    sortable(field,sort){
      const sortType = field === sort.column ? sort.type : "default";
      const icons = {
        default: "oi oi-elevator",
        asc: "oi oi-sort-ascending",
        desc: "oi oi-sort-descending",
      };

      const types = {
        default: "desc",
        asc: "desc",
        desc: "asc",
      };
      const icon = icons[sortType];
      const type = types[sortType];
      const template =
        handlebars.compile(`<a href="?_sort&column={{field}}&type={{type}}">
                                         <span class="{{icon}}"></span>
                                       </a>`);

      // Trả về kết quả sau khi truyền dữ liệu vào template
      return template({
        field: encodeURIComponent(field),
        type: encodeURIComponent(type),
        icon: icon,
      });
    }
  }