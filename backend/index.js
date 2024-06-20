const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");

const connectDB = require("./config/db");
const cors = require("cors");
const insertData = require("./config/addingData");
const dataRoute = require("./routes/dataRoute");

connectDB()
  .then(() => {
    console.log("Database connected successfully");
    insertData()
      .then(() => {
        console.log("Data inserted successfully");
      })
      .catch((err) => {
        console.error("Error inserting data:", err);
      });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

app.use(cors());

app.get('/', (req, res) => {
  console.log("Root route accessed");
  res.send('Yay!! Backend is running for Blackcoffer Assignment');
});

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/data", dataRoute);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
