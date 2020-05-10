const beautifyName = require('../index').beautifyName

function verifyEmailTemplate(receiverEmail,reciverName,token){

const template = {
    from: '"NotesKeeper Support Team" <noteskeeper247@gmail.com>', // sender address
    to: receiverEmail, // list of receivers
    subject: "Verification Email from NotesKeeper.md", // Subject line
    html: `<h3>Hello ${beautifyName(reciverName)}</h3>
    <p>The verification link is given below<p>
    <a href=${process.env.FRONT_DOMAIN+'/verifyemail?token='+token}>${process.env.FRONT_DOMAIN+'/verifyemail?token='+token}<a>
    <small>This verification link is going to expire after 1 hour of Generation</small>
    <p>Regards</p>
    <p>NotesKeeper Support Team</p>` // html body
}
return template
}

module.exports = verifyEmailTemplate