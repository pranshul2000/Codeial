const User = require('../models/user');
const fs = require('fs');
const path = require('path');
const ResetPassword = require('../models/resert_password');
const crypto = require('crypto');
const restPasswordMailer = require('../mailers/reset_password_mailers');
module.exports.profile = function (req, res) {

    User.findById(req.params.id, function (err, user) {
        return res.render('user_profile', {
            title: "User Profile",
            profile_user: user
        });
    });


}

module.exports.update = async function (req, res) {
    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
    //         return res.redirect('back');
    //     } );

    // }else{
    //     return res.staus(401).send('Unauthorized');
    // }
    if (req.user.id == req.params.id) {
        try {
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function (err) {
                if (err) { console.log("multer error", err); return; }

                console.log(req.file);
                user.name = req.body.name;
                user.email = req.body.email;

                if (req.file) {
                    if (user.avatar) {
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }

                    // this is saving the path of the uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                console.log('saved');
                return res.redirect('back');
            });

        } catch (err) {
            req.flash('error', err);
            return res.redirect('back');

        }
    } else {
        req.flash('error', "Unauthorized");
        return res.staus(401).send('Unauthorized');
    }



}

// render the sign Up page
module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    });
}
// render the sign in page
module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    });
}

// get the sign up data
module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) { console.log('error in finding user in signing up'); return };

        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) { console.log('error in creating  user in signing up'); return };

                return res.redirect('/users/sign-in');
            });
        } else {
            return res.redirect('back');
        }
    });


}
// sign in and create a session for the user
module.exports.createSession = function (req, res) {
    req.flash('success', 'Logged in succesfully');
    return res.redirect('/');

}


module.exports.destroySession = function (req, res) {
    req.logout();

    req.flash('success', 'You have loged out');
    return res.redirect('/');
}

module.exports.resetPasswordCall = function (req, res) {
    return res.render('reset_password_page', {
        title: "Reset Password"
    })
}

module.exports.resetPassword = async function (req, res) {

    try {
        let token = await ResetPassword.create({
            user: req.body.email,
            accessToken: crypto.randomBytes(20).toString('hex'),
            isValid: true
        })

        restPasswordMailer.resetPassword(token);
        req.flash('success', 'Link to Reset email has been sent');
        return res.redirect('/users/sign-in');

    } catch (error) {
        console.log('error in creating accesstoken', err);
        return;

    }
}
module.exports.newPasswordPage = async function (req, res) {
    try {
        let newToken = await ResetPassword.findById(req.params.id);
        console.log(newToken);
        // console.log(newToken);
        if (newToken.isValid) {
            return res.render('update_password', {
                title: "update password",
                token: newToken
            });
        } else {
            req.flash('success', 'Invalid Try');
            return res.redirect('/users/sign-in');

        }

    } catch (error) {
        console.log('error in newPassword page ', error);
        return;

    }
}

module.exports.updateNewPassword = async function (req, res) {
    try {
        console.log(req.params);
        let token = await ResetPassword.findById(req.params.id);
        // let token = req.params.id; 
        console.log(token)
        console.log('hey');
        if (token.isValid && req.body.password == req.body.confirm_password) {
            console.log('hey 2');
            let newToken = await ResetPassword.findById(token._id);
            newToken.isValid = false;
            newToken.save();
            let user = await User.findOne({email: token.user});

            user.password = req.body.password;
            user.save();
            req.flash('success', 'password Updated');
            return res.redirect('/users/sign-in');
        } else {
            req.flash('success', 'Passwords didnt match');
            return res.redirect('back');
        }
    } catch (error) {
        console.log('error in resetting password', err);
        return;
    }
}
