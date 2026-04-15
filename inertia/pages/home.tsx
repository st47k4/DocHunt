import { type ReactNode } from 'react'
import LandingLayout from '~/layouts/landing'
import Hero from '~/components/landing/Hero'
import Features from '~/components/landing/Features'
import HowItWorks from '~/components/landing/HowItWorks'
import Formats from '~/components/landing/Formats'
import Cta from '~/components/landing/Cta'

interface Props {
  locale: string
}

export default function Home(_props: Props) {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <Formats />
      <Cta />
    </>
  )
}

Home.layout = (page: ReactNode) => <LandingLayout>{page}</LandingLayout>
