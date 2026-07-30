const transporter = require("../config/mailer");

async function sendOTPEmail(
    email,
    otp,
    subject = "Expense Manager Email Verification",
    heading = "Email Verification",
    expiry = "10 minutes"
) {
    const mailOptions = {
        from: process.env.SENDER_EMAIL,

        to: email,

        subject,

        html: `
            <h2>${heading}</h2>

            <p>Your OTP is:</p>

            <h1>${otp}</h1>

            <p>This OTP will expire in ${expiry}.</p>

            <p>If you didn't request this, please ignore this email.</p>
        `,
    };

    await transporter.sendMail(mailOptions);
}

module.exports = {
    sendOTPEmail,
};