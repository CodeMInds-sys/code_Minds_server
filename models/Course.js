const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  lectures: [{
    title: String,
    youtubeUrl: String,
    assignment: {
      description: String,
      dueDate: Date,
      driveLink: String
    }
  }],
  schedule: [{
    date: Date,
    startTime: String,
    endTime: String,
    maxStudents: Number,
    enrolledStudents: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
  }],
  enrolledStudents: [{
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    enrollmentDate: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Course', courseSchema);