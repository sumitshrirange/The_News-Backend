const axios = require("axios");
require("dotenv").config();

const verifyEmail = async (token, email) => {
  const url = "https://api.elasticemail.com/v2/email/send";

  try {
    const response = await axios.post(url, {
      params: {
        apikey: process.env.ELASTIC_API,
        subject: "Verify your Email",
        to: email,
        from: process.env.MAIL_USER,
        bodyHtml: encodeURIComponent(`
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
    `),
      },
    });

    console.log("Elastic Email Response:", response.data);
    return true;
  } catch (err) {
    console.log("Elastic Email Error:", err.response?.data || err);
    return false;
  }
};

module.exports = verifyEmail;
