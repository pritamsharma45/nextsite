import { useState, useEffect, useMemo, useCallback } from 'react'

// Note: Using custom Prism theme from css/prism.css which is already included globally

// Import only core Prism - no language components to avoid dependency issues
let Prism = null
if (typeof window !== 'undefined') {
  try {
    Prism = require('prismjs')
  } catch (error) {
    console.warn('Failed to load Prism:', error)
  }
}

export default function CodeTabs({ tutorialSlug, level, files: propFiles }) {
  const [activeTab, setActiveTab] = useState(0)
  const [copied, setCopied] = useState(false)
  const [highlightedFiles, setHighlightedFiles] = useState([])
  const [prismLoaded, setPrismLoaded] = useState(false)

  // Use files from props if provided (for SSG), otherwise empty array
  const files = useMemo(() => propFiles || [], [propFiles])

  useEffect(() => {
    setActiveTab(0)
  }, [tutorialSlug, level])

  // Function to escape HTML entities for display
  const escapeHtml = (text) => {
    if (typeof window === 'undefined') return text
    const div = document.createElement('div')
    div.textContent = text
    return div.innerHTML
  }

  // Simple Prism initialization check
  useEffect(() => {
    if (typeof window !== 'undefined' && Prism) {
      setPrismLoaded(true)
    }
  }, [])

  // Manual highlighting with basic patterns for common languages
  const highlightManually = useCallback((code, language) => {
    const escaped = escapeHtml(code)

    // Basic highlighting patterns for common languages
    const patterns = {
      javascript: [
        {
          pattern:
            /\b(function|const|let|var|if|else|for|while|return|class|extends|import|export|from|default)\b/g,
          className: 'token keyword',
        },
        { pattern: /(\/\/.*$)/gm, className: 'token comment' },
        { pattern: /(\/\*[\s\S]*?\*\/)/g, className: 'token comment' },
        { pattern: /(['"])((?:(?!\1)[^\\]|\\.)*)(\1)/g, className: 'token string' },
        { pattern: /\b\d+\b/g, className: 'token number' },
      ],
      css: [
        { pattern: /([a-zA-Z-]+)(?=\s*:)/g, className: 'token property' },
        { pattern: /(\/\*[\s\S]*?\*\/)/g, className: 'token comment' },
        { pattern: /(['"])((?:(?!\1)[^\\]|\\.)*)(\1)/g, className: 'token string' },
        { pattern: /#[a-fA-F0-9]{3,6}\b/g, className: 'token number' },
      ],
      markup: [
        { pattern: /(&lt;\/?[a-zA-Z][^&gt;]*&gt;)/g, className: 'token tag' },
        { pattern: /(&lt;!--[\s\S]*?--&gt;)/g, className: 'token comment' },
        { pattern: /(=)(['"])((?:(?!\2)[^\\]|\\.)*)(\2)/g, className: 'token attr-value' },
      ],
    }

    let highlighted = escaped
    const langPatterns = patterns[language] || patterns.markup

    langPatterns.forEach(({ pattern, className }) => {
      highlighted = highlighted.replace(pattern, `<span class="${className}">$&</span>`)
    })

    return highlighted
  }, [])

  // Highlight files on the client side
  useEffect(() => {
    if (typeof window !== 'undefined' && Prism && prismLoaded && files.length > 0) {
      console.log('🎨 Starting syntax highlighting...', {
        prismLoaded,
        languages: Prism.languages ? Object.keys(Prism.languages) : [],
        filesCount: files.length,
      })

      const highlighted = files.map((file) => {
        try {
          // Check if the language is supported in Prism
          if (Prism.languages[file.language]) {
            console.log(`✅ Highlighting ${file.name} as ${file.language}`)
            return {
              ...file,
              highlightedContent: Prism.highlight(
                file.content,
                Prism.languages[file.language],
                file.language
              ),
            }
          } else if (Prism.languages.markup) {
            console.log(`🔄 Fallback: Highlighting ${file.name} (${file.language}) as markup`)
            return {
              ...file,
              highlightedContent: Prism.highlight(file.content, Prism.languages.markup, 'markup'),
            }
          } else {
            console.log(`📝 Manual highlighting for ${file.name} (${file.language})`)
            return {
              ...file,
              highlightedContent: highlightManually(file.content, file.language),
            }
          }
        } catch (error) {
          console.warn('Prism highlighting failed for', file.language, error)
          // Fallback to manual highlighting
          return {
            ...file,
            highlightedContent: highlightManually(file.content, file.language),
          }
        }
      })

      setHighlightedFiles(highlighted)
    } else {
      console.log('⏳ Using manual highlighting (no Prism available)', {
        hasPrism: !!Prism,
        prismLoaded,
        filesCount: files.length,
      })
      // Fallback to manual highlighting
      setHighlightedFiles(
        files.map((file) => ({
          ...file,
          highlightedContent: highlightManually(file.content, file.language),
        }))
      )
    }
  }, [files, prismLoaded, highlightManually])

  const currentFiles = highlightedFiles.length > 0 ? highlightedFiles : files

  const copyToClipboard = async (content) => {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  if (!currentFiles || currentFiles.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
        <p className="text-gray-500 dark:text-gray-400">
          No code files available for this tutorial level.
        </p>
      </div>
    )
  }

  return (
    <div className="not-prose my-6">
      <div className="rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-900">
        {/* Tab Headers */}
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          {currentFiles.map((file, index) => (
            <button
              key={file.name}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === index
                  ? 'border-b-2 border-primary-500 bg-white text-primary-600 dark:bg-gray-800 dark:text-primary-400'
                  : 'bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300'
              }`}
            >
              {file.name}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="relative">
          {currentFiles.map((file, index) => (
            <div key={file.name} className={`${activeTab === index ? 'block' : 'hidden'}`}>
              {/* Copy Button */}
              <div className="flex justify-end border-b border-gray-200 bg-gray-50 px-4 py-2 dark:border-gray-700 dark:bg-gray-800">
                <button
                  onClick={() => copyToClipboard(file.content)}
                  className="flex items-center space-x-2 rounded px-3 py-1 text-xs font-medium text-gray-500 transition-colors hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700"
                >
                  {copied ? (
                    <>
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code Content */}
              <div className="relative overflow-x-auto">
                <pre className={`language-${file.language} p-4 text-sm !m-0`}>
                  {file.highlightedContent ? (
                    <code
                      className={`language-${file.language}`}
                      dangerouslySetInnerHTML={{
                        __html: file.highlightedContent,
                      }}
                    />
                  ) : (
                    <code className={`language-${file.language}`}>{file.content}</code>
                  )}
                </pre>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Note: File reading is now handled in lib/tutorials.js for server-side operations
