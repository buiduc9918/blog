module.exports = function sortMiddleware(req,res,next){
    res.locals._sort = {
        enable: false,
        type:'default'
      //  column : req.query.name

    };

    if(req.query.hasOwnProperty('_sort')){
        // res.locals._sort.enable = true;
        // res.locals._sort.type = req.query.type;
        // res.locals._sort.column = req.query.name;

        Object.assign( res.locals._sort,{
        enable : true,
        column : req.query.column,
        type : req.query.type,
        });
    }

    next();
}