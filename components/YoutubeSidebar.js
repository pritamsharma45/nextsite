import React, { useEffect, useState } from 'react'

export default function YoutubeSidebar({ playlistId, apiKey }) {
  const [videos, setVideos] = useState([])

  useEffect(() => {
    async function getVideos() {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=5&key=${apiKey}`
      )
      const data = await res.json()
      setVideos(data.items || [])
    }
    getVideos()
  }, [playlistId, apiKey])

  return (
    <ul className="flex flex-col gap-8">
      {videos.map((video) => (
        <li key={video.id}>
          <a
            href={`https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="h-fit"
          >
            <img
              src={video.snippet.thumbnails.medium.url}
              alt="YouTube video thumbnail"
              className="rounded-md transition-transform duration-200 hover:scale-110 hover:shadow-lg"
            />
          </a>
        </li>
      ))}
    </ul>
  )
}
