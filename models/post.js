const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	const Post = sequelize.define('post', {
		_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		title: {
			type: DataTypes.STRING
		},
		content: {
			type: DataTypes.STRING
		}
	});

	Post.associate = models => {
		models.post.belongsTo(models.user, {
			foreignKey: 'user_Id'
		});
	};

	return Post;
};
