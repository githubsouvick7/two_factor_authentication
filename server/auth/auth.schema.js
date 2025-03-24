const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, sparse: true },
  password: { type: String },
  termsncondition: { type: Boolean },
  phone: { type: String, unique: true, sparse: true },
  otpSecret: { type: String },
  otpExpires: { type: Date },
  isVerified: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Number, default: () => Date.now() },
  updatedAt: { type: Number, default: () => Date.now() },
});

module.exports = mongoose.model("User", UserSchema);
