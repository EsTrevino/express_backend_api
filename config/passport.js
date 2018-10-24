const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const models = require('../models/index.js');
const CONFIG = require('./config.js');

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = CONFIG.jwt_secretkey;

module.exports = passport => {
	passport.use(
		new JwtStrategy(options, (jwt_payload, done) => {
			//find user
			models.user
				.findOne({ where: { _id: jwt_payload._id } })
				.then(user => {
					if (user) {
						return done(null, user.dataValues);
					} else {
						res.json({ message: 'here' });
						return done(null, false);
					}
				})
				.catch(err => console.log(err));
		})
	);
};
