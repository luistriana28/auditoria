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

Route.on('/').render('welcome')
Route.on('/dashboard').render('templates.dashboard')
Route.on('/register').render('register')
Route.on('/empresas').render('empresas')
Route.on('/auditor').render('auditor')
Route.on('/departamentos').render('departamentos')


//Route.on('/dashboard').render('templates.opciones') ejercico de ruta

Route.post('/login', 'LoginController.login')
Route.get('/logout', 'LoginController.logout')
Route.post('/reg', 'LoginController.reg')

// Rutas especificas para la gestion de las empresas
Route.post('/savebusiness', 'BusinessController.save')
Route.post('/getAllBusiness', 'BusinessController.getAllBusiness')
Route.post('/updateBusiness', 'BusinessController.update')
Route.post('/inactivebusiness', 'BusinessController.inactive')

Route.post('/saveauditoria', 'auditoriaController.save')
Route.post('/getAllAuditoria', 'auditoriaController.getAllAuditoria')
Route.post('/updateaudits', 'auditoriaController.update')
Route.post('/inactiveaudits', 'auditoriaController.inactive')

Route.post('/savedepartamento', 'departamentoController.save')
Route.post('/getAllDepartamento', 'departamentoController.getAllDepartamento')
Route.post('/updatedepartments', 'departamentoController.update')
Route.post('/inactivedepartments', 'departamentoController.inactive')