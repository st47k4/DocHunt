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
const AnalyzeController = () => import('#controllers/analyze_controller')
const StatsController = () => import('#controllers/stats_controller')

// Analyse — proxys sécurisés vers le micro-service Python
router.post('/api/analyze/pdf', [AnalyzeController, 'handlePdf']).as('analyze.pdf')
router.post('/api/analyze/image', [AnalyzeController, 'handleImage']).as('analyze.image')
router.post('/api/analyze/office', [AnalyzeController, 'handleOffice']).as('analyze.office')

// Stats
router.get('/api/stats', [StatsController, 'index']).as('stats')

// Root → redirect to browser preferred language
router.get('/', [HomeController, 'root']).as('home')

const LOCALE_REGEX = /^(en|fr|es|de)$/

// Locale routes: /en  /fr  /es  /de
router.get('/:locale', [HomeController, 'index']).where('locale', LOCALE_REGEX).as('home.locale')

// Sub-pages
router
  .get('/:locale/demo', [HomeController, 'demo'])
  .where('locale', LOCALE_REGEX)
  .as('demo.locale')
router.get('/:locale/faq', [HomeController, 'faq']).where('locale', LOCALE_REGEX).as('faq.locale')
router
  .get('/:locale/community', [HomeController, 'community'])
  .where('locale', LOCALE_REGEX)
  .as('community.locale')
router
  .get('/:locale/privacy', [HomeController, 'privacy'])
  .where('locale', LOCALE_REGEX)
  .as('privacy.locale')
router
  .get('/:locale/terms', [HomeController, 'terms'])
  .where('locale', LOCALE_REGEX)
  .as('terms.locale')

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
