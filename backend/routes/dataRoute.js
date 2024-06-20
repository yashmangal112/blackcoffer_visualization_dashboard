const { Router } = require("express");
const router = Router();

const DataModel = require("../models/DataModel");

router.get("/", async (req, res) => {
  const data = await DataModel.find();
  if (!data) {
    return res.status(400).json({
      message: "Data not found",
    });
  }

  res.status(200).json(data);
});

module.exports = router;
