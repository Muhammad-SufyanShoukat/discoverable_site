'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.createTable('tbl_admins', {
			id: {
				type: Sequelize.BIGINT,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			firstName: {
				type: Sequelize.STRING(50),
				allowNull: true,
			},
			lastName: {
				type: Sequelize.STRING(50),
				allowNull: true,
			},
			email: {
				type: Sequelize.STRING(100),
				allowNull: false,
				unique: true,
			},
			password: {
				type: Sequelize.STRING(255),
				allowNull: false,
			},
			roleId: {
				type: Sequelize.BIGINT,
				allowNull: false,
				references: {
					model: 'tbl_roles',
					key: 'id',
				},
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
			isVerified: {
				type: Sequelize.TINYINT(1),
				allowNull: false,
				defaultValue: 0,
			},
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
		});
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.dropTable('tbl_admins');
	},
};
