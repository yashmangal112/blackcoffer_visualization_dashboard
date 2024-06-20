const express = require("express");
const app = express();
require("dotenv").config();

const connectDB = require("./config/db");
const cors = require("cors");
const insertData = require("./config/addingData");
const dataRoute = require("./routes/dataRoute");

connectDB().then(() => {
  insertData();
});

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.use("/data", dataRoute);

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 4000");
});


module.exports = app;