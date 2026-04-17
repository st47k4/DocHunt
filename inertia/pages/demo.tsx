import { type ReactNode } from 'react'
import { Head } from '@inertiajs/react'
import LandingLayout from '~/layouts/landing'
import UploadDemo from '~/components/landing/UploadDemo'
import Cta from '~/components/landing/Cta'
import { useT } from '~/i18n/context'

interface Props {
  locale: string
}

export default function Demo(_props: Props) {
  const t = useT()
  return (
    <>
      <Head>
        <title>{t.seo.demo.title}</title>
        <meta name="description" content={t.seo.demo.description} />
        <meta property="og:title" content={t.seo.demo.title} />
        <meta property="og:description" content={t.seo.demo.description} />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
      </Head>
      <UploadDemo />
      <Cta />
    </>
  )
}

Demo.layout = (page: ReactNode) => <LandingLayout>{page}</LandingLayout>
