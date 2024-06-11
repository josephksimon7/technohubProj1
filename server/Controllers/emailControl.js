const emailSchema = require("../models/emailVerify");
const user = require("../models/userModel");
const nodemailer = require("nodemailer");
require("dotenv").config();

//create Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendEmail = async (req, res) => {
  const otp = Math.floor(Math.random() * 900000) + 100000;
  try {
    const { email } = req.body;
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Email Verification",
      text: `Your verification OTP is ${otp}`,
      html: `
      <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
          <div style="background-color: #007BFF; color: #ffffff; padding: 10px; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="margin: 0;">OTP Verification</h1>
          </div>
          <div style="padding: 20px; line-height: 1.6;">
            <p>Dear User,</p>
            <p>Your One-Time Password (OTP) for verifying your email address is:</p>
            <h2 style="background-color: #f4f4f4; padding: 10px; border-radius: 5px; text-align: center;">${otp}</h2>
            <p>Please enter this OTP to complete your email verification. This OTP is valid for <b>5 MINUTES</b>.</p>
            <p>Best regards,<br/>D watch.com Team</p>
          </div>
        </div>
      </div>
      `,
    };
    // const salt = await bcrypt.genSalt(10);
    // const hashedOtp = await bcrypt.hash(otp.toString(), salt);

    const newVerification = await new emailSchema({
      // userId: _id,
      email,
      otp,
      createdAt: Date.now(),
      expiresAt: Date.now() + 300000, // Set expiration time 5 minutes from now
    });

    await newVerification.save();

    await transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        res.status(403).json(err);
      } else {
        res.status(200).json({ OTP: otp });
      }
    });
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).json("Error sending email");
  }
};

// verify otp
exports.verifyOtp = async (req, res) => {
  try {
    const { otp, email } = req.body;
    const existingUser = await emailSchema.findOne({ email, otp });

    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    if (existingUser.expiresAt < Date.now()) {
      return res.status(410).json({ error: "OTP expired" });
    }

    // Uncomment if you need to compare hashed OTPs
    // const validOtp = await bcrypt.compare(otp, existingUser.otp);
    // if (!validOtp) {
    //   return res.status(400).json({ error: "Incorrect OTP" });
    // }

    const userd = await user.findOne({ email });
    if (!userd) {
      return res.status(404).json({ error: "User not found" });
    }

    userd.emailVerify = true;
    const updatedUser = await userd.save();

    return res.status(200).json({
      message: "Email verified successfully",
      user: updatedUser,
      otpVerified: true,
    });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = exports;
