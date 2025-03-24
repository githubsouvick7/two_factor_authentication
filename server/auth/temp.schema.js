const mongoose = require("mongoose");

const tempUserSchema = new mongoose.Schema(
  {
    registrationId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    otpSecret: {
      type: String,
      required: true,
    },
    otpExpires: {
      type: Date,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 3600, // Documents will be automatically deleted after 1 hour
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TempUser", tempUserSchema);
