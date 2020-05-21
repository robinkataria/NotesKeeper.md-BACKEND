const beautifyName = require('../index').beautifyName

function passwordResetEmailTemplate(receiverEmail, reciverName, token) {

    const template = {
        from: '"NotesKeeper Support Team" <noteskeeper247@gmail.com>', // Sender address
        to: receiverEmail,  // list of receivers
        subject: "Password Reset Link from NotesKeeper.md",  // Subject line
        html: `<h3>Hey ${beautifyName(reciverName)},</h3>
    <p>Somebody(hopefully you) requested a <b>new password</b> for your <em>NotesKeeper</em> account.<p>
    <p>You can reset your password by clicking the link given below:</p>
    <a href=${process.env.FRONT_DOMAIN + '/resetpassword?token=' + token}>${process.env.FRONT_DOMAIN + '/resetpassword?token=' + token}<a>
    <br /><br />
    <small><b>Note:</b> Above link will expire within 10 minutes of generation of password reset request.</small> <br />
    <small>If you didn't request this, you can ignore this email or let us know.</small>
    <br /><br />
    <p>Regards</p>
    <p>NotesKeeper Support Team</p>` // html body
    }
    return template
}

module.exports = passwordResetEmailTemplate