'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('tbl_admins', [{
			firstName: 'Super',
			lastName: 'Admin',
			email: 'superadmin.ur@subcodevs.com',
			password: 'db618a3a7942078fe61112e2c7b0b49d4844e63697c0bbb58f0ff9776ec2625d', // MwbbUr@$27chpr
			roleId: 1,
			status: 1,
			isVerified: 1,
			isDeleted: 0,
			createdAt: new Date(),
			updatedAt: new Date(),

		}]);
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('tbl_admins', null, {});
	},
};
