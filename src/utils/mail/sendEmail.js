const nodemailer = require("nodemailer");   // Send verification emails from NodeJS

const sendEmail = async (template) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail', // true for 465, false for other ports
    auth: {
      user: process.env.SERVICE_EMAIL, // generated ethereal user
      pass: process.env.SERVICE_EMAIL_PASSWORD // generated ethereal password
    }
  });

  // Send email with defined transport object
  let info = await transporter.sendMail(template);

  console.log("Message sent: %s", info.messageId, 'exec')
}

module.exports = sendEmail