import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import { BlogSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import formatDate from '@/lib/utils/formatDate'
import Comments from '@/components/comments'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import YoutubeSidebar from '@/components/YoutubeSidebar'
import Tag from '@/components/Tag'
import { BlogNewsletterForm } from '@/components/NewsletterForm'

export default function PostLayout({ frontMatter, authorDetails, next, prev, children }) {
  const { date, title, tags } = frontMatter

  return (
    <SectionContainer>
      <BlogSEO url={`${siteMetadata.siteUrl}/blog/${frontMatter.slug}`} {...frontMatter} />
      <ScrollTopAndComment />
      <header>
        <div className="mx-auto max-w-5xl text-center">
          <dl>
            <div>
              <dt className="sr-only">Published on</dt>
              <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                <time dateTime={date}>{formatDate(date)}</time>
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
      <div
        className="mx-auto grid max-w-2xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-5"
        style={{ height: 'auto !important' }}
      >
        <article className="xl:col-span-3">
          <div
            className="divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:divide-y-0 "
            style={{ gridTemplateRows: 'auto 1fr' }}
          >
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose max-w-none pt-10 pb-8 dark:prose-dark">{children}</div>
            </div>
            <Comments frontMatter={frontMatter} />
            <footer>
              <div className="flex flex-col text-sm font-medium sm:flex-row sm:justify-between sm:text-base">
                {prev && (
                  <div className="pt-4 xl:pt-8">
                    <Link
                      href={`/blog/${prev.slug}`}
                      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      &larr; {prev.title}
                    </Link>
                  </div>
                )}
                {next && (
                  <div className="pt-4 xl:pt-8">
                    <Link
                      href={`/blog/${next.slug}`}
                      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      {next.title} &rarr;
                    </Link>
                  </div>
                )}
              </div>
            </footer>
          </div>
        </article>
        <div className="space-y-10 pl-0 lg:col-span-2 lg:pl-16">
          {/* <BlogNewsletterForm title="Stay up to date" /> */}
          <YoutubeSidebar
            playlistId="PLFmoTa4E3esuwfdH_tJoOIaaBj9u44R4y"
            apiKey="AIzaSyAsE1ceA5UaeplcLv44FHFRR7T4ip37NuA"
          />
        </div>
      </div>
    </SectionContainer>
  )
}
