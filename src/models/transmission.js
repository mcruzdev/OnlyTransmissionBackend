const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const transmission = new Schema({
  channelId: {
    type: String,
    required: true
  },
  sponsor: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  videoId: {
    type: String
  },
  status: {
    type: String,
    enum: ["ON", "OFF"]
  },
  channelName: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Transmission", transmission);
