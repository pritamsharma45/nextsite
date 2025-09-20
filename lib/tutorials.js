import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

function getTutorialNameFromSlug(slug) {
  const slugToName = {
    'drive-image-importer': 'Drive Image Importer',
    'react-todo-app': 'React Todo App',
  }

  return slugToName[slug] || slug
}

function getLanguageFromExtension(extension) {
  const languageMap = {
    '.html': 'markup',
    '.css': 'css',
    '.js': 'javascript',
    '.jsx': 'jsx',
    '.ts': 'typescript',
    '.tsx': 'tsx',
    '.json': 'json',
    '.gs': 'javascript', // Google Apps Script
    '.py': 'python',
    '.java': 'java',
    '.cpp': 'cpp',
    '.c': 'c',
    '.php': 'php',
    '.rb': 'ruby',
    '.go': 'go',
    '.rs': 'rust',
    '.sql': 'sql',
    '.sh': 'bash',
    '.bash': 'bash',
    '.md': 'markdown',
    '.xml': 'markup',
    '.yaml': 'yaml',
    '.yml': 'yaml',
  }

  return languageMap[extension] || 'markup'
}

export async function getTutorialLevelData(tutorialSlug, level) {
  // This runs on the server during build time
  const tutorialName = getTutorialNameFromSlug(tutorialSlug)
  const tutorialDataPath = path.join(
    process.cwd(),
    'data/tutorials',
    tutorialName,
    level,
    'tutorialData.md'
  )

  try {
    if (!fs.existsSync(tutorialDataPath)) {
      // Fallback to default content if no markdown file exists
      return {
        title: `${level.charAt(0).toUpperCase() + level.slice(1)} Level: ${tutorialName}`,
        description: `Learn ${tutorialName} at ${level} level`,
        content: `<h1>${
          level.charAt(0).toUpperCase() + level.slice(1)
        } Level: ${tutorialName}</h1><p>Content for this level is coming soon!</p>`,
        metadata: {
          level,
          difficulty: level,
          estimatedTime: '1-2 hours',
          prerequisites: [],
          learningOutcomes: [],
        },
      }
    }

    const fileContents = fs.readFileSync(tutorialDataPath, 'utf8')
    const { data, content } = matter(fileContents)

    // Convert markdown content to HTML
    const processedContent = await remark().use(html).process(content)
    const htmlContent = processedContent.toString()

    return {
      title:
        data.title || `${level.charAt(0).toUpperCase() + level.slice(1)} Level: ${tutorialName}`,
      description: data.description || `Learn ${tutorialName} at ${level} level`,
      content: htmlContent, // This is the converted HTML content
      metadata: {
        level: data.level || level,
        difficulty: data.difficulty || level,
        estimatedTime: data.estimatedTime || '1-2 hours',
        prerequisites: data.prerequisites || [],
        learningOutcomes: data.learningOutcomes || [],
        ...data, // Include any additional frontmatter data
      },
    }
  } catch (error) {
    console.error('Error reading tutorial data:', error)
    // Return fallback content
    return {
      title: `${level.charAt(0).toUpperCase() + level.slice(1)} Level: ${tutorialName}`,
      description: `Learn ${tutorialName} at ${level} level`,
      content: `<h1>${
        level.charAt(0).toUpperCase() + level.slice(1)
      } Level: ${tutorialName}</h1><p>Content for this level is coming soon!</p>`,
      metadata: {
        level,
        difficulty: level,
        estimatedTime: '1-2 hours',
        prerequisites: [],
        learningOutcomes: [],
      },
    }
  }
}

export function getCodeFiles(tutorialSlug, level) {
  // This runs on the server during build time
  const tutorialName = getTutorialNameFromSlug(tutorialSlug)
  const filesDir = path.join(process.cwd(), 'data/tutorials', tutorialName, level, 'files')

  try {
    if (!fs.existsSync(filesDir)) {
      return []
    }

    const files = fs
      .readdirSync(filesDir)
      .filter((file) => !file.startsWith('.'))
      .map((fileName) => {
        const filePath = path.join(filesDir, fileName)
        const content = fs.readFileSync(filePath, 'utf-8')
        const extension = path.extname(fileName).toLowerCase()

        return {
          name: fileName,
          content,
          language: getLanguageFromExtension(extension),
        }
      })
      .sort((a, b) => {
        // Sort by file importance (index.html first, then CSS, then JS)
        const order = ['index.html', '.html', '.css', '.js', '.gs', '.json']
        const aIndex = order.findIndex((ext) => a.name.toLowerCase().includes(ext))
        const bIndex = order.findIndex((ext) => b.name.toLowerCase().includes(ext))

        if (aIndex !== -1 && bIndex !== -1) {
          return aIndex - bIndex
        }
        if (aIndex !== -1) return -1
        if (bIndex !== -1) return 1
        return a.name.localeCompare(b.name)
      })

    return files
  } catch (error) {
    console.error('Error reading code files:', error)
    return []
  }
}

export function getAvailableTutorials() {
  const tutorialsDir = path.join(process.cwd(), 'data/tutorials')
  const tutorials = []

  try {
    if (!fs.existsSync(tutorialsDir)) {
      return tutorials
    }

    const tutorialFolders = fs
      .readdirSync(tutorialsDir, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name)

    for (const tutorialFolder of tutorialFolders) {
      const tutorialPath = path.join(tutorialsDir, tutorialFolder)
      const levels = fs
        .readdirSync(tutorialPath, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name)
        .sort()

      if (levels.length > 0) {
        const slug = tutorialFolder.toLowerCase().replace(/\s+/g, '-')

        tutorials.push({
          name: tutorialFolder,
          slug: slug,
          levels: levels,
        })
      }
    }
  } catch (error) {
    console.error('Error scanning tutorials:', error)
  }

  return tutorials
}
