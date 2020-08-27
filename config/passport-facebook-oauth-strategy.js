const passport = require('passport');
const facebookStrategy = require('passport-facebook');
const crypto = require('crypto');
const User = require('../models/user');

passport.use(new facebookStrategy({
        clientID: '332539968117863',
        clientSecret:'614de681bbeeb681f30c8d8591cb069d',
        callbackURL: 'http://localhost:8000/users/auth/facebook/callback'
    },

    function(accessToken, refreshToken, profile, done){
        User.findOne({email: profile.id }).exec(function(err, user){
            if(err){console.log("error in facebook strategy passport", err); return;}

            console.log(accessToken, refreshToken);
            console.log(profile);

            if(user){
                // if found set this user as req.user
                return done(null, user);
            }else{
                User.create({
                    name: profile.displayName,
                    email: profile.id,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err, user){
                    if(err){console.log("error in facebook strategy passport", err); return;}

                    return done(null, user);
                });
            }
        });

    }
));

module.exports = passport;