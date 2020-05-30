const mongoose = require("../mongo");

const TeacherSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  subjects: {
    type: [mongoose.Schema.Types.ObjectId]
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Teacher = mongoose.model("Teacher", TeacherSchema);

module.exports = Teacher;
