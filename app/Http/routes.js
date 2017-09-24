'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

Route.route('/processes', 'HEAD', 'ProcessesController.headList')
Route.route('/processes', 'GET', 'ProcessesController.headList')

// Route.get('/', 'ListController.show')
// Route.get('/login', 'AuthController.index')
// Route.post('/login', 'AuthController.login')

// Route.get('/register', 'RegisterController.index')
// Route.post('register', 'RegisterController.doRegister')


// Route.put('/api/:resource', 'CrudController.update') //optional 
// Route.get('/api/:resource/grid', 'CrudController.grid') //the grid configurations for the list grid view 
// Route.get('/api/:resource/form', 'CrudController.form') //the form configurations for create 
// Route.get('/api/:resource/:id/form', 'CrudController.form') // the form configurations for edit 
// Route.resource('/api/:resource', 'CrudController') //CRUD for resources 
// Route.resource('/api/:parent/:parentId/:resource', 'CrudController') //CRUD for netsted resource (In Progress...) 