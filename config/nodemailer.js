const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');


let transpoter = nodemailer.createTransport({
    service: 'gamil',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'testmailer.pg',
        pass: '********'
    }

});

let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath ),
        data,
        function(err, template){
            if(err){console.log('error in rendering templete', err);return;}

            mailHTML = template;

        }
    )

    return mailHTML;
}

module.exports = {
    transpoter: transpoter,
    renderTemplate: renderTemplate
}