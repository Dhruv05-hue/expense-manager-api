const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({

    service: "gmail",

    auth: {

        user: process.env.EMAIL_USER,

        pass: process.env.EMAIL_PASS

    }

});

transporter.verify((error, success) => {
    if (error) {
        console.error("Mailer verification failed:", error);
    } else {
        console.log("Mailer is ready.");
    }
});

module.exports = transporter;