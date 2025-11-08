// services/emailService.js
import nodemailer from "nodemailer";
import { EMAIL_USER, EMAIL_PASS } from "../config/env.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

/**
 * Send email
 * @param {string} to
 * @param {string} subject
 * @param {string} html
 */
export const sendEmail = async (to, subject, html) => {
  const mailOptions = {
    from: EMAIL_USER,
    to,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${to}`);
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    throw new Error("Failed to send email");
  }
};
