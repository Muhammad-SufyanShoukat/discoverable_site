module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.createTable('tbl_notifications', {
			id: {
				type: Sequelize.BIGINT,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			userId: {
				type: Sequelize.BIGINT,
				allowNull: true,
			},
			title: {
				type: Sequelize.STRING(50),
				allowNull: true,
			},
			body: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			notificationType: {
				type: Sequelize.STRING(25),
				allowNull: true,
			},
			data: {
				type: Sequelize.JSON,
				allowNull: true,
			},
			viewStatus: {
				type: Sequelize.TINYINT(1),
				allowNull: true,
				default: 0,
			},
			status: {
				type: Sequelize.TINYINT(1),
				allowNull: true,
				default: 1,
			},
			isDeleted: {
				type: Sequelize.TINYINT(1),
				allowNull: true,
				default: 0,
			},
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
		});
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.dropTable('tbl_notifications');
	},
};
