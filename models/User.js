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
	});

	return User;
};
