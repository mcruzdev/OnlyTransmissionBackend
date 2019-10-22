const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const Transmission = mongoose.model("Transmission");

router.post("/", async (req, res) => {
  // TODO: executar validações
  try {
    const transmission = await Transmission.create(req.body);
    res.status(201).send({
      success: transmission
    });
  } catch (err) {
    res.status(500).send({
      error: "Server error"
    });
  }
});

router.get("/", async (req, res) => {
  const all = await Transmission.find({});
  res.status(200).send({
    success: all
  });
});

module.exports = router;
