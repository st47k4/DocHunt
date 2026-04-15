import { type ReactNode } from 'react'
import LandingLayout from '~/layouts/landing'
import UploadDemo from '~/components/landing/UploadDemo'
import Cta from '~/components/landing/Cta'

interface Props {
  locale: string
}

export default function Demo(_props: Props) {
  return (
    <>
      <UploadDemo />
      <Cta />
    </>
  )
}

Demo.layout = (page: ReactNode) => <LandingLayout>{page}</LandingLayout>
