import { type ReactNode } from 'react'
import LandingLayout from '~/layouts/landing'
import Community from '~/components/landing/Community'

interface Props {
  locale: string
}

export default function CommunityPage(_props: Props) {
  return <Community />
}

CommunityPage.layout = (page: ReactNode) => <LandingLayout>{page}</LandingLayout>
