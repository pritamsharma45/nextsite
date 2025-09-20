import Link from 'next/link'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import LayoutWrapper from '@/components/LayoutWrapper'
import CodeTabs from '@/components/CodeTabs'
import { getAvailableTutorials, getCodeFiles } from '@/lib/tutorials'

function getTutorialData(tutorialSlug, level) {
  const tutorials = getAvailableTutorials()
  const tutorial = tutorials.find((t) => t.slug === tutorialSlug)

  if (!tutorial) {
    return null
  }

  // Find the original folder name
  const originalName = tutorial.name

  const tutorialData = {
    name: originalName,
    slug: tutorialSlug,
    level: level,
    levels: tutorial.levels,
    title: `${originalName} - ${level.charAt(0).toUpperCase() + level.slice(1)} Level`,
    description: getTutorialDescription(originalName, level),
    body: getTutorialContent(originalName, level),
  }

  return tutorialData
}

function getTutorialDescription(tutorialName, level) {
  const descriptions = {
    'Drive Image Importer': {
      level1: 'Build a basic Google Drive image importer',
      intermediate: 'Add advanced features like batch operations and filtering',
    },
    'React Todo App': {
      beginner: 'Learn React by building a basic todo app',
      intermediate: 'Add advanced features to your React todo app',
      advanced: 'Master React with complex state management and performance optimization',
    },
  }

  return descriptions[tutorialName]?.[level] || `Learn ${tutorialName} at ${level} level`
}

function getTutorialContent(tutorialName, level) {
  const content = {
    'Drive Image Importer': {
      level1: `<h1>Level 1: Drive Image Importer</h1>
        <p>Build a basic Google Drive image importer to get started with the Google Drive API.</p>
        <h2>What You'll Build</h2>
        <ul>
          <li>Basic authentication with Google Drive</li>
          <li>Simple image listing functionality</li>
          <li>Basic import capabilities</li>
        </ul>
        <h2>Key Concepts</h2>
        <ul>
          <li><strong>Google Drive API</strong>: Learn how to authenticate and access files</li>
          <li><strong>File Operations</strong>: Basic file listing and downloading</li>
          <li><strong>Web Authentication</strong>: OAuth2 flow for Google services</li>
        </ul>`,
      intermediate: `<h1>Intermediate Level: Drive Image Importer</h1>
        <p>Build upon the basic implementation with advanced features like batch operations, filtering, search, and better error handling.</p>
        <h2>What You'll Add</h2>
        <ul>
          <li>Batch image selection and operations</li>
          <li>Search and filter functionality</li>
          <li>Progress indicators</li>
          <li>Error handling and retry logic</li>
          <li>Image metadata display</li>
          <li>Responsive design improvements</li>
        </ul>
        <h2>Advanced Features Added</h2>
        <ul>
          <li><strong>Batch Operations</strong>: Select multiple images and perform bulk operations</li>
          <li><strong>Search & Filter</strong>: Find images by name and filter by file type</li>
          <li><strong>Progress Tracking</strong>: Visual progress indicators for long operations</li>
          <li><strong>Error Handling</strong>: Comprehensive error handling with retry functionality</li>
          <li><strong>Image Metadata</strong>: Display file size, creation date, and other details</li>
          <li><strong>Responsive Design</strong>: Mobile-friendly layout that adapts to different screen sizes</li>
        </ul>`,
    },
    'React Todo App': {
      beginner: `<h1>Beginner Level: React Todo App</h1>
        <p>In this beginner level, you'll learn how to build a React todo app from scratch.</p>
        <h2>What You'll Build</h2>
        <p>A web application that:</p>
        <ul>
          <li>Displays a list of todos</li>
          <li>Allows adding new todos</li>
          <li>Marks todos as complete/incomplete</li>
          <li>Deletes todos</li>
        </ul>
        <h2>Key Concepts</h2>
        <ul>
          <li><strong>React Components</strong>: Learn how to create and structure React components</li>
          <li><strong>State Management</strong>: Understand useState hook for managing component state</li>
          <li><strong>Event Handling</strong>: Handle user interactions like clicks and form submissions</li>
          <li><strong>Props</strong>: Pass data between parent and child components</li>
        </ul>`,
      intermediate: `<h1>Intermediate Level: React Todo App</h1>
        <p>Enhance your todo app with more advanced React features and better user experience.</p>
        <h2>What You'll Add</h2>
        <ul>
          <li>Local storage persistence</li>
          <li>Todo categories/tags</li>
          <li>Filtering and sorting</li>
          <li>Due dates and priorities</li>
          <li>Edit functionality</li>
          <li>Better styling and animations</li>
        </ul>
        <h2>Advanced Features</h2>
        <ul>
          <li><strong>useEffect Hook</strong>: Handle side effects like localStorage</li>
          <li><strong>Custom Hooks</strong>: Create reusable logic with custom hooks</li>
          <li><strong>Context API</strong>: Manage global state across components</li>
          <li><strong>Performance</strong>: Optimize with useMemo and useCallback</li>
        </ul>`,
      advanced: `<h1>Advanced Level: React Todo App</h1>
        <p>Master React with complex features, performance optimization, and professional patterns.</p>
        <h2>What You'll Add</h2>
        <ul>
          <li>Real-time synchronization</li>
          <li>Drag and drop functionality</li>
          <li>Undo/redo functionality</li>
          <li>Keyboard shortcuts</li>
          <li>Advanced filtering and search</li>
          <li>Export/import functionality</li>
        </ul>
        <h2>Professional Patterns</h2>
        <ul>
          <li><strong>State Management</strong>: Advanced state patterns with useReducer</li>
          <li><strong>Performance</strong>: React.memo, useMemo, useCallback optimization</li>
          <li><strong>Testing</strong>: Unit and integration testing strategies</li>
          <li><strong>TypeScript</strong>: Type safety and better development experience</li>
        </ul>`,
    },
  }

  return (
    content[tutorialName]?.[level] ||
    `<h1>${
      level.charAt(0).toUpperCase() + level.slice(1)
    } Level: ${tutorialName}</h1><p>Content for this level is coming soon!</p>`
  )
}

export async function getStaticPaths() {
  const tutorials = getAvailableTutorials()
  const paths = []

  tutorials.forEach((tutorial) => {
    tutorial.levels.forEach((level) => {
      paths.push({
        params: {
          tutorial: tutorial.slug,
          level: level,
        },
      })
    })
  })

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const { tutorial, level } = params
  const tutorialData = getTutorialData(tutorial, level)

  if (!tutorialData) {
    return {
      notFound: true,
    }
  }

  // Get code files for this tutorial level
  const codeFiles = getCodeFiles(tutorial, level)

  return {
    props: {
      tutorialData,
      codeFiles,
    },
  }
}

export default function TutorialLevel({ tutorialData, codeFiles }) {
  const { slug, level } = tutorialData

  // Redirect to new single-page format using client-side redirect
  if (typeof window !== 'undefined') {
    window.location.replace(`/tutorials/${slug}#${level}`)
    return null
  }

  // For SSR, show a redirect message
  return (
    <>
      <PageSEO title="Redirecting..." description="Redirecting to tutorial page" />
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Redirecting...
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            You're being redirected to the new tutorial format.
          </p>
          <Link href={`/tutorials/${slug}#${level}`}>
            <a className="text-primary-500 hover:text-primary-600">
              Click here if you're not redirected automatically
            </a>
          </Link>
        </div>
      </div>
    </>
  )
}

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
