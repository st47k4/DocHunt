import { type ReactNode } from 'react'
import { Head } from '@inertiajs/react'
import LandingLayout from '~/layouts/landing'
import Privacy from '~/components/landing/Privacy'
import { useT } from '~/i18n/context'

interface Props {
  locale: string
}

export default function PrivacyPage(_props: Props) {
  const t = useT()
  return (
    <>
      <Head>
        <title>{t.seo.privacy.title}</title>
        <meta name="description" content={t.seo.privacy.description} />
        <meta property="og:title" content={t.seo.privacy.title} />
        <meta property="og:description" content={t.seo.privacy.description} />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
      </Head>
      <Privacy />
    </>
  )
}

PrivacyPage.layout = (page: ReactNode) => <LandingLayout>{page}</LandingLayout>
