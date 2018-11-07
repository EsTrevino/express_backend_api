const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('user', {
		_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		email: {
			type: DataTypes.STRING
		},
		password: {
			type: DataTypes.STRING
		}
		// googleId: {
		// 	type: DataTypes.STRING
		// }
	});

	User.associate = models => {
		models.user.hasMany(models.post, {
			foreignKey: 'user_id'
		});

		models.user.hasOne(models.profile, {
			foreignKey: 'user_id'
		});
	};

	return User;
};

//user will be the one that will have a key showing all posts
