const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const transmission = new Schema({
  channelId: String,
  sponsor: String,
  state: String,
  city: String,
  videoId: String
});

module.exports = mongoose.model("Transmission", transmission);
