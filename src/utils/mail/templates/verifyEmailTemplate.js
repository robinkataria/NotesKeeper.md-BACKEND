const beautifyName = require('../index').beautifyName

function verifyEmailTemplate(receiverEmail, reciverName, token) {

    const template = {
        from: '"NotesKeeper Support Team" <noteskeeper247@gmail.com>', // sender address
        to: receiverEmail, // list of receivers
        subject: "Verification Email from NotesKeeper.md", // Subject line
        html: `<h1>Welcome to NotesKeeper family!</h1>
        <br />    
        <h3>Hey ${beautifyName(reciverName)},</h3>
        <p>Click the below link to verify your email:<p>
        <a href=${process.env.FRONT_DOMAIN + '/verifyemail?token=' + token}>${process.env.FRONT_DOMAIN + '/verifyemail?token=' + token}<a>
        <br /><br />
        <p><b>Note:</b> The verification link will expire after 1 hour of generation of verification request.</p>
        <br />
        <p>Regards</p>
        <p>NotesKeeper Support Team</p>` // html body
    }
    return template
}

module.exports = verifyEmailTemplate