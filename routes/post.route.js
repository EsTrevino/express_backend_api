const express = require('express');
const router = express.Router();
const models = require('../models/index');
const passport = require('passport');

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

//update a specific post (protected)
//delete a post (protected)

//display all comments for a specific post

module.exports = router;
