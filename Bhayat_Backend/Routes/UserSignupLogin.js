import express from 'express';
import { loginUser, registerUser } from '../Controllers/UserSignUpLogin.js';
import UserSignupAuth from '../middlewares/Auth.js';
import User from '../Models/UserSignup.js';
import Volunteer from '../Models/Volunteer.js';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables
const url = process.env.VITE_BACKEND_HOST_URL;

const userRouter = express.Router();

// Helper function for email transport
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Existing authentication routes
userRouter.post('/login', loginUser);
userRouter.post('/register', registerUser);

// Password Reset Routes
userRouter.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    
    // Validate email format
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'If this email exists, a reset link has been sent'
      });
    }

    // Generate and save reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour expiration
    await user.save();

     // 👇 Add this console log for testing 
    //  console.log(`RESET TOKEN for ${email}: ${resetToken}`);


    // Create reset link with fallback URL
    const frontendUrl = url || 'http://localhost:1000';
    const resetUrl = `${frontendUrl}/reset-password?token=${resetToken}`;

    // Send email
    const transporter = createTransporter();
    await transporter.sendMail({
      to: user.email,
      from: `"Bhayat Foundation Reset Password Request" <${process.env.EMAIL_USER}>`,
      subject: 'Password Reset Request',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Password Reset Request</h2>
          <p>You requested to reset your password. Click the button below to proceed:</p>
          <a href="${resetUrl}" 
             style="display: inline-block; padding: 10px 20px; background-color: #2563eb; 
                    color: white; text-decoration: none; border-radius: 5px; margin: 15px 0;">
            Reset Password
          </a>
          <p>Or copy this link to your browser:</p>
          <p style="word-break: break-all;">${resetUrl}</p>
          <p><em>This link will expire in 1 hour.</em></p>
          <p>If you didn't request this, please ignore this email.</p>
        </div>
      `
    });

    res.status(200).json({
      success: true,
      message: 'Password reset email sent'
    });

  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing request',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

userRouter.post('/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Validate password strength
    if (!newPassword || newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters'
      });
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token'
      });
    }

    // Update password and clear token
    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password has been successfully updated'
    });

  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({
      success: false,
      message: 'Error resetting password',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Profile route
userRouter.get('/profile', UserSignupAuth, async (req, res) => {
  try {
    const user = await User.findById(req.body.userID).select('-password');
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: "User not found" 
      });
    }

    const volunteer = await Volunteer.findOne({ email: user.email }).select('-password');
    res.status(200).json({
      success: true,
      user,
      volunteer: volunteer || null
    });

  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({
      success: false,
      message: "Error fetching user profile",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

export default userRouter;