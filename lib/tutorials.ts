import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeStringify from 'rehype-stringify'
import rehypePrismPlus from 'rehype-prism-plus'
import { refractor } from 'refractor'
import { toHtml } from 'hast-util-to-html'
import js from 'refractor/javascript'
import ts from 'refractor/typescript'
import markup from 'refractor/markup'
import cssLang from 'refractor/css'
import jsonLang from 'refractor/json'
import py from 'refractor/python'
import md from 'refractor/markdown'

const tutorialsDirectory = path.join(process.cwd(), 'data/tutorials')

export interface TutorialMetadata {
  difficulty?: string
  estimatedTime?: string
  prerequisites?: string[]
  learningOutcomes?: string[]
}

export interface TutorialLevelData {
  title: string
  description: string
  content: string
  metadata?: TutorialMetadata
}

export interface CodeFile {
  name: string
  content: string
  language: string
  html?: string
}

export interface Tutorial {
  name: string
  slug: string
  levels: string[]
}

async function convertMarkdownToHtml(markdown: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: 'wrap' })
    .use(rehypePrismPlus, { ignoreMissing: true })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown)
  return String(file)
}

function getTutorialLevelOrder(tutorialPath: string): string[] {
  // Try to load order.json first
  const orderJsonPath = path.join(tutorialPath, 'order.json')
  if (fs.existsSync(orderJsonPath)) {
    try {
      const orderData = JSON.parse(fs.readFileSync(orderJsonPath, 'utf8'))
      return orderData.levels || []
    } catch (error) {
      console.warn(`Failed to parse order.json for tutorial: ${tutorialPath}`, error)
    }
  }

  // Try to load order.ts as fallback
  const orderTsPath = path.join(tutorialPath, 'order.ts')
  if (fs.existsSync(orderTsPath)) {
    try {
      const orderContent = fs.readFileSync(orderTsPath, 'utf8')

      // More robust regex to handle multi-line arrays and different formatting
      const match = orderContent.match(/export\s+const\s+levels\s*=\s*\[([\s\S]*?)\]/)
      if (match) {
        const levelsString = match[1]
        const levels = levelsString
          .split(',')
          .map((level) => level.trim().replace(/['"]/g, '').replace(/\s+/g, ' '))
          .filter((level) => level.length > 0 && !level.startsWith('//'))
        return levels
      }
    } catch (error) {
      console.warn(`Failed to parse order.ts for tutorial: ${tutorialPath}`, error)
    }
  }

  // Fallback to default order
  return [
    'beginner',
    'level1',
    'basic',
    'intermediate',
    'advanced',
    'level2',
    'level3',
    'completed',
  ]
}

export function getAvailableTutorials(): Tutorial[] {
  if (!fs.existsSync(tutorialsDirectory)) {
    return []
  }

  const tutorialFolders = fs
    .readdirSync(tutorialsDirectory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)

  return tutorialFolders.map((folderName) => {
    const tutorialPath = path.join(tutorialsDirectory, folderName)
    const availableLevels = fs
      .readdirSync(tutorialPath, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name)

    const order = getTutorialLevelOrder(tutorialPath)

    // Sort levels according to the order configuration
    const levels = availableLevels.sort((a, b) => {
      const aIndex = order.indexOf(a)
      const bIndex = order.indexOf(b)

      // If both levels are in the order, sort by their position
      if (aIndex !== -1 && bIndex !== -1) {
        return aIndex - bIndex
      }

      // If only one level is in the order, prioritize it
      if (aIndex !== -1) return -1
      if (bIndex !== -1) return 1

      // If neither level is in the order, sort alphabetically
      return a.localeCompare(b)
    })

    return {
      name: folderName,
      slug: folderName.toLowerCase().replace(/\s+/g, '-'),
      levels,
    }
  })
}

export async function getTutorialLevelData(
  tutorialSlug: string,
  level: string
): Promise<TutorialLevelData> {
  const tutorials = getAvailableTutorials()
  const tutorial = tutorials.find((t) => t.slug === tutorialSlug)

  if (!tutorial) {
    throw new Error(`Tutorial not found: ${tutorialSlug}`)
  }

  const levelPath = path.join(tutorialsDirectory, tutorial.name, level, 'tutorialData.md')

  if (!fs.existsSync(levelPath)) {
    // Return default content if no markdown file exists
    return {
      title: `${tutorial.name} - ${level.charAt(0).toUpperCase() + level.slice(1)}`,
      description: `Learn ${tutorial.name} at ${level} level`,
      content: getDefaultTutorialContent(tutorial.name, level),
      metadata: getDefaultMetadata(level),
    }
  }

  const fileContents = fs.readFileSync(levelPath, 'utf8')
  const { data, content } = matter(fileContents)

  const html = content?.trim()
    ? await convertMarkdownToHtml(content)
    : getDefaultTutorialContent(tutorial.name, level)

  return {
    title: data.title || `${tutorial.name} - ${level.charAt(0).toUpperCase() + level.slice(1)}`,
    description: data.description || `Learn ${tutorial.name} at ${level} level`,
    content: html,
    metadata: {
      difficulty: data.difficulty || level,
      estimatedTime: data.estimatedTime,
      prerequisites: data.prerequisites || [],
      learningOutcomes: data.learningOutcomes || [],
    },
  }
}

export function getCodeFiles(tutorialSlug: string, level: string): CodeFile[] {
  const tutorials = getAvailableTutorials()
  const tutorial = tutorials.find((t) => t.slug === tutorialSlug)

  if (!tutorial) {
    return []
  }

  const filesPath = path.join(tutorialsDirectory, tutorial.name, level, 'files')

  if (!fs.existsSync(filesPath)) {
    return []
  }

  const files = fs.readdirSync(filesPath)

  // Ensure languages are registered exactly once
  ;[js, ts, markup, cssLang, jsonLang, py, md].forEach((lang: any) => {
    try {
      refractor.register(lang)
    } catch {
      // already registered
    }
  })

  return files.map((fileName) => {
    const filePath = path.join(filesPath, fileName)
    const content = fs.readFileSync(filePath, 'utf8')
    const extension = path.extname(fileName).toLowerCase()

    let language = 'text'
    if (extension === '.js' || extension === '.gs') language = 'javascript'
    else if (extension === '.ts' || extension === '.tsx') language = 'typescript'
    else if (extension === '.html' || extension === '.htm') language = 'markup'
    else if (extension === '.css') language = 'css'
    else if (extension === '.json') language = 'json'
    else if (extension === '.py') language = 'python'
    else if (extension === '.md' || extension === '.mdx') language = 'markdown'

    let highlighted = ''
    try {
      if (language !== 'text' && refractor.registered(language)) {
        const tree = refractor.highlight(content, language)
        highlighted = toHtml(tree)
      } else {
        highlighted = toHtml({ type: 'text', value: content } as any)
      }
    } catch {
      highlighted = toHtml({ type: 'text', value: content } as any)
    }

    return {
      name: fileName,
      content,
      language,
      html: highlighted,
    }
  })
}

function getDefaultTutorialContent(tutorialName: string, level: string): string {
  const content = {
    'drive-image-importer': {
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
        </ul>`,
    },
    'react-todo-app': {
      beginner: `<h1>Beginner: React Todo App</h1>
        <p>Learn React fundamentals by building a todo application with basic features.</p>
        <h2>What You'll Learn</h2>
        <ul>
          <li>React components and JSX</li>
          <li>State management with useState</li>
          <li>Event handling</li>
          <li>Basic styling with CSS</li>
        </ul>`,
      intermediate: `<h1>Intermediate: React Todo App</h1>
        <p>Add advanced features to your React todo app including persistence and advanced state management.</p>
        <h2>Advanced Features</h2>
        <ul>
          <li>Local storage persistence</li>
          <li>Todo categories and filtering</li>
          <li>Due dates and priorities</li>
          <li>Search functionality</li>
        </ul>`,
      advanced: `<h1>Advanced: React Todo App</h1>
        <p>Master React with complex state management, performance optimization, and modern patterns.</p>
        <h2>Advanced Concepts</h2>
        <ul>
          <li>Context API and useReducer</li>
          <li>Performance optimization with useMemo and useCallback</li>
          <li>Custom hooks</li>
          <li>Testing with Jest and React Testing Library</li>
        </ul>`,
    },
  }

  const slug = tutorialName.toLowerCase().replace(/\s+/g, '-')
  return (
    content[slug]?.[level] ||
    `<h1>${tutorialName} - ${level.charAt(0).toUpperCase() + level.slice(1)}</h1><p>Tutorial content for ${tutorialName} at ${level} level.</p>`
  )
}

function getDefaultMetadata(level: string): TutorialMetadata {
  const metadata = {
    beginner: {
      difficulty: 'beginner',
      estimatedTime: '30-45 minutes',
      prerequisites: ['Basic web development knowledge'],
      learningOutcomes: ['Understand basic concepts', 'Build a working application'],
    },
    level1: {
      difficulty: 'beginner',
      estimatedTime: '30-45 minutes',
      prerequisites: ['Basic web development knowledge'],
      learningOutcomes: ['Understand basic concepts', 'Build a working application'],
    },
    intermediate: {
      difficulty: 'intermediate',
      estimatedTime: '60-90 minutes',
      prerequisites: ['Basic programming knowledge', 'Completed beginner level'],
      learningOutcomes: ['Advanced features implementation', 'Best practices understanding'],
    },
    advanced: {
      difficulty: 'advanced',
      estimatedTime: '120+ minutes',
      prerequisites: ['Strong programming background', 'Completed previous levels'],
      learningOutcomes: [
        'Complex architecture patterns',
        'Performance optimization',
        'Testing strategies',
      ],
    },
  }

  return metadata[level] || metadata.intermediate
}
