const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const verifyEmail = async (token, email) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailConfigurations = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "Email Verification",
    html: `
      <h1>Verify Your Email Address</h1>
      <p>Hello,</p>
      <p>Thank you for registering on <b>The News</b>. To complete your signup process and activate your account, please verify your email by clicking the button below.</p>
      <p style="text-align: center;">
        <a href="${process.env.FRONTEND_URL}/verify/${token}"
           target="_blank"
           style="display: inline-block; padding: 12px 24px; background-color: #00a63d; 
                  color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
          Verify Your Email
        </a>
      </p>
      <p>If you did not initiate this request, you can safely ignore this email.</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailConfigurations);
    console.log("Email sent successfully:", info.messageId);
    return true;
  } catch (error) {
    console.error("Email sending failed:", error);
    return false;
  }
};

module.exports = verifyEmail;
