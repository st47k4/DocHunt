/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import { controllers } from '#generated/controllers'
import router from '@adonisjs/core/services/router'

const HomeController = () => import('#controllers/home_controller')

// Root → redirect to browser preferred language
router.get('/', [HomeController, 'root']).as('home')

const LOCALE_REGEX = /^(en|fr|es|de|pt|ar|zh|ja|hi)$/

// Locale routes: /en  /fr  /es  /de  /pt
router.get('/:locale', [HomeController, 'index']).where('locale', LOCALE_REGEX).as('home.locale')

// Sub-pages
router
  .get('/:locale/demo', [HomeController, 'demo'])
  .where('locale', LOCALE_REGEX)
  .as('demo.locale')
router.get('/:locale/faq', [HomeController, 'faq']).where('locale', LOCALE_REGEX).as('faq.locale')

router
  .group(() => {
    router.get('signup', [controllers.NewAccount, 'create'])
    router.post('signup', [controllers.NewAccount, 'store'])

    router.get('login', [controllers.Session, 'create'])
    router.post('login', [controllers.Session, 'store'])
  })
  .use(middleware.guest())

router
  .group(() => {
    router.post('logout', [controllers.Session, 'destroy'])
  })
  .use(middleware.auth())
