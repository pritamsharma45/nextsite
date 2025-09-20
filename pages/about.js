import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Image from '@/components/Image'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

export default function About() {
  return (
    <>
      <PageSEO
        title={`About - ${siteMetadata.author}`}
        description={`About me - ${siteMetadata.author}`}
      />
      {/* About Content */}
      <div className="bg-white py-20 dark:bg-gray-900">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Personal Story */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
                  My Story
                </h2>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                  My journey into the world of development started with a simple curiosity about how
                  websites work. What began as a hobby quickly evolved into a passion for creating
                  tools that make people's lives easier.
                </p>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                  Over the years, I've specialized in building productivity-focused applications
                  using modern web technologies, and I love sharing my knowledge through{' '}
                  <strong className="text-primary-600 dark:text-primary-400">TechLever</strong>.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">What I Do</h3>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                  I specialize in creating custom productivity solutions that integrate seamlessly
                  with existing workflows. My expertise spans web development, Google Apps Script
                  automation, and building tools that actually solve real problems.
                </p>
              </div>
            </div>

            {/* Skills & Expertise */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Skills & Expertise
                </h3>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  {[
                    'JavaScript',
                    'React',
                    'Next.js',
                    'Node.js',
                    'Google Apps Script',
                    'Python',
                    'Web Development',
                    'Productivity Tools',
                  ].map((skill) => (
                    <div
                      key={skill}
                      className="rounded-lg bg-gradient-to-r from-primary-50 to-purple-50 px-4 py-3 text-center font-medium text-gray-900 dark:from-gray-800 dark:to-gray-700 dark:text-white"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Experience</h3>
                <div className="mt-4 space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-primary-500 to-purple-500">
                      <span className="text-sm font-bold text-white">5+</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        Years of Experience
                      </div>
                      <div className="text-gray-600 dark:text-gray-300">
                        Building productivity solutions
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
                      <span className="text-sm font-bold text-white">1000+</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        Happy Developers
                      </div>
                      <div className="text-gray-600 dark:text-gray-300">Using my solutions</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* YouTube Channel Section */}
      <div className="bg-gradient-to-r from-primary-50 to-purple-50 py-20 dark:from-gray-800 dark:to-gray-700">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              My{' '}
              <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                YouTube Channel
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              Sharing knowledge through comprehensive tutorials and real-world examples
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-900">
              <div className="flex items-center space-x-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-pink-500">
                  <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    TechLever Channel
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">@tech-lever</p>
                </div>
              </div>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                Join me on YouTube where I share step-by-step tutorials on Google Apps Script,
                productivity tools, and web development. From beginner-friendly guides to advanced
                automation techniques, there's something for everyone.
              </p>
              <div className="mt-6">
                <Link
                  href={siteMetadata.youtube}
                  className="inline-flex items-center rounded-lg bg-gradient-to-r from-red-500 to-pink-500 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  Subscribe to TechLever
                </Link>
              </div>
            </div>
            <div className="space-y-6">
              <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Content Focus
                </h4>
                <ul className="mt-3 space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-4 w-4 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Google Apps Script Tutorials
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-4 w-4 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Productivity Tool Development
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-4 w-4 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Web Development Guides
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-4 w-4 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Real-world Project Walkthroughs
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Values */}
      <div className="bg-white py-20 dark:bg-gray-900">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              My Mission & Values
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              What drives me to create and share knowledge
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-primary-500 to-purple-500">
                <svg
                  className="h-8 w-8 text-white"
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
              <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                Simplicity First
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                I believe technology should serve people, not the other way around. Every solution I
                create focuses on simplicity and ease of use.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
                <svg
                  className="h-8 w-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                Knowledge Sharing
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                I'm passionate about sharing knowledge and helping others grow. Through tutorials
                and guides, I aim to make complex topics accessible.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-red-500">
                <svg
                  className="h-8 w-8 text-white"
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
              <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                Real Impact
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Every tool I create is designed to solve real problems and make a genuine impact on
                people's daily workflows and productivity.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 py-20">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Let's Work Together
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-primary-100 sm:text-xl">
              Whether you need a custom solution, want to learn something new, or just want to
              connect with a fellow developer, I'm here to help!
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href={`mailto:${siteMetadata.email}`}
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-white px-8 py-4 text-lg font-semibold text-primary-600 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600"
              >
                <span className="relative z-10">Get In Touch</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-50 to-purple-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              </Link>
              <Link
                href={siteMetadata.youtube}
                className="inline-flex items-center justify-center rounded-lg border-2 border-white px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-white hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch My Videos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
