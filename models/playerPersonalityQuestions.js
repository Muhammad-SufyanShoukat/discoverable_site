const Sequelize = require('sequelize');
const sequelize = require('../database/connection');

const playerPersonalityQuestions = sequelize.define('tbl_player_personality_questions', {
	id: {
		type: Sequelize.BIGINT,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
	},
	questions: {
		type: Sequelize.TEXT,
		allowNull: true,
	},
	choices: {
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

module.exports = playerPersonalityQuestions;
