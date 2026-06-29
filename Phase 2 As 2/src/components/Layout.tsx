import { NavLink } from 'react-router-dom'
import type { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Bookmark Manager</h1>
        <nav aria-label="Primary">
          <NavLink to="/" end>
            All Bookmarks
          </NavLink>
          <NavLink to="/add">Add Bookmark</NavLink>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  )
}
