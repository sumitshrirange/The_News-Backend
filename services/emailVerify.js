const axios = require("axios");
require("dotenv").config();

const verifyEmail = async (token, email) => {
  try {
    const data = {
      from: {
        email: process.env.MAIL_USER,
        name: "The News",
      },
      to: [
        {
          email,
        },
      ],
      subject: "Email Verification",
      html:  `
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

    const response = await axios.post(
      "https://api.mailersend.com/v1/email",
      data,
      {
        headers: {
          "Authorization": `Bearer ${process.env.MAILERSEND_API_KEY}`,
          "Content-Type": "application/json",
        }
      }
    );

    console.log("Mailersend sent:", response.data);
    return true;

  } catch (err) {
    console.log("Mailersend error:", err.response?.data || err.message);
    return false;
  }
};

module.exports = verifyEmail;
