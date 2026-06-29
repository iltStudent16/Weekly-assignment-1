import {
  createContext,
  useMemo,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from 'react'
import { useBookmarksData } from '../hooks/useBookmarksData'
import { useLocalStorage } from '../hooks/useLocalStorage'
import type { Bookmark } from '../types'

interface BookmarksContextValue {
  bookmarks: Bookmark[]
  setBookmarks: Dispatch<SetStateAction<Bookmark[]>>
  loading: boolean
  error: string | null
}

const BookmarksContext = createContext<BookmarksContextValue | undefined>(undefined)

interface BookmarksProviderProps {
  children: ReactNode
}

export function BookmarksProvider({ children }: BookmarksProviderProps) {
  const { data, loading, error } = useBookmarksData()
  const [bookmarks, setBookmarks] = useLocalStorage<Bookmark[]>('bookmarks', [])

  const value = useMemo(() => {
    const mergedBookmarks = bookmarks.length > 0 ? bookmarks : data

    return {
      bookmarks: mergedBookmarks,
      setBookmarks,
      loading,
      error,
    }
  }, [bookmarks, data, error, loading, setBookmarks])

  return (
    <BookmarksContext.Provider value={value}>
      {children}
    </BookmarksContext.Provider>
  )
}

export { BookmarksContext }
