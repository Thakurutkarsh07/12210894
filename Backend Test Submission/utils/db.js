
const mongoose = require("mongoose");

module.exports = () => {
  mongoose.connect("mongodb+srv://utkarshthakur0110:thakur@cluster0.4k4ywhw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => console.log("Database connected"));
};
