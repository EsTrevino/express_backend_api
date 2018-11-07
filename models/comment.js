const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	const Comment = sequelize.define('comment', {
		_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		text: {
			type: DataTypes.STRING
		}
	});

	Comment.associate = models => {
		//we need to associate comments with customer profile to get the name and handle
		models.comment.belongsTo(models.profile, {
			foreignKey: 'profile_id'
		});
	};

	return Comment;
};
