const Sequelize = require('sequelize');
const sequelize = require('../database/connection');

const playerPersonalityDetails = sequelize.define('tbl_player_personality_details', {
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
	questionId: {
		type: Sequelize.BIGINT,
		allowNull: true,
	},
	answer: {
		type: Sequelize.JSON,
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

module.exports = playerPersonalityDetails;
