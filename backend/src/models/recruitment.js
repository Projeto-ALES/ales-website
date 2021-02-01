const mongoose = require("mongoose");

const { recruitmentStatus } = require("../helpers/status");
const { ACTIVE, DONE } = recruitmentStatus;

const RecruitmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  beginningDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: [ACTIVE, DONE],
    default: ACTIVE,
  },
  interviews: [{ type: mongoose.Types.ObjectId, ref: 'Interview' }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Recruitment = mongoose.model("Recruitment", RecruitmentSchema);

module.exports = Recruitment;