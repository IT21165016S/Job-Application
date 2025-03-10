const nodemailer = require("nodemailer");
const cron = require("node-cron");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (email, name) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your CV is Under Review",
    text: `Dear ${name},\n\nYour CV has been successfully submitted and is currently under review.\n\nBest Regards,\nHR Team`,
  });
};

// Schedule email to be sent the next day at 9 AM
cron.schedule("0 9 * * *", async () => {
  console.log("⏳ Sending follow-up emails...");
  const cvs = await CV.find();
  for (const cv of cvs) {
    await sendEmail(cv.email, cv.name);
  }
  console.log("✅ Follow-up emails sent!");
});

module.exports = { sendEmail };
