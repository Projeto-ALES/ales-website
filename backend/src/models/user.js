const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  passwordToken: {
    type: String,
    select: false,
  },
  passwordTokenExp: {
    type: Date,
    select: false,
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  return next();
});

UserSchema.pre("findOneAndUpdate", async function (next) {
  let password = this.getUpdate().$set.password;
  if (!password) {
    return next();
  }
  this.getUpdate().$set.password = await bcrypt.hash(password, 10);
  return next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
