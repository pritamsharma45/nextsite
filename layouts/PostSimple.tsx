import { ReactNode } from 'react'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import YoutubeSidebar from '@/components/YoutubeSidebar'
import Tag from '@/components/Tag'

interface LayoutProps {
  content: CoreContent<Blog>
  children: ReactNode
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
}

export default function PostLayout({ content, next, prev, children }: LayoutProps) {
  const { path, slug, date, title, tags } = content

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <header>
        <div className="space-y-1 pb-10 text-center">
          <dl>
            <div>
              <dt className="sr-only">Published on</dt>
              <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
              </dd>
            </div>
          </dl>
          <div>
            <PageTitle>{title}</PageTitle>
          </div>
          <div className="my-8 flex flex-wrap items-center justify-center gap-2">
            {tags.map((tag) => (
              <Tag key={tag} text={`#${tag}`} />
            ))}
          </div>
        </div>
      </header>
      <div className="flex flex-col lg:flex-row lg:gap-8 xl:gap-12">
        {/* Main content area */}
        <article className="min-w-0 flex-1">
          <div>
            <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 xl:divide-y-0 dark:divide-gray-700">
              <div className="divide-y divide-gray-200 xl:col-span-3 xl:row-span-2 xl:pb-0 dark:divide-gray-700">
                <div className="prose dark:prose-invert max-w-none pt-10 pb-8">{children}</div>
              </div>
              {siteMetadata.comments && (
                <div
                  className="pt-6 pb-6 text-center text-gray-700 dark:text-gray-300"
                  id="comment"
                >
                  <Comments slug={slug} />
                </div>
              )}
              <footer>
                <div className="flex flex-col text-sm font-medium sm:flex-row sm:justify-between sm:text-base">
                  {prev && prev.path && (
                    <div className="pt-4 xl:pt-8">
                      <Link
                        href={`/${prev.path}`}
                        className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                        aria-label={`Previous post: ${prev.title}`}
                      >
                        &larr; {prev.title}
                      </Link>
                    </div>
                  )}
                  {next && next.path && (
                    <div className="pt-4 xl:pt-8">
                      <Link
                        href={`/${next.path}`}
                        className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                        aria-label={`Next post: ${next.title}`}
                      >
                        {next.title} &rarr;
                      </Link>
                    </div>
                  )}
                </div>
              </footer>
            </div>
          </div>
        </article>

        {/* Right sidebar */}
        <aside className="mt-8 w-full flex-shrink-0 lg:mt-0 lg:w-80 xl:w-48">
          <div className="sticky top-8">
            <h3 className="mt-10 mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
              Related Videos
            </h3>
            <YoutubeSidebar
              playlistId="PLFmoTa4E3esuwfdH_tJoOIaaBj9u44R4y"
              apiKey="AIzaSyAsE1ceA5UaeplcLv44FHFRR7T4ip37NuA"
            />
          </div>
        </aside>
      </div>
    </SectionContainer>
  )
}
