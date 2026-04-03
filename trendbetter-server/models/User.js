const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  username: { 
    type: String, 
    unique: true, 
    sparse: true
  },
  fullName: { 
    type: String 
  },
  bio: { 
    type: String, 
    maxLength: 150 
  },
  gender: { 
    type: String, 
    enum: ['Male', 'Female', 'Prefer not to say', 'Custom'],
    default: 'Prefer not to say'
  },
  avatarUrl: { 
    type: String 
  },
  dateJoined: { 
    type: Date, 
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);