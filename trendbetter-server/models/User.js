const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  username: {
    type: String,
    unique: true,
    sparse: true,
    trim: true,
  },
  fullName: {
    type: String,
    trim: true,
  },
  bio: {
    type: String,
    maxLength: 150,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Prefer not to say", "Custom"],
    default: "Prefer not to say",
  },
  avatarUrl: {
    type: String,
  },
}, { timestamps: true });  // replaces dateJoined, also adds updatedAt

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Strip password from any JSON response automatically
userSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  },
});

// Instance method for password comparison
userSchema.methods.matchPassword = function (entered) {
  return bcrypt.compare(entered, this.password);
};

module.exports = mongoose.model("User", userSchema);