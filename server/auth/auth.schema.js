const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  email: { type: String, unique: true, sparse: true },
  password: { type: String },
  phone: { type: String, unique: true, sparse: true },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Number, default: () => Date.now() },
  updatedAt: { type: Number, default: () => Date.now() },
});

module.exports = mongoose.model("User", UserSchema);
