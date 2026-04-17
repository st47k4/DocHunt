import { type ReactNode } from 'react'
import { Head } from '@inertiajs/react'
import LandingLayout from '~/layouts/landing'
import Terms from '~/components/landing/Terms'
import { useT } from '~/i18n/context'

interface Props {
  locale: string
}

export default function TermsPage(_props: Props) {
  const t = useT()
  return (
    <>
      <Head>
        <title>{t.seo.terms.title}</title>
        <meta name="description" content={t.seo.terms.description} />
        <meta property="og:title" content={t.seo.terms.title} />
        <meta property="og:description" content={t.seo.terms.description} />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
      </Head>
      <Terms />
    </>
  )
}

TermsPage.layout = (page: ReactNode) => <LandingLayout>{page}</LandingLayout>
