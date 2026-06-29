import { useEffect, useState } from 'react'
import type { Bookmark } from '../types'

interface UseBookmarksDataResult {
  data: Bookmark[]
  loading: boolean
  error: string | null
}

export function useBookmarksData(): UseBookmarksDataResult {
  const [data, setData] = useState<Bookmark[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchBookmarks() {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch('/bookmarks.json', {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error('Could not load bookmarks.')
        }

        const json = (await response.json()) as Bookmark[]
        setData(json)
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          return
        }

        setError('Failed to fetch bookmarks. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchBookmarks()

    return () => {
      controller.abort()
    }
  }, [])

  return { data, loading, error }
}
