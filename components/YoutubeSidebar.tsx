'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface YouTubeVideo {
  id: string
  snippet: {
    title: string
    description: string
    resourceId: {
      videoId: string
    }
    thumbnails: {
      medium: {
        url: string
        width: number
        height: number
      }
      high?: {
        url: string
        width: number
        height: number
      }
    }
  }
}

interface YouTubePlaylistResponse {
  items: YouTubeVideo[]
}

interface YoutubeSidebarProps {
  playlistId: string
  apiKey: string
  maxResults?: number
}

export default function YoutubeSidebar({
  playlistId,
  apiKey,
  maxResults = 5,
}: YoutubeSidebarProps) {
  const [videos, setVideos] = useState<YouTubeVideo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function getVideos() {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=${maxResults}&key=${apiKey}`
        )

        if (!response.ok) {
          throw new Error(`Failed to fetch videos: ${response.status}`)
        }

        const data: YouTubePlaylistResponse = await response.json()
        setVideos(data.items || [])
      } catch (err) {
        console.error('Error fetching YouTube videos:', err)
        setError(err instanceof Error ? err.message : 'Failed to load videos')
      } finally {
        setLoading(false)
      }
    }

    if (playlistId && apiKey) {
      getVideos()
    }
  }, [playlistId, apiKey, maxResults])

  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        {Array.from({ length: maxResults }).map((_, index) => (
          <div key={index} className="space-y-2">
            <div
              className="animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700"
              style={{ aspectRatio: '16/9', width: '200px', height: '112px' }}
            />
            <div className="h-3 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-3 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/20">
        <p className="text-sm text-red-600 dark:text-red-400">Error loading videos: {error}</p>
      </div>
    )
  }

  if (videos.length === 0) {
    return (
      <div className="rounded-md bg-gray-50 p-4 dark:bg-gray-800">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          No videos found in this playlist.
        </p>
      </div>
    )
  }

  return (
    <ul className="flex flex-col gap-4">
      {videos.map((video) => (
        <li key={video.id}>
          <Link
            href={`https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group block h-fit"
          >
            <div className="relative h-[112px] w-full overflow-hidden rounded-lg">
              <Image
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title || 'YouTube video thumbnail'}
                fill
                className="object-cover transition-transform duration-200 group-hover:scale-105"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkrHR4f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <div className="rounded-full bg-red-600 p-2">
                  <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Video title */}
            <h3 className="group-hover:text-primary-600 dark:group-hover:text-primary-400 mt-2 line-clamp-2 w-[200px] text-xs font-medium text-gray-900 dark:text-gray-100">
              {video.snippet.title}
            </h3>
          </Link>
        </li>
      ))}
    </ul>
  )
}
