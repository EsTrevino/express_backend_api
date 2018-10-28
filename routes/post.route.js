const express = require('express');
const router = express.Router();
const models = require('../models/index');
const passport = require('passport');

//create a post
router.post('/create_post', passport.authenticate('jwt', { session: false }), (req, res) => {
	console.log(req.user);
	models.post
		.create({
			...req.body,
			user_Id: req.user._id
		})
		.then(post => {
			res.status(200).json({
				message: 'post successfully created'
			});
		})
		.catch(err => {
			res.json({ message: err });
		});
});

//find all posts by userId
router.get('/get_all_posts/:userId', (req, res) => {
	models.post
		.findAll({
			include: [
				{
					model: models.user,
					where: { _id: req.params.userId }
				}
			]
		})
		.then(posts => {
			res.json(posts);
		})
		.catch(err => {
			console.log(err);
		});
});

//delete a post (protected)
router.delete('/delete_post/:postId', passport.authenticate('jwt', { session: false }), (req, res) => {
	//we need to make sure users can only delete their own posts
	models.post
		.findOne({
			where: { _id: req.params.postId }
		})
		.then(post => {
			if (post.user_Id == req.user._id) {
				models.post
					.destroy({
						where: { _id: req.params.postId }
					})
					.then(deletedPost => {
						res.status(200).json({
							message: 'post successfully deleted'
						});
					});
			} else {
				res.status(403).json({
					message: "unable to delete other user's posts"
				});
			}
		});
});

//update a specific post (protected)

//display all comments for a specific post

module.exports = router;
