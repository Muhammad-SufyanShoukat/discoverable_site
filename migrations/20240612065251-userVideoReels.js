'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.createTable('tbl_user_video_reels', {
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
			videoReelsUrl: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
      		content: {
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
			address: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
      		views: {
        		type: Sequelize.BIGINT,
				allowNull: true,
        		defaultValue: 0,
      		},
			shareCounts: {
			  type: Sequelize.BIGINT,
			  allowNull: true,
			  defaultValue: 0,
			},
      		visibility: {
        		type: Sequelize.ENUM('Everyone', 'Followers', 'None'),
				allowNull: false,
				defaultValue: 'Everyone',
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
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.dropTable('tbl_user_video_reels');
	},
};
