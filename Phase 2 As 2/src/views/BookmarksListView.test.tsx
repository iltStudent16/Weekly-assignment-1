import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { BookmarksListView } from './BookmarksListView'
import { useBookmarksContext } from '../context/useBookmarksContext'

vi.mock('../context/useBookmarksContext', () => ({
  useBookmarksContext: vi.fn(),
}))

describe('BookmarksListView', () => {
  it('renders loading and error states', () => {
    const mockedUseBookmarksContext = vi.mocked(useBookmarksContext)

    mockedUseBookmarksContext.mockReturnValue({
      bookmarks: [],
      setBookmarks: vi.fn(),
      loading: true,
      error: null,
    })

    const { rerender } = render(
      <MemoryRouter>
        <BookmarksListView />
      </MemoryRouter>,
    )

    expect(screen.getByRole('status')).toHaveTextContent(/loading bookmarks/i)

    mockedUseBookmarksContext.mockReturnValue({
      bookmarks: [],
      setBookmarks: vi.fn(),
      loading: false,
      error: 'Something went wrong',
    })

    rerender(
      <MemoryRouter>
        <BookmarksListView />
      </MemoryRouter>,
    )

    expect(screen.getByRole('alert')).toHaveTextContent(/something went wrong/i)
  })
})
