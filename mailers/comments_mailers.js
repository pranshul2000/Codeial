const nodemailer = require('../config/nodemailer');


// this is another way of exporting method
exports.newComment = (comment) => {
    let htmlString = nodemailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');

    nodemailer.transpoter.sendMail({
        from: 'pranshulgupta2000@gmail.com',
        to: comment.user.email,
        subject: 'New comment published',
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