/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  analyze: {
    pdf: typeof routes['analyze.pdf']
    image: typeof routes['analyze.image']
  }
  stats: typeof routes['stats']
  home: typeof routes['home'] & {
    locale: typeof routes['home.locale']
  }
  demo: {
    locale: typeof routes['demo.locale']
  }
  faq: {
    locale: typeof routes['faq.locale']
  }
  community: {
    locale: typeof routes['community.locale']
  }
  privacy: {
    locale: typeof routes['privacy.locale']
  }
  terms: {
    locale: typeof routes['terms.locale']
  }
  newAccount: {
    create: typeof routes['new_account.create']
    store: typeof routes['new_account.store']
  }
  session: {
    create: typeof routes['session.create']
    store: typeof routes['session.store']
    destroy: typeof routes['session.destroy']
  }
}
