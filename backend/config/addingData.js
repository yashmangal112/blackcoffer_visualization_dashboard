const fs = require("fs");
const DataModel = require("../models/DataModel");

async function insertData() {
  try {
    const jsonData = fs.readFileSync("./jsondata.json", "utf8");
    const data = JSON.parse(jsonData);

    for (let item of data) {
      if (
        item.intensity !== "" &&
        item.likelihood !== "" &&
        item.relevance !== "" &&
        item.end_year !== "" &&
        item.start_year !== "" &&
        item.country !== "" &&
        item.topic !== "" &&
        item.region !== ""
      ) {
        await DataModel.create(item);
      }
    }
    console.log("Data has been inserted successfully!");
  } catch (err) {
    console.error("An error occurred:", err);
  }
}

module.exports = insertData;
