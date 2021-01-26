const mongoose = require('mongoose');

const { interviewStatus } = require("../helpers/status");
const { NOT_SCHEDULED, PENDING, SCHEDULED } = interviewStatus;

const InterviewSchema = new mongoose.Schema({
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: [NOT_SCHEDULED, PENDING, SCHEDULED],
    default: NOT_SCHEDULED,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Interview = mongoose.model('Interview', InterviewSchema);

module.exports = Interview;
