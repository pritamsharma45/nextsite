import React, { useState } from 'react'
import { DiscussionEmbed } from 'disqus-react'

import siteMetadata from '@/data/siteMetadata'

const Disqus = ({ frontMatter }) => {
  const [enableLoadComments, setEnabledLoadComments] = useState(true)

  const COMMENTS_ID = 'disqus_thread'

  function LoadComments() {
    setEnabledLoadComments(false)

    window.disqus_config = function () {
      this.page.url = window.location.href
      this.page.identifier = frontMatter.slug
    }
    if (window.DISQUS === undefined) {
      const script = document.createElement('script')
      // script.src = 'https://' + siteMetadata.comment.disqusConfig.shortname + '.disqus.com/embed.js'
      script.src = 'https://techlever.disqus.com/embed.js'
      script.setAttribute('data-timestamp', +new Date())
      script.setAttribute('crossorigin', 'anonymous')
      script.async = true
      document.body.appendChild(script)
    } else {
      window.DISQUS.reset({ reload: true })
    }
  }

  return (
    <div className="pt-6 pb-6 text-center text-gray-700 dark:text-gray-300">
      {enableLoadComments && <button onClick={LoadComments}>Load Comments</button>}
      <div className="disqus-frame" id={COMMENTS_ID} />
    </div>
  )
}

export default Disqus

// const Disqus = ({ frontMatter }) => {
//   const disqusShortname = 'techlever';
//   const disqusConfig = {
//     url: window.location.href,
//     identifier: frontMatter.slug, // Single post id
//     title: frontMatter.title, // Single post title
//   }
//   return (
//     <div>
//       <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
//     </div>
//   )
// }
// export default Disqus
