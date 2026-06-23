const mongoose = require("mongoose");

module.exports = {
  multipleMongooseToObject: function (mongooses) {
    return mongooses.map((item) => item.toObject());
  },
  mongooseToObject: function (mongoose) {
    return mongoose ? mongoose.toObject() : mongoose;
  },
};
