import { Link, useParams } from 'react-router-dom'
import { Card } from '../components/Card'
import { useBookmarksContext } from '../context/useBookmarksContext'

export function BookmarkDetailView() {
  const { id } = useParams<{ id: string }>()
  const { bookmarks, loading, error } = useBookmarksContext()

  if (loading) {
    return <p role="status">Loading bookmark details...</p>
  }

  if (error) {
    return <p role="alert">{error}</p>
  }

  const bookmark = bookmarks.find((item) => item.id === id)

  if (!bookmark) {
    return (
      <Card title="Bookmark not found">
        <p>We could not find a bookmark with that id.</p>
        <Link to="/">Back to list</Link>
      </Card>
    )
  }

  return (
    <Card title="Bookmark Details">
      <dl className="bookmark-detail">
        <dt>Title</dt>
        <dd>{bookmark.title}</dd>

        <dt>URL</dt>
        <dd>
          <a href={bookmark.url} target="_blank" rel="noreferrer">
            {bookmark.url}
          </a>
        </dd>

        <dt>Category</dt>
        <dd>{bookmark.category}</dd>

        <dt>Owner Email</dt>
        <dd>{bookmark.ownerEmail}</dd>

        <dt>Notes</dt>
        <dd>{bookmark.notes || 'No notes provided.'}</dd>
      </dl>
      <Link to="/">Back to list</Link>
    </Card>
  )
}
