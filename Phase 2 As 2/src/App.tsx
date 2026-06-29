import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { BookmarksProvider } from './context/BookmarksContext'
import { AddBookmarkView } from './views/AddBookmarkView'
import { BookmarkDetailView } from './views/BookmarkDetailView'
import { BookmarksListView } from './views/BookmarksListView'

function App() {
  return (
    <BookmarksProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<BookmarksListView />} />
          <Route path="/bookmark/:id" element={<BookmarkDetailView />} />
          <Route path="/add" element={<AddBookmarkView />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BookmarksProvider>
  )
}

export default App
