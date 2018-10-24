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
		address1: {
			type: DataTypes.STRING
		},
		address2: {
			type: DataTypes.STRING
		},
		city: {
			type: DataTypes.STRING
		},
		state: {
			type: DataTypes.STRING
		},
		zip: {
			type: DataTypes.STRING
		},
		phone: {
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
