const Sequelize = require('sequelize');
const sequelize = require('../database/connection');

const splashScreens = sequelize.define('tbl_splash_screens', {
	id: {
		type: Sequelize.BIGINT,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
	},
	title: {
		type: Sequelize.STRING(255),
		allowNull: true,
		unique: true,
	},
	body: {
		type: Sequelize.TEXT,
		allowNull: true,
	},
	backgroundImageUrl: {
		type: Sequelize.TEXT,
		allowNull: true,
	},
	status: {
		type: Sequelize.TINYINT(1),
		allowNull: false,
		defaultValue: 1,
	},
	isDeleted: {
		type: Sequelize.TINYINT(1),
		allowNull: false,
		defaultValue: 0,
	},
	createdAt: Sequelize.DATE,
	updatedAt: Sequelize.DATE,
});

module.exports = splashScreens;
