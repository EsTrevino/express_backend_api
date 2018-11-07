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
		models.post.hasMany(models.comment, {
			foreignKey: 'post_id'
		});
	};

	return Post;
};
