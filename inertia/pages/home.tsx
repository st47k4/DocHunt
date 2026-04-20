import { type ReactNode } from 'react'
import { Head } from '@inertiajs/react'
import LandingLayout from '~/layouts/landing'
import Hero from '~/components/landing/Hero'
import LiveStats from '~/components/landing/LiveStats'
import Features from '~/components/landing/Features'
import HowItWorks from '~/components/landing/HowItWorks'
import Formats from '~/components/landing/Formats'
import Cta from '~/components/landing/Cta'
import { useT } from '~/i18n/context'

interface Props {
  locale: string
}

export default function Home(_props: Props) {
  const t = useT()
  return (
    <>
      <Head>
        <title>{t.seo.home.title}</title>
        <meta name="description" content={t.seo.home.description} />
        <meta property="og:title" content={t.seo.home.title} />
        <meta property="og:description" content={t.seo.home.description} />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
      </Head>
      <Hero />
      <LiveStats />
      <Features />
      <HowItWorks />
      <Formats />
      <Cta />
    </>
  )
}

Home.layout = (page: ReactNode) => <LandingLayout>{page}</LandingLayout>
