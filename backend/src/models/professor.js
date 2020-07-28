const mongoose = require("mongoose");

const User = require("./user");
const { professorStatus, gender } = require("../helpers/status");
const { INACTIVE, INVITED, ACTIVE } = professorStatus;
const { M, F, N } = gender;

const Professor = User.discriminator(
  "Professor",
  new mongoose.Schema({
    status: {
      type: String,
      enum: [INACTIVE, INVITED, ACTIVE],
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
      enum: [M, F, N],
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
