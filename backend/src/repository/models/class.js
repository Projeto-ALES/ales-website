const mongoose = require("../mongo");

const ClassSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Class = mongoose.model("ClassSchema", ClassSchema);

module.exports = Class;
