import Link from 'next/link'
import 'css/prismCustom.css'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { genPageMetadata } from 'app/seo'
import CodeTabs from '@/components/CodeTabs'
import TutorialLevelClient from './TutorialLevelClient'
import { getAvailableTutorials, getTutorialLevelData, getCodeFiles } from '@/lib/tutorials'
import type { TutorialLevelData, CodeFile } from '@/lib/tutorials'

interface TutorialLevelPageProps {
  params: Promise<{ tutorial: string; level: string }>
}

interface TutorialData {
  name: string
  slug: string
  level: string
  levels: string[]
  title: string
  description: string
}

function getTutorialData(tutorialSlug: string, level: string): TutorialData | null {
  const tutorials = getAvailableTutorials()
  const tutorial = tutorials.find((t) => t.slug === tutorialSlug)

  if (!tutorial || !tutorial.levels.includes(level)) {
    return null
  }

  return {
    name: tutorial.name,
    slug: tutorialSlug,
    level: level,
    levels: tutorial.levels,
    title: `${tutorial.name} - ${level.charAt(0).toUpperCase() + level.slice(1)} Level`,
    description: `Learn ${tutorial.name} at ${level} level`,
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
  const params: Array<{ tutorial: string; level: string }> = []

  tutorials.forEach((tutorial) => {
    tutorial.levels.forEach((level) => {
      params.push({
        tutorial: tutorial.slug,
        level: level,
      })
    })
  })

  return params
}

export async function generateMetadata(props: TutorialLevelPageProps): Promise<Metadata> {
  const params = await props.params
  const tutorialData = getTutorialData(params.tutorial, params.level)

  if (!tutorialData) {
    return genPageMetadata({
      title: 'Tutorial Not Found',
      description: 'The requested tutorial level could not be found.',
    })
  }

  return genPageMetadata({
    title: tutorialData.title,
    description: tutorialData.description,
  })
}

export default async function TutorialLevelPage(props: TutorialLevelPageProps) {
  const params = await props.params
  const tutorialData = getTutorialData(params.tutorial, params.level)

  if (!tutorialData) {
    notFound()
  }

  // Load level data and code files on the server
  const [levelData, codeFiles] = await Promise.all([
    getTutorialLevelData(params.tutorial, params.level),
    Promise.resolve(getCodeFiles(params.tutorial, params.level)),
  ])

  return (
    <TutorialLevelClient tutorialData={tutorialData} levelData={levelData} codeFiles={codeFiles} />
  )
}
