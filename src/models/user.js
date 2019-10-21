const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const user = new Schema({
  login: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  roles: [
    {
      type: String,
      required: true,
      enum: ["user", "admin"],
      default: "user"
    }
  ]
});

module.exports = mongoose.model("User", user);
