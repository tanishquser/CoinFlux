const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const sendEmail = async ({ to, subject, text }) => {
  await transporter.sendMail({
    from: '"Fintech Wallet" <no-reply@wallet.com>',
    to,
    subject,
    text,
  });
};

module.exports = sendEmail;