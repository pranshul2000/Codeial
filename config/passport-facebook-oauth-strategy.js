const passport = require('passport');
const facebookStrategy = require('passport-facebook');
const crypto = require('crypto');
const User = require('../models/user');
const env = require('./enviroment');

passport.use(new facebookStrategy({
        clientID: env.facebook_clint_id,
        clientSecret: env.facebook_clint_secret,
        callbackURL: env.facebook_callback_url
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