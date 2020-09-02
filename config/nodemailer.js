const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const env = require('./enviroment');

let transpoter = nodemailer.createTransport(env.smtp);

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