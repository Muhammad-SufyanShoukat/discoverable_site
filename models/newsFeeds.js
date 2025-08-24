const Sequelize = require('sequelize');
const sequelize = require('../database/connection');

const newsFeeds = sequelize.define('tbl_news_feeds', {
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
	content: {
		type: Sequelize.TEXT,
		allowNull: true,
	},
	imagesVideosUrl: {
		type: Sequelize.JSON,
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
	address: {
		type: Sequelize.TEXT,
		allowNull: true,
	},
	isActivity: {
		type: Sequelize.TINYINT(1),
		allowNull: false,
		defaultValue: 0,
	},
	isVideo: {
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

module.exports = newsFeeds;
