import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import siteMetadata from '@/data/siteMetadata'
import Main from './Main'

export const metadata = genPageMetadata({
  title: siteMetadata.title,
  description: siteMetadata.description,
})

export default async function Page() {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)
  return <Main posts={posts} />
}
