import { type ReactNode } from 'react'
import { Head } from '@inertiajs/react'
import { Link } from '@adonisjs/inertia/react'
import LandingLayout from '~/layouts/landing'

export default function ServerError() {
  return (
    <>
      <Head>
        <title>500 — Server error · DocHunt</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
        <p className="font-mono text-xs uppercase tracking-[3px] text-amber-brand mb-4">
          Error 500
        </p>
        <h1 className="text-5xl md:text-6xl font-bold text-cream mb-4">Something went wrong</h1>
        <p className="text-cream/50 text-lg max-w-md mb-10">
          An unexpected error occurred on our end. Please try again later.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-7 py-3.5 bg-amber-brand hover:bg-green-400 text-bg-dark rounded-full font-semibold text-base shadow-[0_4px_30px_rgba(34,197,94,0.25)] hover:shadow-[0_8px_50px_rgba(34,197,94,0.4)] hover:-translate-y-0.5 transition-all"
        >
          Back to home
        </Link>
      </div>
    </>
  )
}

ServerError.layout = (page: ReactNode) => <LandingLayout>{page}</LandingLayout>
