const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  qty: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  items: {
    type : [itemSchema],
    default : []
  }
});

module.exports.User = mongoose.model("User", userSchema);
module.exports.Item = mongoose.model("Item", itemSchema);
