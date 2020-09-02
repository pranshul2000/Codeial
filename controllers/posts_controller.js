const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');
const { findById } = require('../models/post');

module.exports.create = async function (req, res) {

    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        // post = await findById(post._id).populate('user'); 
        
        // console.log(post);

        if(req.xhr){

            post = await Post.findById(post._id).populate({
                path: 'user',
                select: '-password'
            });

            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post created!"
            })
        }

        req.flash('success', 'Post created!');
        return res.redirect('/');
    } catch (err) {
        req.flash('error', err);
        return;
    }

}

module.exports.destroy = async function (req, res) {

    try {
        let post = await Post.findById(req.params.id);

        if (post.user == req.user.id) {

            await Like.deleteMany({likeable: post, onModel: 'Post'});
            await Like.deleteMany({_id: {$in: post.comment}});


            post.remove();
            await Comment.deleteMany({ post: req.params.id });
            

            if(req.xhr){
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post deleted!"
                })
            }

            req.flash('success', 'Post deleted!');
            return res.redirect('back');
        } else {
            req.flash('error', 'You cannot delete this post!');
            return res.redirect('back');
        }

    } catch (err) {
        req.flash('error', err);
        return;
    }
}