const Sequelize = require('sequelize');
const sequelize = require('../database/connection');

const offers = sequelize.define('tbl_offers', {
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
	},
	userId: {
		type: Sequelize.BIGINT,
		allowNull: true,
		references: {
			model: 'tbl_users',
			key: 'id',
		},
	},
	requestStatus: {
		type: Sequelize.ENUM('Offered', 'Requested', 'Committed', 'Declined', 'Cancelled'),
		allowNull: true,
		defaultValue: 'Offered',
	},
	requestedById: {
		type: Sequelize.BIGINT,
		allowNull: true,
		references: {
			model: 'tbl_users',
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
	createdAt: Sequelize.DATE,
	updatedAt: Sequelize.DATE,
});

module.exports = offers;
