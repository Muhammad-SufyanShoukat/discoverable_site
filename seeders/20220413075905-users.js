'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('tbl_users', [{
			firstName: 'First',
			lastName: 'User',
			email: 'coach.undiscovered@yopmail.com',
			password: '10df3996f4bb0ecf0db95455f338816956685b0841608fc3828a9234b4051bda', // NewPass@1234
			countryCode: '+91',
			phone: 9876543210,
			roleId: 3,
			status: 1,
			isDeleted: 0,
			isVerified: 1,
			createdAt: new Date(),
			updatedAt: new Date(),

		},
		{
			firstName: 'First',
			lastName: 'User',
			email: 'player.undiscovered@yopmail.com',
			password: '10df3996f4bb0ecf0db95455f338816956685b0841608fc3828a9234b4051bda', // NewPass@1234
			countryCode: '+91',
			phone: 9876543211,
			roleId: 4,
			status: 1,
			isDeleted: 0,
			isVerified: 1,
			createdAt: new Date(),
			updatedAt: new Date(),

		}]);
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('tbl_users', null, {});
	},
};
