import { useState, useEffect } from 'react'
import Link from 'next/link'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import LayoutWrapper from '@/components/LayoutWrapper'
import CodeTabs from '@/components/CodeTabs'
import { getAvailableTutorials, getCodeFiles, getTutorialLevelData } from '@/lib/tutorials'

function getTutorialData(tutorialSlug) {
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

// Content is now loaded from markdown files in getTutorialLevelData

function getLevelStyles(level) {
  const styles = {
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

export async function getStaticPaths() {
  const tutorials = getAvailableTutorials()
  const paths = tutorials.map((tutorial) => ({
    params: {
      tutorial: tutorial.slug,
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const { tutorial } = params
  const tutorialData = getTutorialData(tutorial)

  if (!tutorialData) {
    return {
      notFound: true,
    }
  }

  // Get all levels data and code files using the new markdown-based approach
  const levelsDataPromises = tutorialData.levels.map(async (level) => {
    const levelData = await getTutorialLevelData(tutorial, level)
    const codeFiles = getCodeFiles(tutorial, level)

    return {
      level,
      title: levelData.title,
      description: levelData.description,
      content: levelData.content,
      metadata: levelData.metadata,
      codeFiles,
    }
  })

  const levelsData = await Promise.all(levelsDataPromises)

  return {
    props: {
      tutorialData,
      levelsData,
    },
  }
}

export default function Tutorial({ tutorialData, levelsData }) {
  const [activeLevel, setActiveLevel] = useState(levelsData[0]?.level || '')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Handle hash changes for direct linking
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '')
      if (hash && levelsData.find((l) => l.level === hash)) {
        setActiveLevel(hash)
      }
    }

    // Set initial level from hash or use first level
    const initialHash = window.location.hash.replace('#', '')
    if (initialHash && levelsData.find((l) => l.level === initialHash)) {
      setActiveLevel(initialHash)
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [levelsData])

  // Update URL hash when level changes
  const handleLevelChange = (level) => {
    setActiveLevel(level)
    window.history.pushState(null, null, `#${level}`)
    setSidebarOpen(false) // Close mobile sidebar
  }

  const activeLevelData = levelsData.find((l) => l.level === activeLevel) || levelsData[0]

  if (!tutorialData || !levelsData.length) {
    return <div>Tutorial not found</div>
  }

  return (
    <>
      <PageSEO title={tutorialData.title} description={tutorialData.description} />

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-lg transition-transform duration-200 dark:bg-gray-800 lg:relative lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex h-full flex-col">
            {/* Sidebar Header */}
            <div className="border-b border-gray-200 p-6 dark:border-gray-700">
              <div className="flex items-center justify-between">
                {/* <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {tutorialData.name}
                </h2> */}
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="lg:hidden rounded p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <Link href="/tutorials">
                <a className="text-sm text-gray-500 hover:text-primary-500 dark:text-gray-400">
                  ← Back to Tutorials
                </a>
              </Link>
            </div>

            {/* Level Navigation */}
            <nav className="flex-1 overflow-y-auto">
              <h3 className="mb-4 text-sm font-medium text-gray-900 dark:text-gray-100 p-4">
                Levels
              </h3>
              <ul className="space-y-2">
                {levelsData.map((levelData) => (
                  <li key={levelData.level}>
                    <button
                      onClick={() => handleLevelChange(levelData.level)}
                      className={`flex w-full items-center  px-3 py-2 text-left text-sm transition-colors ${
                        activeLevel === levelData.level
                          ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                      }`}
                    >
                      <div className="flex items-center">
                        {/* <span
                          className={`mr-3 inline-block h-2 w-2 rounded-full ${
                            activeLevel === levelData.level
                              ? 'bg-primary-500'
                              : 'bg-gray-300 dark:bg-gray-600'
                          }`}
                        /> */}
                        <div className="ml-2">
                          <div className="font-medium">
                            {levelData.level.charAt(0).toUpperCase() + levelData.level.slice(1)}
                          </div>
                          {/* <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {levelData.description}
                          </div> */}
                          {levelData.metadata?.estimatedTime && (
                            <div className="text-xs text-gray-400 dark:text-gray-500">
                              ⏱️ {levelData.metadata.estimatedTime}
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          {/* Mobile Header */}
          <div className="border-b border-gray-200 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-900 lg:hidden">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setSidebarOpen(true)}
                className="rounded p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {tutorialData.name}
              </h1>
              <div className="w-8" /> {/* Spacer */}
            </div>
          </div>

          {/* Content Area */}
          <div className="max-w-4xl mx-auto px-4 py-8 lg:px-8">
            {activeLevelData && (
              <>
                {/* Content Header */}
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                    {activeLevelData.title}
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                    {activeLevelData.description}
                  </p>

                  {/* Metadata Cards */}
                  {activeLevelData.metadata && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      {/* Difficulty & Time */}
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                          Level Info
                        </h3>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <span
                              className={`inline-block w-2 h-2 rounded-full mr-2 ${getLevelStyles(
                                activeLevelData.metadata.difficulty
                              )}`}
                            />
                            {activeLevelData.metadata.difficulty?.charAt(0).toUpperCase() +
                              activeLevelData.metadata.difficulty?.slice(1)}
                          </div>
                          {activeLevelData.metadata.estimatedTime && (
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              ⏱️ {activeLevelData.metadata.estimatedTime}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Prerequisites */}
                      {activeLevelData.metadata.prerequisites &&
                        activeLevelData.metadata.prerequisites.length > 0 && (
                          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                              Prerequisites
                            </h3>
                            <ul className="space-y-1">
                              {activeLevelData.metadata.prerequisites
                                .slice(0, 3)
                                .map((prereq, index) => (
                                  <li
                                    key={index}
                                    className="text-sm text-gray-600 dark:text-gray-400"
                                  >
                                    • {prereq}
                                  </li>
                                ))}
                              {activeLevelData.metadata.prerequisites.length > 3 && (
                                <li className="text-sm text-gray-500 dark:text-gray-500">
                                  +{activeLevelData.metadata.prerequisites.length - 3} more
                                </li>
                              )}
                            </ul>
                          </div>
                        )}

                      {/* Learning Outcomes */}
                      {activeLevelData.metadata.learningOutcomes &&
                        activeLevelData.metadata.learningOutcomes.length > 0 && (
                          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                              You'll Learn
                            </h3>
                            <ul className="space-y-1">
                              {activeLevelData.metadata.learningOutcomes
                                .slice(0, 3)
                                .map((outcome, index) => (
                                  <li
                                    key={index}
                                    className="text-sm text-gray-600 dark:text-gray-400"
                                  >
                                    ✓ {outcome}
                                  </li>
                                ))}
                              {activeLevelData.metadata.learningOutcomes.length > 3 && (
                                <li className="text-sm text-gray-500 dark:text-gray-500">
                                  +{activeLevelData.metadata.learningOutcomes.length - 3} more
                                </li>
                              )}
                            </ul>
                          </div>
                        )}
                    </div>
                  )}
                </div>

                {/* Tutorial Content */}
                <div className="prose max-w-none dark:prose-dark mb-8">
                  <div dangerouslySetInnerHTML={{ __html: activeLevelData.content }} />
                </div>

                {/* Code Implementation */}
                {activeLevelData.codeFiles && activeLevelData.codeFiles.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                      Implementation
                    </h2>
                    <CodeTabs
                      tutorialSlug={tutorialData.slug}
                      level={activeLevel}
                      files={activeLevelData.codeFiles}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
