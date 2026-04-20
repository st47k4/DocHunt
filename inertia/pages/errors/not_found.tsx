import { type ReactNode } from 'react'
import { Head, Link } from '@inertiajs/react'
import LandingLayout from '~/layouts/landing'

export default function NotFound() {
  return (
    <>
      <Head>
        <title>404 — Page not found · DocHunt</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
        <p className="font-mono text-xs uppercase tracking-[3px] text-amber-brand mb-4">
          Error 404
        </p>
        <h1 className="text-5xl md:text-6xl font-bold text-cream mb-4">Page not found</h1>
        <p className="text-cream/50 text-lg max-w-md mb-10">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-7 py-3.5 bg-amber-brand hover:bg-amber-400 text-bg-dark rounded-full font-semibold text-base shadow-[0_4px_30px_rgba(245,158,11,0.25)] hover:shadow-[0_8px_50px_rgba(245,158,11,0.4)] hover:-translate-y-0.5 transition-all"
        >
          Back to home
        </Link>
      </div>
    </>
  )
}

NotFound.layout = (page: ReactNode) => <LandingLayout>{page}</LandingLayout>
