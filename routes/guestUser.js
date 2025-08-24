const express = require('express');
const router = express.Router();
const {GuestUserController} = require('../controller/index');

router.post(
	'/search_users_by_role_id',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to search users by role id',
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
	GuestUserController.searchUsersByRoleId,
);

router.post(
	'/search_programs_list',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to search programs list',
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
	GuestUserController.searchProgramsList,
);

router.post(
	'/news_feeds_by_role_id',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to get news feeds list by role id',
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
	GuestUserController.newsFeedsByRoleId,
);

router.post(
	'/users_video_reels_by_role_id',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to get users video reels by role id',
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
	GuestUserController.usersVideoReelsByRoleId,
);

router.post(
	'/official_rosters_list_by_program_id',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to get official rosters list by program id',
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
	GuestUserController.officialRostersListByProgramId,
);

router.post(
	'/committed_players_list_by_program_id',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to get committed players list by program id',
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
	GuestUserController.committedPlayersListByProgramId,
);

router.post(
	'/guest_recruiting_news_feeds_list_by_role_id',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to get committed players list by program id',
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
	GuestUserController.guestRecruitingNewsFeedsListByRoleId,
);

router.post(
	'/guest_match_styles_list_by_role_id',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to get committed players list by program id',
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
	GuestUserController.guestMatchStylesListByRoleId,
);

router.post(
	'/guest_top_users_list_by_role_id',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'API to get top users by role id',
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
	GuestUserController.guestTopUsersListByRoleId,
);


module.exports = router;
