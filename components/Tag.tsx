import Link from 'next/link'
import { slug } from 'github-slugger'
interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link href={`/tags/${slug(text)}`}>
      <span className="rounded-full px-4 py-1.5 text-sm/6 text-pink-600 ring-1 ring-gray-200 ring-inset hover:ring-gray-900/20">
        {text.split(' ').join('-')}
      </span>
    </Link>
  )
}

export default Tag
