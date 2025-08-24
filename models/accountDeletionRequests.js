const Sequelize = require('sequelize');
const sequelize = require('../database/connection');

const accountDeletionRequests = sequelize.define('tbl_account_deletion_requests', {
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
	reason: {
		type: Sequelize.STRING(255),
		allowNull: true,
	},
	requestStatus: {
		type: Sequelize.ENUM('Pending', 'Accepted', 'Declined'),
		allowNull: false,
		defaultValue: 'Pending',
	},
	actionTakenByAdminId: {
		type: Sequelize.BIGINT,
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

module.exports = accountDeletionRequests;
