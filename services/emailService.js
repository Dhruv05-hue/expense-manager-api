const transporter = require("../config/mailer");

async function sendOTPEmail(email, otp) {

    const mailOptions = {

        from: process.env.EMAIL_USER,

        to: email,

        subject: "Expense Manager Email Verification",

        text: `Your OTP is ${otp}`,

        html: `
            <h2>Email Verification</h2>

            <p>Your OTP is:</p>

            <h1>${otp}</h1>

            <p>This OTP will expire in 10 minutes.</p>
        `
    };

    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);

    const result = await transporter.sendMail(mailOptions);

    console.log(result);

}

module.exports = {
    sendOTPEmail
};