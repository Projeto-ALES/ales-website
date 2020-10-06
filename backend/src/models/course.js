const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
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
  coordinator: { type: mongoose.Types.ObjectId, ref: 'User' },
  professors: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  beginningDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
});

const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;
