const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get(
	'/google',
	passport.authenticate('google', {
		scope: ['profile', 'email']
	})
);

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
	res.json({ message: 'successfully logged in with google' });
});

module.exports = router;
