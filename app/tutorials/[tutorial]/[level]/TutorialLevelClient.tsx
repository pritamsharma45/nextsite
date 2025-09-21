'use client'

import { useState } from 'react'
import Link from 'next/link'
import CodeTabs from '@/components/CodeTabs'
import type { TutorialLevelData, CodeFile } from '@/lib/tutorials'

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

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-lg transition-transform duration-200 lg:relative lg:translate-x-0 dark:bg-gray-800 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
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
          <nav className="flex-1 overflow-y-auto">
            <h3 className="mb-4 p-4 text-sm font-medium text-gray-900 dark:text-gray-100">
              Levels
            </h3>
            <ul className="space-y-2">
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
      <div className="flex-1 lg:ml-0">
        {/* Mobile Header */}
        <div className="border-b border-gray-200 bg-white px-4 py-3 lg:hidden dark:border-gray-700 dark:bg-gray-900">
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
        <div className="mx-auto max-w-4xl px-4 py-8 lg:px-8">
          {/* Content Header */}
          <div className="mb-8">
            <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-gray-100">
              {levelData.title}
            </h1>
            <p className="mb-4 text-lg text-gray-600 dark:text-gray-400">{levelData.description}</p>

            {/* Metadata Cards */}
            {levelData.metadata && (
              <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                {/* Difficulty & Time */}
                <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                  <h3 className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                    Level Info
                  </h3>
                  <div className="space-y-1">
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

                {/* Prerequisites */}
                {levelData.metadata.prerequisites &&
                  levelData.metadata.prerequisites.length > 0 && (
                    <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                      <h3 className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                        Prerequisites
                      </h3>
                      <ul className="space-y-1">
                        {levelData.metadata.prerequisites.slice(0, 3).map((prereq, index) => (
                          <li key={index} className="text-sm text-gray-600 dark:text-gray-400">
                            • {prereq}
                          </li>
                        ))}
                        {levelData.metadata.prerequisites.length > 3 && (
                          <li className="text-sm text-gray-500 dark:text-gray-500">
                            +{levelData.metadata.prerequisites.length - 3} more
                          </li>
                        )}
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
                        {levelData.metadata.learningOutcomes.slice(0, 3).map((outcome, index) => (
                          <li key={index} className="text-sm text-gray-600 dark:text-gray-400">
                            ✓ {outcome}
                          </li>
                        ))}
                        {levelData.metadata.learningOutcomes.length > 3 && (
                          <li className="text-sm text-gray-500 dark:text-gray-500">
                            +{levelData.metadata.learningOutcomes.length - 3} more
                          </li>
                        )}
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
  )
}
