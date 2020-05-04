/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.get('/health', async ({response}) => {
  const report = await HealthCheck.getReport()
  return report.healthy ? response.ok(report) : response.badRequest(report)
})

// Public Routes
Route.group(() => {
  Route.post('register', 'SessionsController.register')
  Route.post('login', 'SessionsController.login')
}).prefix('auth')

Route.group(() => {
  Route.resource('clients', 'ClientsController').apiOnly()
  Route.resource('clients.telephones', 'TelephonesController').apiOnly()
}).middleware(['checkJwt'])
