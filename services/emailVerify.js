const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

const verifyEmail = async (token, email) => {
  try {
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "Verify Your Email",
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
    });

    console.log("Verification email sent");
  } catch (error) {
    console.log("Error sending verification email:", error);
  }
};

module.exports = verifyEmail;
