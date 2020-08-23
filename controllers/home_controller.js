const Post = require('../models/post');
module.exports.home = function(req, res){

    // Post.find({}, function(err, posts){
    //     return res.render('home', {
    //         title: "codeial | Home",
    //         posts: posts
    //     });
    // });


    // populate the user of each post
    Post.find({}).populate('user').exec(function(err, posts){
        return res.render('home', {
            title: "codeial | Home",
            posts: posts
        });
    })

    
}