const mongoose = require("../mongo");

const SubjectSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
  },
  materials: {
    type: []
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Subject = mongoose.model("SubjectSchema", SubjectSchema);

module.exports = Subject;
