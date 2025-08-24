const express = require('express');
const router = express.Router();
const {UserController} = require('../controller/index');
const {UserDataValidator} = require('../middleware/dataValidator/index');

router.get(
	'/profile',
	/* #swagger.description = 'User profile API'
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.getUserProfileInfo,
);

router.put(
	'/update_profile',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'Update user profile info API',
    schema: {
        $primaryGoalId: 1
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.updateUserProfileInfo,
);

router.put(
	'/complete_registration',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'Complete users registration API',
    schema: {
        $primaryGoalId: 1
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.completeRegistration,
);

router.put(
	'/reset_password',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'Reset password API',
    schema: {
        $password: Demo@123
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.resetPassword,
);

router.post(
	'/upload_profile_picture',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'Upload profile picture',
    schema: {
        $file: ''
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.uploadProfilePicture,
);

router.get(
	'/user_kyc_details',
	/* #swagger.description = 'Users KYC details'
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.userKycDetails,
);

router.post(
	'/upload_selfie',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'Upload selfie',
    schema: {
        $file: ''
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.uploadSelfie,
);

router.post(
	'/upload_id_card',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'Upload ID card',
    schema: {
      $front: ''
      $back: ''
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.uploadIdCard,
);

router.post(
	'/upload_driving_license',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'Upload driving license',
    schema: {
      $front: ''
      $back: ''
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.uploadDrivingLicense,
);

router.post(
	'/upload_passport',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'Upload passport',
    schema: {
      $front: ''
      $back: ''
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.uploadPassport,
);

router.get(
	'/user_photos_list',
	/* #swagger.description = 'User photos list'
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.userPhotosList,
);

router.post(
	'/upload_user_photos',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'Upload user photos',
    schema: {
      $photos: [
        {"photosUrl": "https://demo.com/demo1.png"},
        {"photosUrl":"https://demo.com/demo2.png"},
        {"photosUrl": "https://demo.com/demo3.png"}
    ]
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.uploadUserPhotos,
);

router.get(
	'/favourite_players_coaches_list',
	/* #swagger.description = 'Favourite users list'
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.userPhotosList,
);

router.post(
	'/mark_user_as_favourite',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'Upload user photos',
    schema: {
      $playerOrCoachId: 1
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.markUserAsFavourite,
);

router.post(
	'/unmark_user_as_favourite',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'Upload user photos',
    schema: {
      $playerOrCoachId: 1
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.unmarkUserAsFavourite,
);

router.put(
	'/update_player_personal_information',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'update personal information',
    schema: {
      $school: 'demo',
      $graduation: 'class of 2024'
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.updatePlayerPersonalInformation,
);

router.put(
	'/update_player_stats',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'update sports data',
    schema: {
      $sports: 'Basketball',
      $position: 'Shooting Guard'
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.updatePlayerStats,
);

router.put(
	'/update_player_personality_details',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'update personality details',
    schema: {
      $sports: 'Basketball',
      $position: 'Shooting Guard'
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.updatePlayerPersonalityDetails,
);

router.put(
	'/update_players_coach_information',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'update players coach information',
    schema: {
      $address: '123 demo address',
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.updatePlayersCoachInformation,
);

router.put(
	'/update_player_guardian_details',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'update players guardian details',
    schema: {
      $address: '123 demo address',
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.updatePlayerGuardianDetails,
);

router.get(
	'/player_personal_information',
	/* #swagger.description = 'Personal informations'
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.playerPersonalInformation,
);

router.get(
	'/player_stats',
	/* #swagger.description = 'Sports data'
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.playerStats,
);

router.get(
	'/player_personality_questions',
	/* #swagger.description = 'Personality questions'
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.playerPersonalityQuestions,
);

router.get(
	'/player_personality_details',
	/* #swagger.description = 'Personality details'
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.playerPersonalityDetails,
);

router.get(
	'/players_coach_information',
	/* #swagger.description = 'Address'
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.playersCoachInformation,
);

router.get(
	'/player_guardian_details',
	/* #swagger.description = 'Address'
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.playerGuardianDetails,
);

router.get(
	'/news_feeds_list',
	/* #swagger.description = 'News feeds list'
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.newsFeedsList,
);

router.post(
	'/create_news_feeds',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to create news feeds',
    schema: {
      $content: 'Demo content'
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.createNewsFeeds,
);

router.put(
	'/update_news_feeds',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to create news feeds',
    schema: {
      $content: 'Demo content'
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.updateNewsFeeds,
);

router.delete(
	'/delete_news_feeds',
	/* #swagger.description = 'API to delete news feeds'
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.deleteNewsFeeds,
);

router.get(
	'/coach_personal_information',
	/* #swagger.description = 'Coach Personal informations'
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.coachPersonalInformation,
);

router.put(
	'/update_coach_personal_information',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to add/update coach personal information',
    schema: {
      $content: 'Demo content'
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.updateCoachPersonalInformation,
);

router.get(
	'/coach_coaching_details',
	/* #swagger.description = 'Coach Coaching Details'
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.coachCoachingDetails,
);

router.put(
	'/update_coach_coaching_details',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to add/update coach personal information',
    schema: {
      $content: 'Demo content'
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.updateCoachCoachingDetails,
);

router.get(
	'/coach_previous_teams',
	/* #swagger.description = 'Coach Previous Teams'
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.coachPreviousTeams,
);

router.put(
	'/update_coach_previous_teams',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to add/update coach personal information',
    schema: {
      $content: 'Demo content'
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.updateCoachPreviousTeams,
);

router.get(
	'/coach_career_tables',
	/* #swagger.description = 'Coach Career Tables'
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.coachCareerTables,
);

router.put(
	'/update_coach_career_tables',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to add/update coach personal information',
    schema: {
      $content: 'Demo content'
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.updateCoachCareerTables,
);

router.get(
	'/coach_playing_histories',
	/* #swagger.description = 'Coach playing history'
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.coachPlayingHistories,
);

router.put(
	'/update_coach_playing_histories',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to add/update coach playing history',
    schema: {
      $content: 'Demo content'
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.updateCoachPlayingHistories,
);

router.put(
	'/mark_kyc_as_complete',
	/* #swagger.description = 'Mark KYC as complete'
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.markKycAsComplete,
);

router.post(
	'/mark_news_feed_as_favourite',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to mark news feeds as favourite',
    schema: {
      $feedId: 1
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.markNewsFeedAsFavourite,
);

router.post(
	'/unmark_news_feed_as_favourite',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to unmark news feeds as favourite',
    schema: {
      $feedId: 1
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.unmarkNewsFeedAsFavourite,
);

router.get(
	'/guardians_list',
	/* #swagger.description = 'Guardians List'
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.guardiansList,
);

router.get(
	'/coach_roles_list',
	/* #swagger.description = 'Coach Roles List'
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.coachRolesList,
);

router.get(
	'/specializing_roles_list',
	/* #swagger.description = 'Specializing Roles List'
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.specializingRolesList,
);

router.get(
	'/program_types_list',
	/* #swagger.description = 'Specializing Roles List'
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.programTypesList,
);

router.get(
	'/players_complete_profile_details',
	/* #swagger.description = 'Players complete profile details API'
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.playersCompleteProfileDetails,
);

router.get(
	'/players_complete_profile_details_by_id/:id',
	/* #swagger.description = 'Players complete profile details by ID API'
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.playersCompleteProfileDetailsById,
);

router.get(
	'/coaches_complete_profile_details',
	/* #swagger.description = 'Coaches complete profile details API'
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.coachesCompleteProfileDetails,
);

router.get(
	'/coaches_complete_profile_details_by_id/:id',
	/* #swagger.description = 'Players complete profile details by ID API'
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.coachesCompleteProfileDetailsById,
);

router.get(
	'/user_photos_list_by_id/:id',
	/* #swagger.description = 'User photos list by id API'
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.userPhotosListById,
);

router.get(
	'/news_feeds_list_by_id/:id',
	/* #swagger.description = 'News feeds list by ID API'
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.newsFeedsListById,
);

router.post(
	'/search_players',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to search players',
    schema: {
      $firstname: 1
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.searchPlayers,
);

router.post(
	'/search_coaches',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to search coaches',
    schema: {
      $firstname: 1
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.searchCoaches,
);

router.delete(
	'/delete_user_photos/:id',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to delete user photos',
    schema: {
      $feedId: 1
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.deleteUserPhotos,
);

router.get(
	'/schools_list',
	/* #swagger.description = 'Schools list API'
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.schoolsList,
);

router.get(
	'/states_list',
	/* #swagger.description = 'States list API'
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.statesList,
);

router.post(
	'/search_programs',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to search programs',
    schema: {
      $firstname: 1
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.searchPrograms,
);

router.post(
	'/mark_programs_as_favourite_or_unfavourite',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to mark programs as favourite',
    schema: {
      $firstname: 1
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.markProgramsAsFavouriteOrUnfavourite,
);

router.post(
	'/add_roster',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to add rosters',
    schema: {
      $firstname: 1
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.addRoster,
);

router.put(
	'/update_roster',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to update rosters',
    schema: {
      $firstname: 1
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.updateRoster,
);

router.delete(
	'/delete_roster/:id',
	/* #swagger.description = 'API to delete roster'
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.deleteRoster,
);

router.get(
	'/rosters_list',
	/* #swagger.description = 'Rosters list API'
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.rostersList,
);

router.get(
	'/rosters_list_by_coach_id/:id',
	/* #swagger.description = 'Rosters list by coach ID API'
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.rostersListByCoachId,
);

router.get(
	'/roster_details_by_id/:id',
	/* #swagger.description = 'Rosters details by ID API'
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.rosterDetailsById,
);

router.post(
	'/favourite_programs_list',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to get favourite programs list',
    schema: {
      $limit: 10,
      $offset: 0
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.favouriteProgramsList,
);

router.post(
	'/favourite_coaches_list',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to get favourite coaches list',
    schema: {
      $limit: 10,
      $offset: 0
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.favouriteCoachesList,
);

router.post(
	'/favourite_players_list',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to get favourite players list',
    schema: {
      $limit: 10,
      $offset: 0
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.favouritePlayersList,
);

router.post(
	'/offer_players',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to offer players',
    schema: {
      $limit: 10,
      $offset: 0
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.offerPlayers,
);

router.get(
	'/all_offered_players_list',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to get all offered players list',
    schema: {
      $limit: 10,
      $offset: 0
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.allOfferedPlayersList,
);

router.get(
	'/all_offered_players_list_by_id/:coachId',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to get all offered players list',
    schema: {
      $limit: 10,
      $offset: 0
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.allOfferedPlayersListById,
);

router.post(
	'/offered_players_list',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to offered players list',
    schema: {
      $limit: 10,
      $offset: 0
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.offeredPlayersList,
);

router.post(
	'/players_roster_request_list',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to get players roster request list',
    schema: {
      $limit: 10,
      $offset: 0
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.playersRosterRequestList,
);

router.get(
	'/committed_players_list',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to get all committed players list',
    schema: {
      $limit: 10,
      $offset: 0
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.committedPlayersList,
);

router.get(
	'/committed_players_list_by_id/:coachId',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to get all committed players list by id',
    schema: {
      $limit: 10,
      $offset: 0
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.committedPlayersListById,
);

router.put(
	'/cancel_offered_players/:userId',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to cancel offered players',
    schema: {
      $limit: 10,
      $offset: 0
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.cancelOfferedPlayers,
);

router.put(
	'/accept_or_decline_players_roster_request',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to accept or decline offered players',
    schema: {
      $limit: 10,
      $offset: 0
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.acceptOrDeclinePlayersRosterRequest,
);

router.post(
	'/roster_request_to_coach',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to offered players list',
    schema: {
      $limit: 10,
      $offset: 0
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.rosterRequestToCoach,
);

router.get(
	'/all_received_offers_list',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to get all roster requests list',
    schema: {
      $limit: 10,
      $offset: 0
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.allReceivedOffersList,
);

router.get(
	'/all_received_offers_list_by_id/:userId',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to get all roster requests list',
    schema: {
      $limit: 10,
      $offset: 0
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.allReceivedOffersListByID,
);

router.post(
	'/received_offers_list',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to get received offers list',
    schema: {
      $limit: 10,
      $offset: 0
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.receivedOffersList,
);

router.get(
	'/committed_roster_request_list',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to get committed roster requests list',
    schema: {
      $limit: 10,
      $offset: 0
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.committedRosterRequestList,
);

router.put(
	'/cancel_roster_request/:userId',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to cancel roster request',
    schema: {
      $limit: 10,
      $offset: 0
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.cancelRosterRequest,
);

router.put(
	'/accept_or_decline_offers',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to accept or decline offered players',
    schema: {
      $limit: 10,
      $offset: 0
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.acceptOrDeclineOffers,
);

router.post(
	'/follow_users',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to follow users',
    schema: {
      $limit: 10,
      $offset: 0
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.followUsers,
);

router.post(
	'/followers_list_by_id',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to get all followers list by id',
    schema: {
      $limit: 10,
      $offset: 0
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.followersListById,
);

router.post(
	'/following_list_by_id',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to get all following list by id',
    schema: {
      $limit: 10,
      $offset: 0
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.followingListById,
);

router.post(
	'/following_and_follower_users_list',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to get all following list by id',
    schema: {
      $limit: 10,
      $offset: 0
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.followingAndFollowerUsersList,
);

router.post(
	'/accept_or_decline_follow_request',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to accept or decline follow request',
    schema: {
      $limit: 10,
      $offset: 0
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.acceptOrDeclineFollowRequest,
);

router.post(
	'/unfollow_users',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to unfollow users',
    schema: {
      $userId: 10,
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.unfollowUser,
);

router.get(
	'/rosters_list_by_program_id/:programId',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to get rosters list by program id',
    schema: {
      $limit: 10,
      $offset: 0
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.rostersListByProgramId,
);

router.get(
	'/program_university_profile/:id',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to get program university profile',
    schema: {
      $limit: 10,
      $offset: 0
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.programUniversityProfile,
);

router.post(
	'/invite_assistant_coach',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to invite assistant coach',
    schema: {
      $limit: 10,
      $offset: 0
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.inviteAssistantCoach,
);

router.post(
	'/all_news_feeds_list',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to get all news feeds list',
    schema: {
      $limit: 10,
      $offset: 0
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.allNewsFeedsList,
);

router.post(
	'/all_news_feeds_list_by_role_id',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to get all news feeds list by id',
    schema: {
      $limit: 10,
      $offset: 0
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.allNewsFeedsListByRoleId,
);

router.post(
	'/random_match_styles_list_by_coach_id',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to get random match styles by coach id',
    schema: {
      $limit: 10,
      $offset: 0
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.randomMatchStylesListByCoachId,
);

router.post(
	'/random_match_styles_list_by_player_id',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to get random match styles by player id',
    schema: {
      $limit: 10,
      $offset: 0
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.randomMatchStylesListByPlayerId,
);

router.post(
	'/swipe_match_styles',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to swipe match styles',
    schema: {
      $limit: 10,
      $offset: 0
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.swipeMatchStyles,
);

router.post(
	'/matched_styles_list',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to get matched styles list',
    schema: {
      $limit: 10,
      $offset: 0
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.matchedStylesList,
);

router.post(
	'/unmatch_profile',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to unmatch profile',
    schema: {
      $limit: 10,
      $offset: 0
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.unmatchProfile,
);

router.post(
	'/view_profile_activity',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to add view profile activity in news feeds',
    schema: {
      $userId: 10
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.viewProfileActivity,
);

router.post(
	'/all_activity_news_feeds_list',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to get all activity in news feeds',
    schema: {
      $userId: 10
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.allActivityNewsFeedsList,
);

router.post(
	'/upload_user_video_reels',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to upload user video reels',
    schema: {
      $userId: 10
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.uploadUserVideoReels,
);

router.get(
	'/user_video_reels_by_id/:id',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to get user video reels by id',
    schema: {
      $limit: 10,
      $offset: 0
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.userVideoReelsById,
);

router.put(
	'/add_views_on_video_reels/:id',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to add views on video reels',
    schema: {
      $userId: 10
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.addViewsOnVideoReels,
);

router.put(
	'/add_share_counts_on_video_reels/:id',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to add views on video reels',
    schema: {
      $userId: 10
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.addShareCountsOnVideoReels,
);

router.post(
	'/user_video_reels_list_by_user_id',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to get video reels list by user ID',
    schema: {
      $userId: 10
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.userVideoReelsListByUserId,
);

router.post(
	'/following_users_video_reels_list',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to get following users video reels list',
    schema: {
      $userId: 10
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.followingUsersVideoReelsList,
);

router.post(
	'/trending_video_reels_list',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to get trending video reels list',
    schema: {
      $userId: 10
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.trendingVideoReelsList,
);

router.post(
	'/like_or_unlike_video_reels',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to like or unlike video reels list',
    schema: {
      $userId: 10
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.likeOrUnlikeVideoReels,
);

router.post(
	'/report_video_reels',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to report video reels',
    schema: {
      $userId: 10
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.reportVideoReels,
);

router.post(
	'/update_user_video_reels',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to update video reels',
    schema: {
      $userId: 10
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.updateUserVideoReels,
);

router.delete(
	'/delete_video_reels',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to delete video reels',
    schema: {
      $userId: 10
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.deleteVideoReels,
);

router.post(
	'/report_news_feeds',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to report news feeds',
    schema: {
      $userId: 10
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.reportNewsFeeds,
);

router.delete(
	'/request_user_account_deletion',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to request for user account deletion',
    schema: {
      $userId: 10
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.requestUserAccountDeletion,
);

router.post(
	'/notifications_list',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to get notifications list',
    schema: {
      $limit: 10,
      $offset: 0
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.notificationsList,
);

router.post(
	'/mark_notifications_as_read',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to mark notifications as read',
    schema: {
      $notificationId: 10,
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.markNotificationsAsRead,
);

router.post(
	'/not_following_list_by_coach_id',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to get not following users list by coach id',
    schema: {
      $notificationId: 10,
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.notFollowingListByCoachId,
);

router.post(
	'/not_following_list_by_player_id',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to get not following users list by player id',
    schema: {
      $notificationId: 10,
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.notFollowingListByPlayerId,
);

router.post(
	'/all_players_roster_request_list',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to get all players roster request list',
    schema: {
      $notificationId: 10,
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.allPlayersRosterRequestList,
);

router.post(
	'/all_video_news_feeds_list',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to get all video news feeds list',
    schema: {
      $notificationId: 10,
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.allVideoNewsFeedsList,
);

router.get(
	'/official_roster_list_by_role_id',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to get all video news feeds list',
    schema: {
      $notificationId: 10,
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.officialRosterListByRoleId,
);

router.get(
	'/committed_players_list_by_role_id',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to get all video news feeds list',
    schema: {
      $notificationId: 10,
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.committedPlayersListByRoleId,
);

router.get(
	'/top_players_by_coach_id',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to get all video news feeds list',
    schema: {
      $notificationId: 10,
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.topPlayersByCoachId,
);

router.get(
	'/top_coaches_by_player_id',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to get top coaches list',
    schema: {
      $notificationId: 10,
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.topCoachesByPlayerId,
);

router.post(
	'/send_chat_notifications',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to get top coaches list',
    schema: {
      $notificationId: 10,
    }
}
#swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Bearer token for authentication',
      required: true,
      type: 'string'
}
#swagger.parameters['x-api-key'] = {
      in: 'header',
      description: 'X-API key is required',
      required: true,
      type: 'string',
}
#swagger.parameters['platform'] = {
      in: 'header',
      description: 'Platform is required',
      required: true,
      type: 'string',
}
#swagger.responses[200] = {
  description: 'Success'
 }
 #swagger.responses[500] = {
  description: 'Internal server error'
 }
 #swagger.responses[404] = {
  description: 'Not found'
 }
*/
	UserController.sendChatNotifications,
);


module.exports = router;
