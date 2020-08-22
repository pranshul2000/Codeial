module.exports.profile = function(req, res){
    console.log('hey');
    return res.end('<h1>User profile</h1>')
}

// render the sign Up page
module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    });
}
// render the sign in page
module.exports.signIn = function(req, res){
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    });
}

// get the sign up data
module.exports.create = function(req, res){
    // todo later
}
// sign in and create a session for the user
module.exports.createSession = function(req, res){
    // todo later
}