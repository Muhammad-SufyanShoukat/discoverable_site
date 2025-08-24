const Sequelize = require('sequelize');
const sequelize = require('../database/connection');

const states = sequelize.define('tbl_states', {
	id: {
		type: Sequelize.BIGINT,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
	},
	name: {
		type: Sequelize.STRING(50),
		allowNull: true,
		unique: true,
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

module.exports = states;
