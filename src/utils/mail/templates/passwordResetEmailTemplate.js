const beautifyName = require('../index').beautifyName

function passwordResetEmailTemplate(receiverEmail,reciverName,token){

const template = {
    from: '"NotesKeeper Support Team" <noteskeeper247@gmail.com>', // sender address
    to: receiverEmail, // list of receivers
    subject: "Password Reset Instruction from NotesKeeper.md", // Subject line
    html: `<h3>Hello ${beautifyName(reciverName)}</h3>
    <p>The Password Reset link is given below<p>
    <a href=${process.env.FRONT_DOMAIN+'/resetpassword?token='+token}>${process.env.FRONT_DOMAIN+'/resetpassword?token='+token}<a>
    <br/><small>This link is going to expire after 10 minute of Generation</small>
    <p>Regards</p>
    <p>NotesKeeper Support Team</p>` // html body
}
return template
}

module.exports = passwordResetEmailTemplate