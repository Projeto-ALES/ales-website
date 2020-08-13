const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  coordinators: { type: mongoose.Types.ObjectId, ref:'User'},
  professors: [{ type: mongoose.Types.ObjectId, ref:'User'}],
  beginningDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
});

const Subject = mongoose.model("Subjects", SubjectSchema);

module.exports = Subject;
