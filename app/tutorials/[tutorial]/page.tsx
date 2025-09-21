import Link from 'next/link'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { genPageMetadata } from 'app/seo'
import { getAvailableTutorials } from '@/lib/tutorials'

interface TutorialPageProps {
  params: Promise<{ tutorial: string }>
}

function getTutorialData(tutorialSlug: string) {
  const tutorials = getAvailableTutorials()
  const tutorial = tutorials.find((t) => t.slug === tutorialSlug)

  if (!tutorial) {
    return null
  }

  return {
    name: tutorial.name,
    slug: tutorialSlug,
    levels: tutorial.levels,
    title: tutorial.name,
    description: `Learn ${tutorial.name} with step-by-step tutorials across multiple difficulty levels.`,
  }
}

function getLevelStyles(level: string) {
  const styles: Record<string, string> = {
    beginner: 'bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300',
    level1: 'bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300',
    basic: 'bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300',
    intermediate:
      'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-300',
    advanced: 'bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-300',
  }

  return (
    styles[level.toLowerCase()] ||
    'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
  )
}

export async function generateStaticParams() {
  const tutorials = getAvailableTutorials()
  return tutorials.map((tutorial) => ({
    tutorial: tutorial.slug,
  }))
}

export async function generateMetadata(props: TutorialPageProps): Promise<Metadata> {
  const params = await props.params
  const tutorialData = getTutorialData(params.tutorial)

  if (!tutorialData) {
    return genPageMetadata({
      title: 'Tutorial Not Found',
      description: 'The requested tutorial could not be found.',
    })
  }

  return genPageMetadata({
    title: tutorialData.title,
    description: tutorialData.description,
  })
}

export default async function TutorialPage(props: TutorialPageProps) {
  const params = await props.params
  const tutorialData = getTutorialData(params.tutorial)

  if (!tutorialData) {
    notFound()
  }

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="container py-12">
        <div className="mb-8">
          <Link
            href="/tutorials"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
          >
            ← Back to Tutorials
          </Link>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-gray-100">
              {tutorialData.name}
            </h1>
            <p className="mb-6 text-lg text-gray-600 dark:text-gray-400">
              {tutorialData.description}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-1">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-gray-100">
              Choose Your Level
            </h2>

            <div className="space-y-4">
              {tutorialData.levels.map((level) => (
                <Link
                  key={level}
                  href={`/tutorials/${tutorialData.slug}/${level}`}
                  className="block rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg dark:bg-gray-800"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
                        {level.charAt(0).toUpperCase() + level.slice(1)} Level
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Learn {tutorialData.name} at {level} level
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span
                        className={`rounded px-3 py-1 text-sm font-medium ${getLevelStyles(level)}`}
                      >
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </span>
                      <svg
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
