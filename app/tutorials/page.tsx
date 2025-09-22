import Link from 'next/link'
import { Metadata } from 'next'
import { genPageMetadata } from 'app/seo'
import { getAvailableTutorials } from '@/lib/tutorials'

function getTutorialDescription(tutorialName: string, firstLevel?: string) {
  // Try to get description from files or generate a default one
  const descriptions: Record<string, string> = {
    'Drive Image Importer':
      'Build a Google Drive image importer with progressive complexity levels',
    'React Todo App': 'Learn React by building a todo application from basic to advanced features',
  }

  return (
    descriptions[tutorialName] ||
    `Learn to build ${tutorialName.toLowerCase()} with our step-by-step tutorial`
  )
}

export const metadata: Metadata = genPageMetadata({
  title: 'Tutorials',
  description: 'Interactive tutorials to learn web development',
})

export default async function TutorialsIndex() {
  const tutorials = getAvailableTutorials().map((tutorial) => ({
    ...tutorial,
    description: getTutorialDescription(tutorial.name, tutorial.levels[0]),
  }))

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="container py-12">
        {tutorials.length === 0 ? (
          <div className="text-center">
            <p className="text-lg text-gray-500 dark:text-gray-400">No tutorials available yet.</p>
          </div>
        ) : (
          <>
            {/* Tutorials Grid */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 via-indigo-600 to-pink-600 bg-clip-text text-transparent">
                Apps Script Bytes
              </h2>
              <div className="grid gap-6 md:grid-cols-1">
                {tutorials.map((tutorial) => (
                  <Link key={tutorial.slug} href={`/tutorials/${tutorial.slug}`}>
                    <div
                      key={tutorial.slug}
                      className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800"
                    >
                      <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
                        {tutorial.name}
                      </h3>
                      <p className="mb-4 text-gray-600 dark:text-gray-400">
                        {tutorial.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
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
