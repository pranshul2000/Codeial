const nodemailer = require('../config/nodemailer');


module.exports.resetPassword = function(token){
    let htmlString = nodemailer.renderTemplate({token: token}, '/reset_password/reset_password.ejs');
    
    nodemailer.transpoter.sendMail({
        from: 'pranshulgupta2000@gmail.com',
        to: token.user,
        subject: 'Reset Password Link',
        html: htmlString
    }, (err, info) => {
        if(err){
            console.log('error in sending the mail', err);
            return;
        }

        console.log('message sent', info);
        return;

    });
}