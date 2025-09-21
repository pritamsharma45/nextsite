'use client'

import { useState } from 'react'
import { CodeFile } from '@/lib/tutorials'

interface CodeTabsProps {
  tutorialSlug: string
  level: string
  files: CodeFile[]
}

export default function CodeTabs({ tutorialSlug, level, files }: CodeTabsProps) {
  const [activeTab, setActiveTab] = useState(files[0]?.name || '')

  if (!files || files.length === 0) {
    return (
      <div className="rounded-lg bg-gray-100 p-6 text-center dark:bg-gray-800">
        <p className="text-gray-600 dark:text-gray-400">No code files available for this level.</p>
      </div>
    )
  }

  const activeFile = files.find((file) => file.name === activeTab) || files[0]

  return (
    <div className="rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      {/* Tab Headers */}
      <div className="flex flex-wrap border-b border-gray-200 dark:border-gray-700">
        {files.map((file, index) => (
          <button
            key={file.name}
            onClick={() => setActiveTab(file.name)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === file.name
                ? 'border-primary-500 text-primary-600 dark:text-primary-400 border-b-2 bg-gray-50 dark:bg-gray-700'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200'
            } ${index === 0 ? 'rounded-tl-lg' : ''} ${index === files.length - 1 ? 'rounded-tr-lg' : ''}`}
          >
            {file.name}
          </button>
        ))}
      </div>

      {/* Code Content */}
      <div className="relative">
        <div className="absolute top-3 right-3">
          <button
            onClick={() => {
              navigator.clipboard.writeText(activeFile.content)
            }}
            className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
            title="Copy to clipboard"
          >
            Copy
          </button>
        </div>

        <pre className="overflow-x-auto p-4 text-sm">
          <code
            className={`language-${activeFile.language}`}
            dangerouslySetInnerHTML={{ __html: activeFile.html || '' }}
          />
        </pre>
      </div>
    </div>
  )
}
