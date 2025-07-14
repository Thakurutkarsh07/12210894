
const express = require("express");
const connectDB = require("./utils/db");
const shortRoutes = require("./routes/short");
const redirectRoutes = require("./routes/redirect");

const app = express();
app.use(express.json());

app.use("/shorturls", shortRoutes);
app.use("/", redirectRoutes);

connectDB();

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
