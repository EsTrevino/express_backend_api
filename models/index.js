const Sequelize = require('sequelize');
const CONFIG = require('../config/config.js');
const fs = require('fs');
var path = require('path');
var basename = path.basename(module.filename);
const db = {};

//db connection
const sequelize = new Sequelize(CONFIG.db_name, CONFIG.db_user, CONFIG.db_password, {
	host: CONFIG.db_host,
	dialect: CONFIG.db_dialect,
	operatorsAliases: false,
	logging: false,

	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
});

//test db connection
sequelize
	.authenticate()
	.then(() => {
		console.log('Connection has been established successfully.');
	})
	.catch(err => {
		console.error('Unable to connect to the database:', err);
	});

//load all the models
fs
	.readdirSync(__dirname)
	.filter(file => {
		// file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
		return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
	})
	.forEach(file => {
		const model = sequelize['import'](path.join(__dirname, file));
		db[model.name] = model;
	});

Object.keys(db).forEach(function(modelName) {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

sequelize.sync({ force: true }).then(() => {
	console.log(`Database & tables created!`);
});

//Export the db Object
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
