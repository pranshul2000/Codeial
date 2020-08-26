const nodemailer = require('../config/nodemailer');


// this is another way of exporting method
exports.newComment = (comment) => {
    console.log('inside new comment mailer');

    nodemailer.transpoter.sendMail({
        from: 'pranshulgupta2000@gmail.com',
        to: comment.user.email,
        subject: 'New comment published',
        html: '<h1>Your comment is now published</h1>'
    }, (err, info) => {
        if(err){
            console.log('error in sending the mail', err);
            return;
        }

        console.log('message sent', info);
        return;

    });
}