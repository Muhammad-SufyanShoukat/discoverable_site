const {UserService} = require('../../services');

class GuestUserController {
	/** ***** Guest Controller: Method to search users by role id ******/
	async searchUsersByRoleId(req, res, next) {
		try {
			await UserService.searchUsersByRoleId(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** Guest Controller: Method to search programs list ******/
	async searchProgramsList(req, res, next) {
		try {
			await UserService.searchProgramsList(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** Guest Controller: Method to get news feeds list by role id ******/
	async newsFeedsByRoleId(req, res, next) {
		try {
			await UserService.newsFeedsByRoleId(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** Guest Controller: Method to get users video reels by role id ******/
	async usersVideoReelsByRoleId(req, res, next) {
		try {
			await UserService.usersVideoReelsByRoleId(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** Guest Controller: Method to get official rosters list by program id ******/
	async officialRostersListByProgramId(req, res, next) {
		try {
			await UserService.officialRostersListByProgramId(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** Guest Controller: Method to get committed players list by program id ******/
	async committedPlayersListByProgramId(req, res, next) {
		try {
			await UserService.committedPlayersListByProgramId(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** Guest Controller: Method to get guest news feeds list by role id ******/
	async guestRecruitingNewsFeedsListByRoleId(req, res, next) {
		try {
			await UserService.guestRecruitingNewsFeedsListByRoleId(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** Guest Controller: Method to get guest match styles list by role id ******/
	async guestMatchStylesListByRoleId(req, res, next) {
		try {
			await UserService.guestMatchStylesListByRoleId(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}
	
	async guestTopUsersListByRoleId(req, res, next) {
		try {
			await UserService.guestTopUsersListByRoleId(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

}

module.exports = new GuestUserController();
