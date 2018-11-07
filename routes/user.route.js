const express = require('express');
const router = express.Router();
const CONFIG = require('../config/config.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models/index');
const passport = require('passport');

router.post('/signup', (req, res) => {
	bcrypt.hash(req.body.password, 10, (err, hash) => {
		if (err) {
			return res.status(500).json({
				error: err,
				errorOnHash: 'Error hashing password'
			});
		} else {
			//save user taking the body and the hashed password
			models.user
				.create({
					email: req.body.email,
					password: hash
					//then return a 201 status
					//and a json object of saved user
				})
				.then(user =>
					res.status(200).json({
						User: user,
						Message: 'user successfully created'
					})
				)
				.catch(err => {
					res.status(500).json({
						error: err,
						errorOnSave: 'Error saving user in MySql'
					});
				});
		}
	}); //end of hash block
}); //end of route block

router.post('/signin', (req, res) => {
	models.user.findOne({ where: { email: req.body.email } }).then(user => {
		bcrypt.compare(req.body.password, user.password, (err, result) => {
			if (err) {
				return res.status(401).json({
					error: err,
					errorOnCompare: 'Error comparing password'
				});
			}
			if (result) {
				const payload = {
					_id: user.dataValues._id,
					email: user.dataValues.email
				};

				jwt.sign(payload, CONFIG.jwt_secretkey, (err, token) => {
					res.json({
						token: token
					});
				});
			} else {
				return res.status(401).json({
					failed: 'Unauthorized access'
				});
			}
		});
	});
});

router.post('/create_profile', passport.authenticate('jwt', { session: false }), (req, res) => {
	//first create the profile
	//then find the user associated with it
	//then update that users profileId with i from profile.create
	models.profile
		.create({
			...req.body
		})
		.then(profile => {
			//step one: update user profileId
			//once profile is successfully created
			models.user
				//find user based on id pulled from token
				.findOne({ where: { _id: req.user._id } })
				//once found
				.then(user => {
					//update profileId with id from profile object created above
					user
						.update({
							profile_Id: profile._id
						})
						//if error updating user's profileId, catch
						.catch(err => {
							console.log(err);
						});
				})
				//if error finding user based on id from token
				.catch(err => {
					console.log(err);
				});

			//step two send response with json info
			res.status(200).json({
				profile: profile,
				message: 'profile created successfully'
			});
		})
		//if error creating profile throw it
		.catch(err => {
			res.status(500).json({
				error: err,
				errorOnCreate: 'error saving profile in MySql'
			});
		});
});

//see all of your posts
//see all of someone elses posts
//see all your comments and the posts they were on
//update your posts
//delete your posts
//comment on someone elses posts
//like someone elses posts or comment
//unlike someone elses post or comment
module.exports = router;
