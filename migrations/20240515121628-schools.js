'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.createTable('tbl_schools', {
			id: {
				type: Sequelize.BIGINT,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
      		state: {
				type: Sequelize.STRING(50),
				allowNull: true,
			},
			semiDivision: {
				type: Sequelize.STRING(25),
				allowNull: true,
			},
      		division: {
				type: Sequelize.STRING(25),
				allowNull: true,
			},
      		uniqueId: {
				type: Sequelize.STRING(25),
				allowNull: true,
			},
			sportsCode: {
				type: Sequelize.ENUM('Men\'s Basketball', 'Women\'s Basketball'),
				allowNull: true,
			},
			name: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			logo: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
			email: {
				type: Sequelize.STRING(100),
				allowNull: true,
			},
			phone: {
				type: Sequelize.BIGINT,
				allowNull: true,
			},
			tuitionFees: {
				type: Sequelize.BIGINT,
				allowNull: true,
			},
			openings: {
				type: Sequelize.INTEGER,
				allowNull: true,
			},
			aboutUniversity: {
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
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.dropTable('tbl_schools');
	},
};
