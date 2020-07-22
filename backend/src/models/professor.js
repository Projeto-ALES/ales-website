const mongoose = require("mongoose");

const User = require("./user");

const Professor = User.discriminator(
  "Professor",
  new mongoose.Schema({
    status: {
      type: String,
      enum: ["active", "inactive", "invited"],
      default: "inactive",
    },
    phone: {
      type: String,
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
    inviteToken: {
      type: String,
      select: false,
    },
    inviteTokenExp: {
      type: Date,
      select: false,
    },
  })
);

module.exports = Professor;
