'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('/register','UserController.register')
Route.post('/login','UserController.login')
Route.get('/role-user-dropdown','RoleUserController.index')
Route.group(()=>{
    Route.get('/','HomeController.index')
    Route.post('/order','OrderController.store')
    Route.get('/admin','FoodServerController.index')
    Route.post('/:state','FoodServerController.approval')
}).middleware(['auth:jwt'])
