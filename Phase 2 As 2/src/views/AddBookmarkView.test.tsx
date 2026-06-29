import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { AddBookmarkView } from './AddBookmarkView'
import { useBookmarksContext } from '../context/useBookmarksContext'

vi.mock('../context/useBookmarksContext', () => ({
  useBookmarksContext: vi.fn(),
}))

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>(
    'react-router-dom',
  )

  return {
    ...actual,
    useNavigate: () => vi.fn(),
  }
})

describe('AddBookmarkView', () => {
  it('shows validation errors when required fields are missing', async () => {
    const mockedUseBookmarksContext = vi.mocked(useBookmarksContext)
    mockedUseBookmarksContext.mockReturnValue({
      bookmarks: [],
      setBookmarks: vi.fn(),
      loading: false,
      error: null,
    })

    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <AddBookmarkView />
      </MemoryRouter>,
    )

    await user.click(screen.getByRole('button', { name: /save bookmark/i }))

    expect(screen.getByText(/title is required/i)).toBeInTheDocument()
    expect(screen.getByText(/url is required/i)).toBeInTheDocument()
    expect(screen.getByText(/category is required/i)).toBeInTheDocument()
    expect(screen.getByText(/owner email is required/i)).toBeInTheDocument()
  })
})
