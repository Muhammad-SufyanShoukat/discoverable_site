const Sequelize = require('sequelize');
const sequelize = require('../database/connection');

const coachSelections = sequelize.define('tbl_coach_selections', {
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
	activeIconUrl: {
		type: Sequelize.TEXT,
		allowNull: true,
	},
	inactiveIconUrl: {
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

module.exports = coachSelections;
