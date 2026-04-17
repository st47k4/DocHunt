import { type ReactNode } from 'react'
import { Head } from '@inertiajs/react'
import LandingLayout from '~/layouts/landing'
import Faq from '~/components/landing/Faq'
import { useT } from '~/i18n/context'

interface Props {
  locale: string
}

export default function FaqPage(_props: Props) {
  const t = useT()
  return (
    <>
      <Head>
        <title>{t.seo.faq.title}</title>
        <meta name="description" content={t.seo.faq.description} />
        <meta property="og:title" content={t.seo.faq.title} />
        <meta property="og:description" content={t.seo.faq.description} />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
      </Head>
      <Faq />
    </>
  )
}

FaqPage.layout = (page: ReactNode) => <LandingLayout>{page}</LandingLayout>
