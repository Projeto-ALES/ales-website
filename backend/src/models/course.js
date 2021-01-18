const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  coordinator: { type: mongoose.Types.ObjectId, ref: 'User' },
  professors: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  beginningDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  lessons: [{ type: mongoose.Types.ObjectId, ref: 'Lesson' }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;
