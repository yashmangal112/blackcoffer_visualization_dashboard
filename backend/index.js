const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");

const connectDB = require("./config/db");
const cors = require("cors");
const insertData = require("./config/addingData");
const dataRoute = require("./routes/dataRoute");

connectDB().then(() => {
  insertData();
});

app.use(cors());

app.get('/', (req, res) => {
  res.send('Yay!! Backend is running for Blackcoffer Assignment');
});

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/data", dataRoute);

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 4000");
});


module.exports = app;