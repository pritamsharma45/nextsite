import { useRef, useState } from 'react'
// import { HiOutlineMail } from 'react-icons/hi'

import siteMetadata from '@/data/siteMetadata'

const NewsletterForm = ({ title = 'Stay up to date' }) => {
  const inputEl = useRef(null)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const subscribe = async (e) => {
    e.preventDefault()

    const res = await fetch(`/api/${siteMetadata.newsletter.provider}`, {
      body: JSON.stringify({
        email: inputEl.current.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    const { error } = await res.json()
    if (error) {
      setError(true)
      setMessage('Your e-mail address is invalid or you are already subscribed!')
      return
    }

    inputEl.current.value = ''
    setError(false)
    setSubscribed(true)
    setMessage('Successfully! 🎉 You are now subscribed.')
  }

  return (
    <div className="">
      <div className="mb-2 flex items-center gap-2">
        <span className="rounded-md bg-gray-200 p-2 dark:bg-gray-700">
          {/* <HiOutlineMail className="h-6 w-6 text-gray-600 dark:text-gray-300" /> */}
        </span>
        <span className="text-lg font-bold text-gray-900 dark:text-gray-100">{title}</span>
      </div>
      <div className="mb-3 text-base text-gray-700 dark:text-gray-300">
        Get notified when I publish something new, and unsubscribe at any time.
      </div>
      <form className="flex flex-col gap-2 sm:flex-row" onSubmit={subscribe}>
        <input
          autoComplete="email"
          className="flex-1 rounded-md border border-gray-300 px-4 py-2 focus:border-black focus:outline-none focus:ring-2 focus:ring-black dark:border-gray-700 dark:bg-black dark:text-white"
          id="email-input"
          name="email"
          placeholder={subscribed ? "You're subscribed !  🎉" : 'Email address'}
          ref={inputEl}
          required
          type="email"
          disabled={subscribed}
        />
        <button
          className={`rounded-md bg-black px-6 py-2 font-medium text-white transition-colors duration-200 ${
            subscribed ? 'cursor-default opacity-70' : 'hover:bg-gray-800'
          } focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 dark:bg-white dark:text-black dark:hover:bg-gray-200`}
          type="submit"
          disabled={subscribed}
        >
          {subscribed ? 'Thank you!' : 'Join'}
        </button>
      </form>
      {error && <div className="pt-2 text-sm text-red-500 dark:text-red-400">{message}</div>}
    </div>
  )
}

export default NewsletterForm

export const BlogNewsletterForm = ({ title }) => (
  <div className="flex items-center justify-center">
    <div className="w-full rounded-xl border border-gray-200 bg-white/60 p-6 shadow dark:border-gray-700 dark:bg-gray-900/60 sm:px-10 sm:py-8">
      <NewsletterForm title={title} />
    </div>
  </div>
)
