const mongoose = require("mongoose");

const User = require("./user");

const Professor = User.discriminator(
  "Professor",
  new mongoose.Schema({
    phone: {
      type: String,
      required: true,
    },
    birthday: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ["M", "F", "N"],
    },
    area: {
      type: String,
    },
  })
);

module.exports = Professor;
