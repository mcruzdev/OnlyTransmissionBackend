const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(
  bodyParser.json({
    limit: "10mb"
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const User = require("../models/user");
const Transmission = require("../models/transmission");

const authRoute = require("../routes/auth");
const transmissionRoute = require("../routes/transmission");

app.use("/auth", authRoute);
app.use("/transmissions", transmissionRoute);

mongoose.connect("mongodb://localhost:27018/onlytransmission", {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = app;
