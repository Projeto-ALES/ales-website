const mongoose = require("mongoose");

const LessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
  },
  subject: {
    type: mongoose.Types.ObjectId,
    ref: 'Subject',
  },
  professors: [{ type: mongoose.Types.ObjectId, ref:'User'}],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Lesson = mongoose.model("Lesson", LessonSchema);

module.exports = Lesson;
