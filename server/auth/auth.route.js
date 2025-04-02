const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const speakeasy = require("speakeasy");
const User = require("./auth.schema");
const TempUser = require("./temp.schema");
const router = express.Router();
require("dotenv").config();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
  service: "gmail", // or any other provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const generateOTP = () => {
  const secret = speakeasy.generateSecret({ length: 20 });
  const otp = speakeasy.totp({
    secret: secret.base32,
    encoding: "base32",
    digits: 6,
    step: 300, // 5 minutes
  });
  return { otp, secret: secret.base32 };
};

const sendOTP = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your Authentication Code",
    html: `
      <h2>Two-Factor Authentication</h2>
      <p>Your verification code is: <strong>${otp}</strong></p>
      <p>This code will expire in 5 minutes.</p>
    `,
  };

  return transporter.sendMail(mailOptions);
};

router.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, phone, password } = req.body;

    let existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(400)
        .json({ message: "User already exists! please login" });

    let pendingUser = await TempUser.findOne({ email });
    if (pendingUser) {
      return res.status(400).json({
        message:
          "Registration already in progress. Please verify your email or request a new OTP.",
        registrationId: pendingUser.registrationId,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { otp, secret } = generateOTP();
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    const registrationId = require("crypto").randomBytes(16).toString("hex");

    const tempUser = new TempUser({
      registrationId,
      name,
      email,
      phone,
      password: hashedPassword,
      otpSecret: secret,
      otpExpires,
      createdAt: new Date(),
    });

    await tempUser.save();

    await sendOTP(email, otp);

    res.status(201).json({
      message:
        "Verification code sent to your email. Please verify to complete registration.",
      registrationId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const { otp, secret } = generateOTP();
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000);

    user.otpSecret = secret;
    user.otpExpires = otpExpires;
    user.isVerified = false;
    await user.save();

    await sendOTP(email, otp);

    res.status(200).json({
      message: "Please verify with the code sent to your email",
      registrationId: user._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// router.post("/verify-otp", async (req, res) => {
//   try {
//     const { registrationId, otp } = req.body;

//     console.log(registrationId, "registrationId");
//     console.log(otp, "otp");

//     const tempUser = await TempUser.findOne({ registrationId });

//     console.log(tempUser);

//     if (!tempUser) {
//       return res.status(400).json({
//         message: "Registration not found or expired. Please register again.",
//       });
//     }

//     if (tempUser.otpExpires < new Date()) {
//       await TempUser.findByIdAndDelete(tempUser._id);
//       return res
//         .status(400)
//         .json({ message: "Verification code expired. Please register again." });
//     }

//     // Verify OTP
//     const isValid = speakeasy.totp.verify({
//       secret: tempUser.otpSecret,
//       encoding: "base32",
//       token: otp,
//       digits: 6,
//       step: 300,
//       window: 1,
//     });

//     if (!isValid) {
//       return res.status(400).json({ message: "Invalid verification code" });
//     }

//     const user = new User({
//       name: tempUser.name,
//       email: tempUser.email,
//       phone: tempUser.phone,
//       password: tempUser.password,
//       isVerified: true,
//     });
//     await user.save();

//     await TempUser.findByIdAndDelete(tempUser._id);

//     const jwtSecret = process.env.JWT_SECRET;
//     if (!jwtSecret) {
//       console.error("JWT_SECRET is not defined in environment variables");
//       return res.status(500).json({ message: "Server configuration error" });
//     }

//     const token = jwt.sign({ id: user._id, role: user.role }, jwtSecret, {
//       expiresIn: "1d",
//     });

//     res.json({
//       message: "Registration completed successfully",
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// router.post("/verify-login", async (req, res) => {
//   try {
//     const { userId, otp } = req.body;
//     const user = await User.findById(userId);

//     if (!user) return res.status(400).json({ message: "User not found" });

//     // Check if OTP is expired
//     if (user.otpExpires < new Date()) {
//       return res
//         .status(400)
//         .json({ message: "Verification code expired. Please login again." });
//     }

//     // Verify OTP
//     const isValid = speakeasy.totp.verify({
//       secret: user.otpSecret,
//       encoding: "base32",
//       token: otp,
//       digits: 6,
//       step: 300, // 5 minutes
//       window: 1, // Allow 1 step before and after current step
//     });

//     if (!isValid) {
//       return res.status(400).json({ message: "Invalid verification code" });
//     }

//     // Mark user as verified for this session
//     user.isVerified = true;
//     await user.save();

//     // Generate JWT token for authenticated session
//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.json({
//       message: "Login successful",
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// router.post("/resend-otp", async (req, res) => {
//   try {
//     // Check if it's for registration or login
//     const { registrationId, userId } = req.body;

//     if (registrationId) {
//       // Resend for registration
//       const tempUser = await TempUser.findOne({ registrationId });
//       if (!tempUser) {
//         return res.status(400).json({
//           message: "Registration not found or expired. Please register again.",
//         });
//       }

//       // Generate new OTP
//       const { otp, secret } = generateOTP();
//       const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

//       // Update the temp user
//       tempUser.otpSecret = secret;
//       tempUser.otpExpires = otpExpires;
//       await tempUser.save();

//       // Send OTP to user's email
//       await sendOTP(tempUser.email, otp);

//       res.status(200).json({
//         message: "New verification code sent to your email",
//         registrationId,
//       });
//     } else if (userId) {
//       // Resend for login
//       const user = await User.findById(userId);
//       if (!user) return res.status(400).json({ message: "User not found" });

//       // Generate new OTP
//       const { otp, secret } = generateOTP();
//       const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

//       // Update user with new OTP data
//       user.otpSecret = secret;
//       user.otpExpires = otpExpires;
//       await user.save();

//       // Send OTP to user's email
//       await sendOTP(user.email, otp);

//       res.status(200).json({
//         message: "New verification code sent to your email",
//         userId: user._id,
//       });
//     } else {
//       return res
//         .status(400)
//         .json({ message: "Missing registration ID or user ID" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

router.post("/verify-otp", async (req, res) => {
  try {
    const { registrationId, userId, otp } = req.body;

    let user;
    let isTempUser = false;

    if (registrationId) {
      user = await TempUser.findOne({ registrationId });
      isTempUser = true;
    } else if (userId) {
      user = await User.findById(userId);
    }

    if (!user) {
      return res.status(400).json({
        message: "User not found or expired. Please try again.",
      });
    }

    if (user.otpExpires < new Date()) {
      if (isTempUser) await TempUser.findByIdAndDelete(user._id);
      return res.status(400).json({
        message: "Verification code expired. Please request a new one.",
      });
    }

    // Verify OTP
    const isValid = speakeasy.totp.verify({
      secret: user.otpSecret,
      encoding: "base32",
      token: otp,
      digits: 6,
      step: 300,
      window: 1,
    });

    if (!isValid) {
      return res.status(400).json({ message: "Invalid verification code" });
    }

    if (isTempUser) {
      const newUser = new User({
        name: user.name,
        email: user.email,
        phone: user.phone,
        password: user.password,
        isVerified: true,
      });
      await newUser.save();
      await TempUser.findByIdAndDelete(user._id);
      user = newUser;
    } else {
      user.isVerified = true;
      await user.save();
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({
      message: "Verification successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/resend-otp", async (req, res) => {
  try {
    const { registrationId, userId } = req.body;

    let user;
    let isTempUser = false;

    if (registrationId) {
      user = await TempUser.findOne({ registrationId });
      isTempUser = true;
    } else if (userId) {
      user = await User.findById(userId);
    }

    if (!user) {
      return res.status(400).json({
        message: "User not found or expired. Please try again.",
      });
    }

    const { otp: newOtp, secret } = generateOTP();
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000);

    user.otpSecret = secret;
    user.otpExpires = otpExpires;
    await user.save();

    await sendOTP(user.email, newOtp);

    return res.status(200).json({
      message: "New verification code sent to your email",
      id: isTempUser ? registrationId : userId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/user", async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id).select(
      "-password -otpSecret -otpExpires"
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.patch("/user", async (req, res) => {
  try {
    const { id } = req.user;
    const updates = req.body;
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }
    const user = await User.findByIdAndUpdate(id, updates, {
      new: true,
    }).select("-password -otpSecret -otpExpires");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/logout", (req, res) => {
  res.json({ message: "Logout successful" });
});

router.get("/cleanup-temp-users", async (req, res) => {
  try {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const result = await TempUser.deleteMany({
      createdAt: { $lt: oneHourAgo },
    });
    res.json({
      message: `Cleaned up ${result.deletedCount} expired temporary users`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token)
    return res
      .status(401)
      .json({ message: "Access Denied. No token provided." });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Attach user ID to request
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token." });
  }
};

router.get("/get-login-user", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found." });

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
