const Sequelize = require('sequelize');
const sequelize = require('../database/connection');

const playerStats = sequelize.define('tbl_player_stats', {
	id: {
		type: Sequelize.BIGINT,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
	},
	userId: {
		type: Sequelize.BIGINT,
		allowNull: false,
		references: {
			model: 'tbl_users',
			key: 'id',
		},
	},
	year: {
		type: Sequelize.INTEGER,
		allowNull: true,
	},
	ppg: {
		type: Sequelize.FLOAT,
		allowNull: true,
	},
	fgPercentage: {
		type: Sequelize.FLOAT,
		allowNull: true,
	},
	rpg: {
		type: Sequelize.FLOAT,
		allowNull: true,
	},
	apg: {
		type: Sequelize.FLOAT,
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

module.exports = playerStats;
