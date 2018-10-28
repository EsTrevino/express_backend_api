var GoogleStrategy = require('passport-google-oauth20').Strategy;
const CONFIG = require('./config.js');
const passport = require('passport');
const models = require('../models/index.js');

module.exports = passport => {
	passport.use(
		new GoogleStrategy(
			{
				clientID: CONFIG.google_client_id,
				clientSecret: CONFIG.google_client_secret,
				callbackURL: CONFIG.google_callback_url
			},
			//this callback function will run when /auth/google route is hit
			(accessToken, refreshToken, profile, done) => {
				//from google profile take their email and googleId
				let email = profile.emails[0].value;
				let googdId = profile.id;

				//check if user already exists in db
				models.user.findOne({ where: { email: email } }).then(currentUser => {
					//if they are a current user
					if (currentUser) {
						let userGoogleId = currentUser.googleId;
						//check if they have a googleId
						if (userGoogleId == null) {
							//update user's googleid in their profile if they dont
							currentUser
								.update({ googleId: googdId })
								.then(user => {
									//allow passport to send to serialeUser function
									done(null, user);
								})
								.catch(err => {
									res.json({ error: err });
								});
							//if they do have a google id
						} else {
							//send currentUser to serializeUser function
							done(null, currentUser);
						}
						//if they are not a current user
					} else {
						models.user
							.create({
								email: email,
								googleId: googleId
							})
							.catch(err => {
								console.log(
									err +
										' error trying to create user after finding out they dont already exist with google login '
								);
							});
					}
				});
			}
		)
	);
};
