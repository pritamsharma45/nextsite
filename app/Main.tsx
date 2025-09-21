import Link from '@/components/Link'
import Tag from '@/components/Tag'
import Image from '@/components/Image'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import projectsData from '@/data/projectsData'
import NewsletterForm from 'pliny/ui/NewsletterForm'

const MAX_DISPLAY = 3

interface PostData {
  slug: string
  date: string
  title: string
  summary?: string
  tags?: string[]
}

interface HomeProps {
  posts: PostData[]
}

export default function Home({ posts }: HomeProps) {
  return (
    <>
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 opacity-20">
          <div className="from-primary-100/20 dark:from-primary-900/20 absolute inset-0 bg-gradient-to-r to-purple-100/20 dark:to-purple-900/20"></div>
        </div>
        <div className="max-w-10xl relative mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8">
              <span className="bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 inline-flex items-center rounded-full px-4 py-2 text-sm font-medium">
                🚀 Welcome to the Future of Productivity
              </span>
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl dark:text-white">
              <span className="block">Building</span>
              <span className="from-primary-600 block bg-gradient-to-r via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Digital Solutions
              </span>
              <span className="block">That Matter</span>
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600 sm:text-xl dark:text-gray-300">
              I'm Pritam Sharma, a passionate developer creating productivity-boosting tools and
              sharing knowledge through
              <span className="text-primary-600 dark:text-primary-400 font-semibold">
                {' '}
                TechLever
              </span>
              . Let's build something amazing together.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/blog"
                className="group from-primary-600 focus:ring-primary-500 relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:ring-2 focus:ring-offset-2 focus:outline-none"
              >
                <span className="relative z-10">Explore My Work</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              </Link>
              <Link
                href="/about"
                className="hover:border-primary-500 hover:bg-primary-50 hover:text-primary-700 focus:ring-primary-500 dark:hover:border-primary-400 dark:hover:bg-primary-900 dark:hover:text-primary-300 inline-flex items-center justify-center rounded-lg border-2 border-gray-300 bg-white px-8 py-4 text-lg font-semibold text-gray-700 transition-all duration-300 focus:ring-2 focus:ring-offset-2 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
              >
                Learn More About Me
              </Link>
            </div>
            <div className="mt-12 flex items-center justify-center space-x-8 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  <div className="from-primary-400 h-8 w-8 rounded-full border-2 border-white bg-gradient-to-r to-purple-500"></div>
                  <div className="h-8 w-8 rounded-full border-2 border-white bg-gradient-to-r from-purple-400 to-pink-500"></div>
                  <div className="h-8 w-8 rounded-full border-2 border-white bg-gradient-to-r from-pink-400 to-red-500"></div>
                </div>
                <span className="ml-3">Join 1000+ developers</span>
              </div>
              <div className="flex items-center">
                <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="ml-1">4.9/5 Rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Me Section */}
      <div className="bg-white py-20 dark:bg-gray-900">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              Why Choose{' '}
              <span className="from-primary-600 bg-gradient-to-r to-purple-600 bg-clip-text text-transparent">
                TechLever
              </span>
              ?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              I combine technical expertise with a deep understanding of real-world productivity
              challenges
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="group from-primary-50 relative overflow-hidden rounded-2xl bg-gradient-to-br to-purple-50 p-8 transition-all duration-300 hover:shadow-xl dark:from-gray-800 dark:to-gray-700">
              <div className="from-primary-200 dark:from-primary-800 absolute -top-4 -right-4 h-24 w-24 rounded-full bg-gradient-to-r to-purple-200 opacity-20 dark:to-purple-800"></div>
              <div className="relative">
                <div className="from-primary-500 mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r to-purple-500">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Lightning Fast Solutions
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Get productivity tools that work immediately. No complex setup, no learning curve
                  - just results.
                </p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 p-8 transition-all duration-300 hover:shadow-xl dark:from-gray-800 dark:to-gray-700">
              <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-gradient-to-r from-purple-200 to-pink-200 opacity-20 dark:from-purple-800 dark:to-pink-800"></div>
              <div className="relative">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
                  <svg
                    className="h-6 w-6 text-white"
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
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Proven Track Record
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Over 1000+ developers trust my solutions. Real projects, real results, real impact
                  on daily workflows.
                </p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-pink-50 to-red-50 p-8 transition-all duration-300 hover:shadow-xl dark:from-gray-800 dark:to-gray-700">
              <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-gradient-to-r from-pink-200 to-red-200 opacity-20 dark:from-pink-800 dark:to-red-800"></div>
              <div className="relative">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-pink-500 to-red-500">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Passionate Support
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  I genuinely care about your success. Every tool is crafted with love and backed by
                  comprehensive support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Blog Posts */}
      {posts.length > 0 && (
        <div className="py-12">
          <div className="space-y-2 pb-8 md:space-y-5">
            <h2 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 dark:text-gray-100">
              Latest Posts
            </h2>
            <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
              Stay updated with my latest thoughts and tutorials
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
              const { slug, date, title, summary, tags } = frontMatter
              return (
                <article key={slug} className="group relative">
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                      </div>
                      <h3 className="text-xl leading-8 font-semibold tracking-tight">
                        <Link
                          href={`/blog/${slug}`}
                          className="group-hover:text-primary-600 dark:group-hover:text-primary-400 text-gray-900 dark:text-gray-100"
                        >
                          {title}
                        </Link>
                      </h3>
                      <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                        {summary || ''}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Link
                        href={`/blog/${slug}`}
                        className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium"
                      >
                        Read more →
                      </Link>
                      {tags && tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {tags.slice(0, 2).map((tag) => (
                            <Tag key={tag} text={tag} />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
          {posts.length > MAX_DISPLAY && (
            <div className="mt-8 text-center">
              <Link
                href="/blog"
                className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 inline-flex items-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm focus:ring-2 focus:ring-offset-2 focus:outline-none"
              >
                View All Posts
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Testimonials Section */}
      <div className="from-primary-50 bg-gradient-to-r to-purple-50 py-20 dark:from-gray-800 dark:to-gray-700">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              What Developers Are Saying
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              Don't just take my word for it - hear from the community
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3 xl:grid-cols-4">
            <div className="rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-900">
              <div className="flex items-center">
                <div className="from-primary-500 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r to-purple-500">
                  <span className="text-sm font-semibold text-white">AS</span>
                </div>
                <div className="ml-4">
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">
                    Alex Smith
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Senior Developer</div>
                </div>
              </div>
              <blockquote className="mt-4 text-gray-600 dark:text-gray-300">
                "Pritam's Google Apps Script tutorials saved me hours of manual work. The task
                manager tool he built is now essential to our team's workflow. Highly recommended!"
              </blockquote>
              <div className="mt-4 flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            <div className="rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-900">
              <div className="flex items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
                  <span className="text-sm font-semibold text-white">MJ</span>
                </div>
                <div className="ml-4">
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">
                    Maria Johnson
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Product Manager</div>
                </div>
              </div>
              <blockquote className="mt-4 text-gray-600 dark:text-gray-300">
                "The incident management web app Pritam created streamlined our entire process. What
                used to take hours now takes minutes. The ROI was immediate!"
              </blockquote>
              <div className="mt-4 flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            <div className="rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-900">
              <div className="flex items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-red-500">
                  <span className="text-sm font-semibold text-white">DK</span>
                </div>
                <div className="ml-4">
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">
                    David Kim
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Freelance Developer
                  </div>
                </div>
              </div>
              <blockquote className="mt-4 text-gray-600 dark:text-gray-300">
                "TechLever's content is gold! The step-by-step tutorials and real-world examples
                helped me land my first major client. The community support is incredible."
              </blockquote>
              <div className="mt-4 flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Section */}
      {projectsData.length > 0 && (
        <div className="py-12">
          <div className="space-y-2 pb-8 md:space-y-5">
            <h2 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 dark:text-gray-100">
              Featured Projects
            </h2>
            <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
              Check out some of my recent work and productivity tools
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {projectsData.slice(0, 3).map((project) => (
              <div key={project.title} className="group relative">
                <div className="space-y-4">
                  <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700">
                    {project.imgSrc && (
                      <Image
                        src={project.imgSrc}
                        alt={project.title}
                        width={400}
                        height={200}
                        className="h-48 w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl leading-8 font-semibold tracking-tight text-gray-900 dark:text-gray-100">
                      {project.href ? (
                        <Link
                          href={project.href}
                          className="group-hover:text-primary-600 dark:group-hover:text-primary-400"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {project.title}
                        </Link>
                      ) : (
                        <span className="group-hover:text-primary-600 dark:group-hover:text-primary-400">
                          {project.title}
                        </span>
                      )}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">{project.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/projects"
              className="focus:ring-primary-500 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              View All Projects
            </Link>
          </div>
        </div>
      )}

      {/* Workflows Section */}
      <div className="bg-white py-20 dark:bg-gray-900">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              My{' '}
              <span className="from-primary-600 bg-gradient-to-r to-purple-600 bg-clip-text text-transparent">
                Development Process
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              From concept to deployment - here's how I bring ideas to life
            </p>
          </div>
          <div className="mt-16">
            <div className="flow-root">
              <ul className="-mb-8">
                <li>
                  <div className="relative pb-8">
                    <div className="relative flex space-x-3">
                      <div className="from-primary-500 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r to-purple-500 ring-8 ring-white dark:ring-gray-900">
                        <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Discovery & Research
                          </h3>
                          <p className="mt-2 text-gray-600 dark:text-gray-300">
                            I start by understanding your pain points, analyzing existing solutions,
                            and identifying opportunities for improvement. This phase includes user
                            interviews, competitive analysis, and technical feasibility studies.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="relative pb-8">
                    <div className="relative flex space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 ring-8 ring-white dark:ring-gray-900">
                        <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Planning & Architecture
                          </h3>
                          <p className="mt-2 text-gray-600 dark:text-gray-300">
                            Next, I create detailed wireframes, user flows, and technical
                            architecture. This includes choosing the right tech stack, defining
                            APIs, and planning for scalability and maintainability.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="relative pb-8">
                    <div className="relative flex space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-red-500 ring-8 ring-white dark:ring-gray-900">
                        <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Development & Testing
                          </h3>
                          <p className="mt-2 text-gray-600 dark:text-gray-300">
                            I build the solution using modern development practices, including
                            version control, automated testing, and code reviews. Regular check-ins
                            ensure we're on track and meeting your requirements.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="relative">
                    <div className="relative flex space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-orange-500 ring-8 ring-white dark:ring-gray-900">
                        <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Deployment & Support
                          </h3>
                          <p className="mt-2 text-gray-600 dark:text-gray-300">
                            Finally, I deploy your solution with proper monitoring and
                            documentation. I provide ongoing support, maintenance, and feature
                            updates to ensure your tool continues to deliver value.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      {siteMetadata.newsletter?.provider && (
        <div className="py-12">
          <div className="mx-auto max-w-4xl text-center">
            <div className="rounded-xl border border-gray-200 bg-white/60 p-8 shadow dark:border-gray-700 dark:bg-gray-900/60">
              <NewsletterForm />
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="from-primary-600 bg-gradient-to-r via-purple-600 to-pink-600 py-20">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Ready to Transform Your Workflow?
            </h2>
            <p className="text-primary-100 mx-auto mt-6 max-w-2xl text-lg sm:text-xl">
              Let's build something amazing together. Whether you need a custom solution, want to
              learn new skills, or just want to connect with a fellow developer.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/about"
                className="group text-primary-600 focus:ring-offset-primary-600 relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-white px-8 py-4 text-lg font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:ring-2 focus:ring-white focus:ring-offset-2 focus:outline-none"
              >
                <span className="relative z-10">Get In Touch</span>
                <div className="from-primary-50 absolute inset-0 bg-gradient-to-r to-purple-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              </Link>
              <Link
                href="/blog"
                className="hover:text-primary-600 focus:ring-offset-primary-600 inline-flex items-center justify-center rounded-lg border-2 border-white px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:outline-none"
              >
                Explore My Content
              </Link>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">1000+</div>
                <div className="text-primary-100">Happy Developers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">50+</div>
                <div className="text-primary-100">Projects Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">4.9/5</div>
                <div className="text-primary-100">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="py-12">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
            Connect With Me
          </h2>
          <div className="flex justify-center space-x-6">
            {siteMetadata.github && (
              <Link
                href={siteMetadata.github}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </Link>
            )}
            {siteMetadata.twitter && (
              <Link
                href={siteMetadata.twitter}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </Link>
            )}
            {siteMetadata.linkedin && (
              <Link
                href={siteMetadata.linkedin}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </Link>
            )}
            {siteMetadata.youtube && (
              <Link
                href={siteMetadata.youtube}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">YouTube</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
