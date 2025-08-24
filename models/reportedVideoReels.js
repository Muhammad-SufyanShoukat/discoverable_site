const Sequelize = require('sequelize');
const sequelize = require('../database/connection');

const reportedVideoReels = sequelize.define('tbl_reported_video_reels', {
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
	videoReelId: {
		type: Sequelize.BIGINT,
		allowNull: false,
	},
	reason: {
		type: Sequelize.STRING(255),
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

module.exports = reportedVideoReels;
