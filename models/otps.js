const Sequelize = require('sequelize');
const sequelize = require('../database/connection');

const otps = sequelize.define('tbl_otps', {
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
	otp: {
		type: Sequelize.BIGINT,
	},
	expiryTime: {
		type: Sequelize.STRING(50),
	},
	createdAt: Sequelize.DATE,
	updatedAt: Sequelize.DATE,
});

module.exports = otps;
