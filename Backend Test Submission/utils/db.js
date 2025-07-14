
const mongoose = require("mongoose");

module.exports = () => {
  mongoose.connect("mongodb://localhost:27017/urlshortener", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => console.log("Database connected"));
};
