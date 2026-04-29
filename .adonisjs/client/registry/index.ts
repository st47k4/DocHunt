/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'analyze.pdf': {
    methods: ["POST"],
    pattern: '/api/analyze/pdf',
    tokens: [{"old":"/api/analyze/pdf","type":0,"val":"api","end":""},{"old":"/api/analyze/pdf","type":0,"val":"analyze","end":""},{"old":"/api/analyze/pdf","type":0,"val":"pdf","end":""}],
    types: placeholder as Registry['analyze.pdf']['types'],
  },
  'analyze.image': {
    methods: ["POST"],
    pattern: '/api/analyze/image',
    tokens: [{"old":"/api/analyze/image","type":0,"val":"api","end":""},{"old":"/api/analyze/image","type":0,"val":"analyze","end":""},{"old":"/api/analyze/image","type":0,"val":"image","end":""}],
    types: placeholder as Registry['analyze.image']['types'],
  },
  'analyze.office': {
    methods: ["POST"],
    pattern: '/api/analyze/office',
    tokens: [{"old":"/api/analyze/office","type":0,"val":"api","end":""},{"old":"/api/analyze/office","type":0,"val":"analyze","end":""},{"old":"/api/analyze/office","type":0,"val":"office","end":""}],
    types: placeholder as Registry['analyze.office']['types'],
  },
  'stats': {
    methods: ["GET","HEAD"],
    pattern: '/api/stats',
    tokens: [{"old":"/api/stats","type":0,"val":"api","end":""},{"old":"/api/stats","type":0,"val":"stats","end":""}],
    types: placeholder as Registry['stats']['types'],
  },
  'home': {
    methods: ["GET","HEAD"],
    pattern: '/',
    tokens: [{"old":"/","type":0,"val":"/","end":""}],
    types: placeholder as Registry['home']['types'],
  },
  'home.locale': {
    methods: ["GET","HEAD"],
    pattern: '/:locale',
    tokens: [{"old":"/:locale","type":1,"val":"locale","end":""}],
    types: placeholder as Registry['home.locale']['types'],
  },
  'demo.locale': {
    methods: ["GET","HEAD"],
    pattern: '/:locale/demo',
    tokens: [{"old":"/:locale/demo","type":1,"val":"locale","end":""},{"old":"/:locale/demo","type":0,"val":"demo","end":""}],
    types: placeholder as Registry['demo.locale']['types'],
  },
  'faq.locale': {
    methods: ["GET","HEAD"],
    pattern: '/:locale/faq',
    tokens: [{"old":"/:locale/faq","type":1,"val":"locale","end":""},{"old":"/:locale/faq","type":0,"val":"faq","end":""}],
    types: placeholder as Registry['faq.locale']['types'],
  },
  'community.locale': {
    methods: ["GET","HEAD"],
    pattern: '/:locale/community',
    tokens: [{"old":"/:locale/community","type":1,"val":"locale","end":""},{"old":"/:locale/community","type":0,"val":"community","end":""}],
    types: placeholder as Registry['community.locale']['types'],
  },
  'privacy.locale': {
    methods: ["GET","HEAD"],
    pattern: '/:locale/privacy',
    tokens: [{"old":"/:locale/privacy","type":1,"val":"locale","end":""},{"old":"/:locale/privacy","type":0,"val":"privacy","end":""}],
    types: placeholder as Registry['privacy.locale']['types'],
  },
  'terms.locale': {
    methods: ["GET","HEAD"],
    pattern: '/:locale/terms',
    tokens: [{"old":"/:locale/terms","type":1,"val":"locale","end":""},{"old":"/:locale/terms","type":0,"val":"terms","end":""}],
    types: placeholder as Registry['terms.locale']['types'],
  },
  'new_account.create': {
    methods: ["GET","HEAD"],
    pattern: '/signup',
    tokens: [{"old":"/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['new_account.create']['types'],
  },
  'new_account.store': {
    methods: ["POST"],
    pattern: '/signup',
    tokens: [{"old":"/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['new_account.store']['types'],
  },
  'session.create': {
    methods: ["GET","HEAD"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['session.create']['types'],
  },
  'session.store': {
    methods: ["POST"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['session.store']['types'],
  },
  'session.destroy': {
    methods: ["POST"],
    pattern: '/logout',
    tokens: [{"old":"/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['session.destroy']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
