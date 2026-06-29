import { render, screen } from '@testing-library/react'
import { Card } from './Card'

describe('Card', () => {
  it('renders title and child content', () => {
    render(
      <Card title="Example Card">
        <p>Inside body</p>
      </Card>,
    )

    expect(screen.getByRole('heading', { name: /example card/i })).toBeInTheDocument()
    expect(screen.getByText(/inside body/i)).toBeInTheDocument()
  })
})
