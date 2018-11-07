const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	const Profile = sequelize.define('profile', {
		_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		first_name: {
			type: DataTypes.STRING
		},
		last_name: {
			type: DataTypes.STRING
		},
		handle: {
			type: DataTypes.STRING
		},
		position: {
			type: DataTypes.STRING
		},
		short_bio: {
			type: DataTypes.STRING
		}
	});

	Profile.associate = models => {
		models.profile.hasMany(models.comment, {
			foreignKey: 'profile_id'
		});
	};

	return Profile;
};
