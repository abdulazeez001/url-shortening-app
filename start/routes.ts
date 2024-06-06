/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const UsersController = () => import('#controllers/users_controller')
const LinksController = () => import('#controllers/links_controller')

router.get(':url', [LinksController, 'getLink'])

router
  .group(() => {
    router.post('register', [UsersController, 'register'])
    router.post('login', [UsersController, 'login'])
    router.post('logout', [UsersController, 'logout']).use(middleware.auth())
  })
  .prefix('api/user')

router
  .group(() => {
    router.get('', [LinksController, 'getLinks']).use(middleware.auth())
    router.post('shortener', [LinksController, 'shortner']).use(middleware.auth())
  })
  .prefix('api/links')
