import { type ReactNode } from 'react'
import { Head } from '@inertiajs/react'
import LandingLayout from '~/layouts/landing'
import Community from '~/components/landing/Community'
import { useT } from '~/i18n/context'

interface Props {
  locale: string
}

export default function CommunityPage(_props: Props) {
  const t = useT()
  return (
    <>
      <Head>
        <title>{t.seo.community.title}</title>
        <meta name="description" content={t.seo.community.description} />
        <meta property="og:title" content={t.seo.community.title} />
        <meta property="og:description" content={t.seo.community.description} />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
      </Head>
      <Community />
    </>
  )
}

CommunityPage.layout = (page: ReactNode) => <LandingLayout>{page}</LandingLayout>
