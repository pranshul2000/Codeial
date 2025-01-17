const Post = require('../models/post');
const User = require('../models/user');
// module.exports.home = function(req, res){

//     // Post.find({}, function(err, posts){
//     //     return res.render('home', {
//     //         title: "codeial | Home",
//     //         posts: posts
//     //     });
//     // });


//     // populate the user of each post
//     Post.find({})
//     .populate('user')
//     .populate({
//         path: 'comments',
//         populate: {
//             path: 'user'
//         }
//     })
//     .exec(function(err, posts){

//         User.find({}, function(err, users){
//             return res.render('home', {
//                 title: "codeial | Home",
//                 posts: posts,
//                 all_users: users
//             });
//         });
//     })
    
// }

module.exports.home = async function(req, res){

    try {
        let posts  = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user',
                select: '-password'
            },
            populate: {
                path: 'likes'
            }
        }).populate('likes');

        let users = await User.find({});

        return res.render('home', {
            title: "codeial | Home",
            posts: posts,
            all_users: users
        });

    } catch(err){
        console.log('error', err);
        return;
    }
    

}