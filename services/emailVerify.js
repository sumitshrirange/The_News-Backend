const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const verifyEmail = async (token, email) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailConfigurations = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "Email Verification",
    html: `<h1>Verify Your Email Address</h1> <br> <p>Hello,</p> <br> <p>Thank you for registering on our <b>The News</b>. To complete your signup process and activate your account, please verify your email address by clicking the button below.</p> <br> <p style="text-align: center; color: #fff;"> <a href="${process.env.FRONTEND_URL}/verify/${token}" target="_blank" style="display: inline-block; padding: 12px 24px; background-color: #00a63d; color: #fff !important; text-decoration: none; border-radius: 5px; font-weight: bold;">Verify Your Email</a></p> <br> <p>If you did not initiate this request, you can safely ignore this email.`,
  };

  transporter.sendMail(mailConfigurations, function (error, info) {
    if (error) {
      throw new Error(error);
    }
    console.log("Email sent successfully");
    console.log(info);
  });
};

module.exports = verifyEmail;
