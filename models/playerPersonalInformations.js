const Sequelize = require('sequelize');
const sequelize = require('../database/connection');

const playerPersonalInformations = sequelize.define('tbl_player_personal_informations', {
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
	school: {
		type: Sequelize.STRING(255),
		allowNull: true,
	},
	division: {
		type: Sequelize.ENUM('NCAA', 'NJCAA', 'NAIA', 'PREP', 'AAU'),
		allowNull: true,
	},
	height: {
		type: Sequelize.STRING(20),
		allowNull: true,
	},
	weight: {
		type: Sequelize.FLOAT,
		allowNull: true,
	},
	  position: {
		type: Sequelize.ENUM('PG', 'SG', 'SF', 'PF', 'C'),
		allowNull: true,
	},
	class: {
		type: Sequelize.INTEGER,
		allowNull: true,
	},
	  birthplace: {
		type: Sequelize.TEXT,
		allowNull: true,
	},
	gpa: {
		type: Sequelize.FLOAT,
		allowNull: true,
	},
	  saatScore: {
		type: Sequelize.INTEGER,
		allowNull: true,
	},
	  actScore: {
		type: Sequelize.INTEGER,
		allowNull: true,
	},
	ncaaId: {
		type: Sequelize.STRING(255),
		allowNull: true,
	},
	countryCode: {
		type: Sequelize.STRING(5),
		allowNull: true,
	},
	phoneNumber: {
		type: Sequelize.BIGINT,
		allowNull: true,
	},
	  email: {
		type: Sequelize.STRING(100),
		allowNull: true,
	},
	twitterSocialProfile: {
		type: Sequelize.TEXT,
		allowNull: true,
	},
	instagramSocialProfile: {
		type: Sequelize.TEXT,
		allowNull: true,
	},
	facebookSocialProfile: {
		type: Sequelize.TEXT,
		allowNull: true,
	},
	youtubeProfile: {
		type: Sequelize.TEXT,
		allowNull: true,
	},
	currentLocation: {
		type: Sequelize.TEXT,
		allowNull: true,
	},
	latitude: {
		type: Sequelize.STRING(255),
		allowNull: true,
	},
	longitude: {
		type: Sequelize.STRING(255),
		allowNull: true,
	},
	aboutMe: {
		type: Sequelize.TEXT,
		allowNull: true,
	},
	videoUrl: {
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

module.exports = playerPersonalInformations;
