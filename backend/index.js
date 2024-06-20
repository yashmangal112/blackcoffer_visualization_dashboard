const express = require("express");
const app = express();

const connectDB = require("./config/db");
const cors = require("cors");
const insertData = require("./config/addingData");
const dataRoute = require("./routes/dataRoute");

connectDB().then(() => {
  insertData();
});

app.use(cors());

app.use("/data", dataRoute);

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
