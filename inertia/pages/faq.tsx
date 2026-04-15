import { type ReactNode } from 'react'
import LandingLayout from '~/layouts/landing'
import Faq from '~/components/landing/Faq'

interface Props {
  locale: string
}

export default function FaqPage(_props: Props) {
  return (
    <Faq />
  )
}

FaqPage.layout = (page: ReactNode) => <LandingLayout>{page}</LandingLayout>
