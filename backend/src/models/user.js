const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  roles: {
    type: Array,
    default: ["user"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  passwordToken: {
    type: String,
    select: false,
    default: null,
  },
  passwordTokenExp: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
