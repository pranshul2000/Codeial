const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');
// auth using passport 
passport.use(new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true
    },
    function(req, email, password, done){
        // find the user and establish the identity
        User.findOne({email: email}, function(err, user){
            if(err){
                req.flash('error', err);
                return done(err);
            }

            if(!user || user.password != password){
                req.flash('error', 'Invalid Username/Password');
                return done(null, false);
            }
            return done(null, user);
        }); 
    }
));

// serializing the user to decide which key is to be kept int the cookie
passport.serializeUser(function(user, done){
    done(null, user.id);
});

// deserializing the user from the key in the cookie
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in Finding the user --> Passport');
            return done(err);
        }

        return done(null, user);
    });
});


// check if the user is auth 
passport.checkAuthentication = function(req, res, next){
    // if the user is singed in the pass on the req to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }

    // if the user is not signed in 
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        // req.user conatins the current signed in user from the session cookie abd we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
    next();
}


module.exports = passport;

