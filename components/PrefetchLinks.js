import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

// Smart prefetching component for critical navigation paths
const PrefetchLinks = () => {
  const router = useRouter()

  useEffect(() => {
    // Prefetch critical pages on page load
    const criticalPaths = ['/blog', '/projects', '/about', '/tutorials']

    criticalPaths.forEach((path) => {
      if (router.pathname !== path) {
        router.prefetch(path)
      }
    })
  }, [router])

  return (
    <>
      {/* Hidden prefetch links for SEO and performance */}
      <div style={{ display: 'none' }}>
        <Link href="/blog" prefetch={true}>
          <a>Blog</a>
        </Link>
        <Link href="/projects" prefetch={true}>
          <a>Projects</a>
        </Link>
        <Link href="/about" prefetch={true}>
          <a>About</a>
        </Link>
        <Link href="/tutorials" prefetch={true}>
          <a>Tutorials</a>
        </Link>
      </div>
    </>
  )
}

export default PrefetchLinks
