import { Link } from 'react-router-dom'
import { Card } from '../components/Card'
import { useBookmarksContext } from '../context/useBookmarksContext'

export function BookmarksListView() {
  const { bookmarks, loading, error } = useBookmarksContext()

  if (loading) {
    return <p role="status">Loading bookmarks...</p>
  }

  if (error) {
    return <p role="alert">{error}</p>
  }

  return (
    <Card title="Saved Links">
      {bookmarks.length === 0 ? (
        <p>No bookmarks found. Add one to get started.</p>
      ) : (
        <ul className="bookmark-list">
          {bookmarks.map((bookmark) => (
            <li key={bookmark.id}>
              <h3>{bookmark.title}</h3>
              <p>{bookmark.category}</p>
              <Link to={`/bookmark/${bookmark.id}`}>View details</Link>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}
