const Sequelize = require('sequelize');
const sequelize = require('../database/connection');

const notifications = sequelize.define('tbl_notifications', {
	id: {
		type: Sequelize.BIGINT,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
	},
	userId: {
		type: Sequelize.BIGINT,
		allowNull: true,
	},
	title: {
		type: Sequelize.STRING(50),
		allowNull: true,
	},
	body: {
		type: Sequelize.STRING(255),
		allowNull: true,
	},
	notificationType: {
		type: Sequelize.STRING(25),
		allowNull: true,
	},
	data: {
		type: Sequelize.JSON,
		allowNull: true,
	},
	viewStatus: {
		type: Sequelize.TINYINT(1),
		allowNull: true,
		default: 0,
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

module.exports = notifications;
