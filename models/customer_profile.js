const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	const Customer_Profile = sequelize.define('customer_profile', {
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
		position: {
			type: DataTypes.STRING
		},
		short_bio: {
			type: DataTypes.STRING
		}
	});

	Customer_Profile.associate = models => {
		models.customer_profile.hasOne(models.user, {
			onDelete: 'CASCADE'
		});
	};

	return Customer_Profile;
};

//have a post connect to a customer_profile
//the profile will be able to show all posts made
