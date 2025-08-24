const express = require('express');
const router = express.Router();
const {AdminController} = require('../controller/index');
const {AdminDataValidator} = require('../middleware/dataValidator/index');

router.get('/profile',
/* #swagger.description = 'Admin profile API'
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
 #swagger.responses[400] = {
  description: 'Validation error'
 }
*/
	AdminController.getAdminProfileInfo);

router.get('/get_roles_list',
/* #swagger.description = 'Get roles list API'
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
 #swagger.responses[400] = {
  description: 'Validation error'
 }
*/
	AdminController.getRolesList);

router.post(
	'/create_users',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'Create users API',
    schema: {
        $firstName: 'myName'
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
	AdminDataValidator.createUsers, AdminController.createUsers,
);

router.get(
	'/users_list',
	/* #swagger.description = 'Users list API'
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
	AdminController.usersList,
);

router.get(
	'/active_users_list',
	/* #swagger.description = 'Active users list API'
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
	AdminController.activeUsersList,
);

router.get(
	'/users_list_by_id/:id',
	/* #swagger.description = 'Users list by ID API'
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
	AdminController.usersListById,
);

router.put(
	'/update_users',
	/* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'Update users API',
    schema: {
        $firstName: 'myName'
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
	AdminController.updateUsers,
);

router.delete(
	'/delete_users/:id',
	/* #swagger.description = 'Delete users API'
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
	AdminController.deleteUsers,
);

module.exports = router;
