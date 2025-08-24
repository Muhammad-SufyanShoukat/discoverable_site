const {UserService} = require('../../services');

class UserController {
	/** ***** User Controller: Method to Get User Profile ******/
	async getUserProfileInfo(req, res, next) {
		try {
			await UserService.getUserProfileInfo(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to update user profile info ******/
	async updateUserProfileInfo(req, res, next) {
		try {
			await UserService.updateUserProfileInfo(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to complete user registartion ******/
	async completeRegistration(req, res, next) {
		try {
			await UserService.completeRegistration(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to reset password ******/
	async resetPassword(req, res, next) {
		try {
			await UserService.resetPassword(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to upload profile picture ******/
	async uploadProfilePicture(req, res, next) {
		try {
			await UserService.uploadProfilePicture(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to get user kyc details ******/
	async userKycDetails(req, res, next) {
		try {
			await UserService.userKycDetails(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to upload selfie ******/
	async uploadSelfie(req, res, next) {
		try {
			await UserService.uploadSelfie(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to upload ID card ******/
	async uploadIdCard(req, res, next) {
		try {
			await UserService.uploadIdCard(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to upload driving license ******/
	async uploadDrivingLicense(req, res, next) {
		try {
			await UserService.uploadDrivingLicense(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to upload passport ******/
	async uploadPassport(req, res, next) {
		try {
			await UserService.uploadPassport(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to get user photos list ******/
	async userPhotosList(req, res, next) {
		try {
			await UserService.userPhotosList(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to upload passport ******/
	async uploadUserPhotos(req, res, next) {
		try {
			await UserService.uploadUserPhotos(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to get favourite players or coaches list ******/
	async favouritePlayersCoachesList(req, res, next) {
		try {
			await UserService.favouritePlayersCoachesList(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to mark players or coaches as favourite ******/
	async markUserAsFavourite(req, res, next) {
		try {
			await UserService.markUserAsFavourite(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to delete favourite players or coaches ******/
	async unmarkUserAsFavourite(req, res, next) {
		try {
			await UserService.unmarkUserAsFavourite(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to update personal information ******/
	async updatePlayerPersonalInformation(req, res, next) {
		try {
			await UserService.updatePlayerPersonalInformation(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to update player stats ******/
	async updatePlayerStats(req, res, next) {
		try {
			await UserService.updatePlayerStats(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to update personality details ******/
	async updatePlayerPersonalityDetails(req, res, next) {
		try {
			await UserService.updatePlayerPersonalityDetails(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to update players coach informtion ******/
	async updatePlayersCoachInformation(req, res, next) {
		try {
			await UserService.updatePlayersCoachInformation(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to update players guardian details ******/
	async updatePlayerGuardianDetails(req, res, next) {
		try {
			await UserService.updatePlayerGuardianDetails(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to get personal informations ******/
	async playerPersonalInformation(req, res, next) {
		try {
			await UserService.playerPersonalInformation(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to get player stats ******/
	async playerStats(req, res, next) {
		try {
			await UserService.playerStats(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to get player personality questions ******/
	async playerPersonalityQuestions(req, res, next) {
		try {
			await UserService.playerPersonalityQuestions(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to get player personality details ******/
	async playerPersonalityDetails(req, res, next) {
		try {
			await UserService.playerPersonalityDetails(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to update address ******/
	async playersCoachInformation(req, res, next) {
		try {
			await UserService.playersCoachInformation(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to update address ******/
	async playerGuardianDetails(req, res, next) {
		try {
			await UserService.playerGuardianDetails(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to get news feeds ******/
	async newsFeedsList(req, res, next) {
		try {
			await UserService.newsFeedsList(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to create news feeds ******/
	async createNewsFeeds(req, res, next) {
		try {
			await UserService.createNewsFeeds(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to update news feeds ******/
	async updateNewsFeeds(req, res, next) {
		try {
			await UserService.updateNewsFeeds(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to delete news feeds ******/
	async deleteNewsFeeds(req, res, next) {
		try {
			await UserService.deleteNewsFeeds(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to get coach personal information ******/
	async coachPersonalInformation(req, res, next) {
		try {
			await UserService.coachPersonalInformation(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to update coach personal information ******/
	async updateCoachPersonalInformation(req, res, next) {
		try {
			await UserService.updateCoachPersonalInformation(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to get coach coaching details ******/
	async coachCoachingDetails(req, res, next) {
		try {
			await UserService.coachCoachingDetails(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to update coach coaching details ******/
	async updateCoachCoachingDetails(req, res, next) {
		try {
			await UserService.updateCoachCoachingDetails(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to get coach previous teams ******/
	async coachPreviousTeams(req, res, next) {
		try {
			await UserService.coachPreviousTeams(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to update coach previous teams ******/
	async updateCoachPreviousTeams(req, res, next) {
		try {
			await UserService.updateCoachPreviousTeams(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to get coach career tables ******/
	async coachCareerTables(req, res, next) {
		try {
			await UserService.coachCareerTables(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to update coach career tables ******/
	async updateCoachCareerTables(req, res, next) {
		try {
			await UserService.updateCoachCareerTables(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to get coach playing history ******/
	async coachPlayingHistories(req, res, next) {
		try {
			await UserService.coachPlayingHistories(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to update coach playing history ******/
	async updateCoachPlayingHistories(req, res, next) {
		try {
			await UserService.updateCoachPlayingHistories(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to mark kyc as complete ******/
	async markKycAsComplete(req, res, next) {
		try {
			await UserService.markKycAsComplete(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to mark news feeds as favourite ******/
	async markNewsFeedAsFavourite(req, res, next) {
		try {
			await UserService.markNewsFeedAsFavourite(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to unmark news feeds as favourite ******/
	async unmarkNewsFeedAsFavourite(req, res, next) {
		try {
			await UserService.unmarkNewsFeedAsFavourite(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to get guardian details ******/
	async guardiansList(req, res, next) {
		try {
			await UserService.guardiansList(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to get coach roles ******/
	async coachRolesList(req, res, next) {
		try {
			await UserService.coachRolesList(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to get specializing roles ******/
	async specializingRolesList(req, res, next) {
		try {
			await UserService.specializingRolesList(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to get program types list ******/
	async programTypesList(req, res, next) {
		try {
			await UserService.programTypesList(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to get player profile details ******/
	async playersCompleteProfileDetails(req, res, next) {
		try {
			await UserService.playersCompleteProfileDetails(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to get player profile details by id ******/
	async playersCompleteProfileDetailsById(req, res, next) {
		try {
			await UserService.playersCompleteProfileDetailsById(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to get coach profile details ******/
	async coachesCompleteProfileDetails(req, res, next) {
		try {
			await UserService.coachesCompleteProfileDetails(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to get coach profile details by id ******/
	async coachesCompleteProfileDetailsById(req, res, next) {
		try {
			await UserService.coachesCompleteProfileDetailsById(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to get user photos list by id ******/
	async userPhotosListById(req, res, next) {
		try {
			await UserService.userPhotosListById(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to get news feeds list by id ******/
	async newsFeedsListById(req, res, next) {
		try {
			await UserService.newsFeedsListById(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to search players ******/
	async searchPlayers(req, res, next) {
		try {
			await UserService.searchPlayers(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to search coaches ******/
	async searchCoaches(req, res, next) {
		try {
			await UserService.searchCoaches(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to delete user photos ******/
	async deleteUserPhotos(req, res, next) {
		try {
			await UserService.deleteUserPhotos(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to get schools list ******/
	async schoolsList(req, res, next) {
		try {
			await UserService.schoolsList(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to get states list ******/
	async statesList(req, res, next) {
		try {
			await UserService.statesList(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to seacrh programs ******/
	async searchPrograms(req, res, next) {
		try {
			await UserService.searchPrograms(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to mark programs as favourite or unfavourite ******/
	async markProgramsAsFavouriteOrUnfavourite(req, res, next) {
		try {
			await UserService.markProgramsAsFavouriteOrUnfavourite(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to add rosters ******/
	async addRoster(req, res, next) {
		try {
			await UserService.addRoster(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to update rosters ******/
	async updateRoster(req, res, next) {
		try {
			await UserService.updateRoster(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to delete rosters ******/
	async deleteRoster(req, res, next) {
		try {
			await UserService.deleteRoster(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to get rosters list ******/
	async rostersList(req, res, next) {
		try {
			await UserService.rostersList(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to get rosters list by id ******/
	async rostersListByCoachId(req, res, next) {
		try {
			await UserService.rostersListByCoachId(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to add rosters ******/
	async rosterDetailsById(req, res, next) {
		try {
			await UserService.rosterDetailsById(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to get favourite programs list ******/
	async favouriteProgramsList(req, res, next) {
		try {
			await UserService.favouriteProgramsList(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to get favourite coaches list ******/
	async favouriteCoachesList(req, res, next) {
		try {
			await UserService.favouriteCoachesList(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to get favourite players list ******/
	async favouritePlayersList(req, res, next) {
		try {
			await UserService.favouritePlayersList(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to offer players ******/
	async offerPlayers(req, res, next) {
		try {
			await UserService.offerPlayers(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to get all offered players list ******/
	async allOfferedPlayersList(req, res, next) {
		try {
			await UserService.allOfferedPlayersList(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to get all offered players list by id ******/
	async allOfferedPlayersListById(req, res, next) {
		try {
			await UserService.allOfferedPlayersListById(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to get offered players list ******/
	async offeredPlayersList(req, res, next) {
		try {
			await UserService.offeredPlayersList(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to get players roster request list ******/
	async playersRosterRequestList(req, res, next) {
		try {
			await UserService.playersRosterRequestList(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to get committed players list ******/
	async committedPlayersList(req, res, next) {
		try {
			await UserService.committedPlayersList(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to get committed players list by id ******/
	async committedPlayersListById(req, res, next) {
		try {
			await UserService.committedPlayersListById(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to cancel offered players ******/
	async cancelOfferedPlayers(req, res, next) {
		try {
			await UserService.cancelOfferedPlayers(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to accept offered players ******/
	async acceptOrDeclinePlayersRosterRequest(req, res, next) {
		try {
			await UserService.acceptOrDeclinePlayersRosterRequest(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}


	/** ***** User Controller: Method to send roster request to coach ******/
	async rosterRequestToCoach(req, res, next) {
		try {
			await UserService.rosterRequestToCoach(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to get all received offers list ******/
	async allReceivedOffersList(req, res, next) {
		try {
			await UserService.allReceivedOffersList(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to get all received offers list by id ******/
	async allReceivedOffersListByID(req, res, next) {
		try {
			await UserService.allReceivedOffersListByID(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}


	/** ***** User Controller: Method to get received offers list ******/
	async receivedOffersList(req, res, next) {
		try {
			await UserService.receivedOffersList(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to get roster request list ******/
	async rosterRequestList(req, res, next) {
		try {
			await UserService.rosterRequestList(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to get committed roster request list ******/
	async committedRosterRequestList(req, res, next) {
		try {
			await UserService.committedRosterRequestList(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to get roster request list ******/
	async cancelRosterRequest(req, res, next) {
		try {
			await UserService.cancelRosterRequest(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to accept or decline roster request ******/
	async acceptOrDeclineOffers(req, res, next) {
		try {
			await UserService.acceptOrDeclineOffers(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to accept or decline roster request ******/
	async followUsers(req, res, next) {
		try {
			await UserService.followUsers(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to get followers list by id ******/
	async followersListById(req, res, next) {
		try {
			await UserService.followersListById(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to get following list by id ******/
	async followingListById(req, res, next) {
		try {
			await UserService.followingListById(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to get following and follower users list ******/
	async followingAndFollowerUsersList(req, res, next) {
		try {
			await UserService.followingAndFollowerUsersList(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to accept or decline follow request ******/
	async acceptOrDeclineFollowRequest(req, res, next) {
		try {
			await UserService.acceptOrDeclineFollowRequest(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to unfollow user ******/
	async unfollowUser(req, res, next) {
		try {
			await UserService.unfollowUser(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to get roster list by program id ******/
	async rostersListByProgramId(req, res, next) {
		try {
			await UserService.rostersListByProgramId(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to get program university profile ******/
	async programUniversityProfile(req, res, next) {
		try {
			await UserService.programUniversityProfile(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to invite assistant coach ******/
	async inviteAssistantCoach(req, res, next) {
		try {
			await UserService.inviteAssistantCoach(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to get all news feed list ******/
	async allNewsFeedsList(req, res, next) {
		try {
			await UserService.allNewsFeedsList(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to get all news feed list by role id ******/
	async allNewsFeedsListByRoleId(req, res, next) {
		try {
			await UserService.allNewsFeedsListByRoleId(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to get random match styles list by coach id ******/
	async randomMatchStylesListByCoachId(req, res, next) {
		try {
			await UserService.randomMatchStylesListByCoachId(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to get random match styles list by coach id ******/
	async randomMatchStylesListByPlayerId(req, res, next) {
		try {
			await UserService.randomMatchStylesListByPlayerId(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to swipe match styles ******/
	async swipeMatchStyles(req, res, next) {
		try {
			await UserService.swipeMatchStyles(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to get matched styles list ******/
	async matchedStylesList(req, res, next) {
		try {
			await UserService.matchedStylesList(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to unmatch profile ******/
	async unmatchProfile(req, res, next) {
		try {
			await UserService.unmatchProfile(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to add view profiles activity in news feeds ******/
	async viewProfileActivity(req, res, next) {
		try {
			await UserService.viewProfileActivity(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to get all activity in news feeds ******/
	async allActivityNewsFeedsList(req, res, next) {
		try {
			await UserService.allActivityNewsFeedsList(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to upload user video reels ******/
	async uploadUserVideoReels(req, res, next) {
		try {
			await UserService.uploadUserVideoReels(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to get user video reels by id ******/
	async userVideoReelsById(req, res, next) {
		try {
			await UserService.userVideoReelsById(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to add views on video reels by id ******/
	async addViewsOnVideoReels(req, res, next) {
		try {
			await UserService.addViewsOnVideoReels(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to add share counts on video reels by id ******/
	async addShareCountsOnVideoReels(req, res, next) {
		try {
			await UserService.addShareCountsOnVideoReels(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to get video reels list by user id ******/
	async userVideoReelsListByUserId(req, res, next) {
		try {
			await UserService.userVideoReelsListByUserId(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to get following users video reels ******/
	async followingUsersVideoReelsList(req, res, next) {
		try {
			await UserService.followingUsersVideoReelsList(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to get trending video reels ******/
	async trendingVideoReelsList(req, res, next) {
		try {
			await UserService.trendingVideoReelsList(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to like or unlike video reels ******/
	async likeOrUnlikeVideoReels(req, res, next) {
		try {
			await UserService.likeOrUnlikeVideoReels(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to report video reels ******/
	async reportVideoReels(req, res, next) {
		try {
			await UserService.reportVideoReels(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to update video reels ******/
	async updateUserVideoReels(req, res, next) {
		try {
			await UserService.updateUserVideoReels(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to delete video reels ******/
	async deleteVideoReels(req, res, next) {
		try {
			await UserService.deleteVideoReels(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to report news feeds ******/
	async reportNewsFeeds(req, res, next) {
		try {
			await UserService.reportNewsFeeds(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to request for user account deletion ******/
	async requestUserAccountDeletion(req, res, next) {
		try {
			await UserService.requestUserAccountDeletion(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to get notifications list ******/
	async notificationsList(req, res, next) {
		try {
			await UserService.notificationsList(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to mark notifications as read ******/
	async markNotificationsAsRead(req, res, next) {
		try {
			await UserService.markNotificationsAsRead(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to get not following users list by coach id ******/
	async notFollowingListByCoachId(req, res, next) {
		try {
			await UserService.notFollowingListByCoachId(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to get not following users list by player id ******/
	async notFollowingListByPlayerId(req, res, next) {
		try {
			await UserService.notFollowingListByPlayerId(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to get all players roster request list ******/
	async allPlayersRosterRequestList(req, res, next) {
		try {
			await UserService.allPlayersRosterRequestList(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to search users by role id ******/
	async searchUsersByRoleId(req, res, next) {
		try {
			await UserService.searchUsersByRoleId(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to get all video news feeds list ******/
	async allVideoNewsFeedsList(req, res, next) {
		try {
			await UserService.allVideoNewsFeedsList(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to get official roaster list list by role id ******/
	async officialRosterListByRoleId(req, res, next) {
		try {
			await UserService.officialRosterListByRoleId(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to get committed players list list by role id ******/
	async committedPlayersListByRoleId(req, res, next) {
		try {
			await UserService.committedPlayersListByRoleId(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to get top players list by coach id ******/
	async topPlayersByCoachId(req, res, next) {
		try {
			await UserService.topPlayersByCoachId(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to get top coaches list by player id ******/
	async topCoachesByPlayerId(req, res, next) {
		try {
			await UserService.topCoachesByPlayerId(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

	/** ***** User Controller: Method to send chat notification ******/
	async sendChatNotifications(req, res, next) {
		try {
			await UserService.sendChatNotifications(req, res, next);
		} catch (error) {
			return res.status(500).json({status: false, message: error.message});
		}
	}

}

module.exports = new UserController();
