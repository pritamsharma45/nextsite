'use client'
import 'css/prismCustom.css'
import { useState } from 'react'
import Link from 'next/link'
import CodeTabs from '@/components/CodeTabs'
import type { TutorialLevelData, CodeFile } from '@/lib/tutorials'
import YoutubeSidebar from '@/components/YoutubeSidebar'

interface TutorialData {
  name: string
  slug: string
  level: string
  levels: string[]
  title: string
  description: string
}

interface TutorialLevelClientProps {
  tutorialData: TutorialData
  levelData: TutorialLevelData
  codeFiles: CodeFile[]
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

export default function TutorialLevelClient({
  tutorialData,
  levelData,
  codeFiles,
}: TutorialLevelClientProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Get current level index and next level
  const currentLevelIndex = tutorialData.levels.indexOf(tutorialData.level)
  const nextLevel = currentLevelIndex < tutorialData.levels.length - 1 
    ? tutorialData.levels[currentLevelIndex + 1] 
    : null
  const isLastLevel = currentLevelIndex === tutorialData.levels.length - 1

  return (
    <>
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 flex w-1/4 flex-shrink-0 transform bg-white shadow-lg transition-transform duration-200 lg:relative lg:translate-x-0 dark:bg-gray-800 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col">
          {/* Sidebar Header */}
          <div className="border-b border-gray-200 p-6 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setSidebarOpen(false)}
                className="rounded p-1 text-gray-400 hover:text-gray-600 lg:hidden dark:hover:text-gray-300"
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
            <div className="space-y-2">
              <Link
                href="/tutorials"
                className="hover:text-primary-500 text-sm text-gray-500 dark:text-gray-400"
              >
                ← Back to Tutorials
              </Link>
              {/* <Link
                href={`/tutorials/${tutorialData.slug}`}
                className="hover:text-primary-500 text-sm text-gray-500 dark:text-gray-400"
              >
                ← Back to {tutorialData.name}
              </Link> */}
            </div>
          </div>

          {/* Level Navigation */}
          <nav className="overflow-y-auto">
            <h3 className="mb-4 p-4 text-sm font-medium text-gray-900 dark:text-gray-100">
              Levels
            </h3>
            <ul className="space-y-2 mb-4">
              {tutorialData.levels.map((level) => (
                <li key={level}>
                  <Link
                    href={`/tutorials/${tutorialData.slug}/${level}`}
                    className={`flex w-full items-center px-3 py-2 text-left text-sm transition-colors ${
                      tutorialData.level === level
                        ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="ml-2">
                      <div className="font-medium">
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
         <span className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-8">More from TechLever YouTube Channel</span>
         <div className="mt-4">
         <YoutubeSidebar
              playlistId="PLFmoTa4E3esuwfdH_tJoOIaaBj9u44R4y"
              apiKey="AIzaSyAsE1ceA5UaeplcLv44FHFRR7T4ip37NuA"
            />
         </div>
   
          </div>    
        </div> 
        
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="bg-opacity-50 fixed inset-0 z-40 bg-black lg:hidden"
          onClick={() => setSidebarOpen(false)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setSidebarOpen(false)
          }}
          role="button"
          tabIndex={0}
        />
      )}

      {/* Main Content */}
      <div className="flex w-3/4 shadow-lg">

        {/* Content Area */}
        <div className="mx-auto w-full px-4 py-8 lg:px-8">
          {/* Content Header */}
          <div className="mb-8">
            <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-gray-100">
              {levelData.title}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">{levelData.description}</p>
            <div className="rounded-lg py-4">
              <div className="flex flex-row gap-4">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <span
                    className={`mr-2 inline-block h-2 w-2 rounded-full ${getLevelStyles(
                      levelData.metadata.difficulty || tutorialData.level
                    )}`}
                  />
                  {(levelData.metadata.difficulty || tutorialData.level)
                    ?.charAt(0)
                    .toUpperCase() +
                    (levelData.metadata.difficulty || tutorialData.level)?.slice(1)}
                </div>
                {levelData.metadata.estimatedTime && (
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    ⏱️ {levelData.metadata.estimatedTime}
                  </div>
                )}
              </div>
            </div>
            {/* Metadata Cards */}
            {levelData.metadata && (
              <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Difficulty & Time */}

                {/* Prerequisites */}
                {levelData.metadata.prerequisites &&
                  levelData.metadata.prerequisites.length > 0 && (
                    <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                      <h3 className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                        Prerequisites
                      </h3>
                      <ul className="space-y-1">
                        {levelData.metadata.prerequisites.map((prereq, index) => (
                          <li key={index} className="text-sm text-gray-600 dark:text-gray-400">
                            • {prereq}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                {/* Learning Outcomes */}
                {levelData.metadata.learningOutcomes &&
                  levelData.metadata.learningOutcomes.length > 0 && (
                    <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                      <h3 className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                        You'll Learn
                      </h3>
                      <ul className="space-y-1">
                        {levelData.metadata.learningOutcomes.map((outcome, index) => (
                          <li key={index} className="text-sm text-gray-600 dark:text-gray-400">
                            ✓ {outcome}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
              </div>
            )}
          </div>

          {/* Tutorial Content */}
          <div className="prose dark:prose-invert mb-8 max-w-none">
            <div dangerouslySetInnerHTML={{ __html: levelData.content }} />
          </div>

          {/* Code Implementation */}
          {codeFiles && codeFiles.length > 0 && (
            <div>
              <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
                Implementation
              </h2>
              <CodeTabs
                tutorialSlug={tutorialData.slug}
                level={tutorialData.level}
                files={codeFiles}
              />
            </div>
          )}
        </div>
      </div>
    </div>
    {/* Next Level Navigation */}
          <div className="mt-12 pt-8 dark:border-gray-700">
            <div className="flex flex-col items-center space-y-4">
              { nextLevel && (
                <div className="text-center">
                  <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Ready for the next level?
                  </h3>
                  <p className="mb-6 text-gray-600 dark:text-gray-400">
                    Continue your learning journey with the next level of this tutorial.
                  </p>
                  <Link
                    href={`/tutorials/${tutorialData.slug}/${nextLevel}`}
                    className="inline-flex items-center rounded-lg bg-primary-600 px-6 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                  >
                    <span>Next Level: {nextLevel.charAt(0).toUpperCase() + nextLevel.slice(1)}</span>
                    <svg
                      className="ml-2 h-5 w-5"
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
                  </Link>
                </div>
              )}
            </div>
          </div>
    {isLastLevel && (
          <div className="text-center mt-10">
            <div className="mb-4 rounded-full bg-green-100 p-3 dark:bg-green-900">
              <svg
                className="mx-auto h-8 w-8 text-green-600 dark:text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
              Congratulations! 🎉
            </h3>
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              You've completed all levels of this tutorial. Great job!
            </p>
            <div className="flex flex-col gap-3 sm:flex-row text-center justify-center">
              <Link
                href="/tutorials"
                className="inline-flex items-center rounded-lg bg-gray-100 px-6 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              >
              <svg
                className="mr-2 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Explore More Tutorials
              </Link>
              <Link
                href={`/tutorials/${tutorialData.slug}`}
                className="inline-flex items-center rounded-lg bg-primary-600 px-6 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              >
                <svg
                  className="mr-2 h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Review Tutorial
              </Link>
            </div>
          </div>
        )}
    </>
    
    
  )
}
