import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import App from './App'

vi.mock('./context/BookmarksContext', () => ({
  BookmarksProvider: ({ children }: { children: React.ReactNode }) => children,
}))

vi.mock('./context/useBookmarksContext', () => ({
  useBookmarksContext: vi.fn(() => ({
    bookmarks: [
      {
        id: '1',
        title: 'React Docs',
        url: 'https://react.dev',
        category: 'Frontend',
        ownerEmail: 'team@frontend.dev',
        notes: 'Official docs',
      },
    ],
    setBookmarks: vi.fn(),
    loading: false,
    error: null,
  })),
}))

describe('App routing', () => {
  it('navigates between list and add routes', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: /saved links/i })).toBeInTheDocument()

    await user.click(screen.getByRole('link', { name: /add bookmark/i }))

    expect(screen.getByRole('heading', { name: /add a bookmark/i })).toBeInTheDocument()
  })
})
