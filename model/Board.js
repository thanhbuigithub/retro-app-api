const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  items: { type: Object, required: false },
});

module.exports = mongoose.model("Board", boardSchema);
