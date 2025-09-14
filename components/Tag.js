import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'

const Tag = ({ text }) => {
  return (
    <Link href={`/tags/${kebabCase(text)}`}>
      <a>
        <span className="text-sm/6 rounded-full px-4 py-1.5 text-pink-600 ring-1 ring-inset ring-gray-200 hover:ring-gray-900/20">
          {text.split(' ').join('-')}
        </span>
      </a>
    </Link>
  )
}

export default Tag
