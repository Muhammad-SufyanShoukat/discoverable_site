const Sequelize = require('sequelize');
const sequelize = require('../database/connection');

const errorLogs = sequelize.define('tbl_error_logs', {
	id: {
		type: Sequelize.BIGINT,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
	},
	method: {
		type: Sequelize.STRING(50),
		allowNull: true,
	},
	log: {
		type: Sequelize.TEXT('long'),
		allowNull: true,
	},
	status: {
		type: Sequelize.TINYINT(1),
		allowNull: false,
		defaultValue: 1,
	},
	createdAt: Sequelize.DATE,
	updatedAt: Sequelize.DATE,
});

module.exports = errorLogs;
