const nodemailer = require("nodemailer");

const sendEmail = async (template)=>{
  let transporter = nodemailer.createTransport({
    service:'gmail',// true for 465, false for other ports
    auth: {
      user: process.env.SERVICE_EMAIL, // generated ethereal user
      pass: process.env.SERVICE_EMAIL_PASSWORD // generated ethereal password
    }
  });

  // send mail with defined transport object
  await transporter.sendMail(template)
}


module.exports = sendEmail