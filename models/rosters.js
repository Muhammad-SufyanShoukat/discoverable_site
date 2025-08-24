const Sequelize = require('sequelize');
const sequelize = require('../database/connection');

const rosters = sequelize.define('tbl_rosters', {
	id: {
		type: Sequelize.BIGINT,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
	},
	coachId: {
		type: Sequelize.BIGINT,
		allowNull: false,
		references: {
			model: 'tbl_users',
			key: 'id',
		},
	},
	programId: {
		type: Sequelize.BIGINT,
		allowNull: false,
		// references: {
		//   model: 'tbl_users',
		//   key: 'id',
		// },
	},
	userId: {
		type: Sequelize.BIGINT,
		allowNull: true,
	},
	profilePictureUrl: {
		type: Sequelize.TEXT,
		allowNull: true,
	},
	firstName: {
		type: Sequelize.STRING(50),
		allowNull: true,
	},
	lastName: {
		type: Sequelize.STRING(50),
		allowNull: true,
	},
	class: {
		type: Sequelize.INTEGER,
		allowNull: true,
	},
	position: {
		type: Sequelize.ENUM('PG', 'SG', 'SF', 'PF', 'C'),
		allowNull: true,
	},
	height: {
		type: Sequelize.STRING(20),
		allowNull: true,
	},
	description: {
		type: Sequelize.TEXT,
		allowNull: true,
	},
	openings: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 0,
	},
	isOfficial: {
		type: Sequelize.TINYINT(1),
		allowNull: false,
		defaultValue: 0,
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

module.exports = rosters;
