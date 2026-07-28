const nodemailer = require("nodemailer");

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});


transporter.verify((error, success) => {
    if (error) {
        console.error("Mailer verification failed:", error);
    } else {
        console.log("Mailer is ready.");
    }
});

module.exports = transporter;