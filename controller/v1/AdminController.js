const {AdminService} = require('../../services');

class AdminController {
	/** ***** Admin Controller: Method to get admin profile info ******/
	async getAdminProfileInfo(req, res, next) {
		try {
			await AdminService.getAdminProfileInfo(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** Admin Controller: Method to get roles list ******/
	async getRolesList(req, res, next) {
		try {
			await AdminService.getRolesList(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** Admin Controller: Method to create users list ******/
	async createUsers(req, res, next) {
		try {
			await UserService.createUsers(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** Admin Controller: Method to get users list ******/
	async usersList(req, res, next) {
		try {
			await UserService.usersList(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** Admin Controller: Method to get active users list ******/
	async activeUsersList(req, res, next) {
		try {
			await UserService.activeUsersList(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** Admin Controller: Method to get active users list by id ******/
	async usersListById(req, res, next) {
		try {
			await UserService.usersListById(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** Admin Controller: Method to update user ******/
	async updateUsers(req, res, next) {
		try {
			await UserService.updateUsers(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** Admin Controller: Method to delete users ******/
	async deleteUsers(req, res, next) {
		try {
			await UserService.deleteUsers(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}
}

module.exports = new AdminController();
