import { render, screen } from '@testing-library/react'
import Home from '../pages'

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />)
    const heading1 = screen.getByRole('heading', {
      name: 'TECNOPOR S.A.',
    })
    expect(heading1).toBeInTheDocument()
    const heading4 = screen.getByRole('heading', {
      name: 'Sistema de mantenimiento',
    })
    expect(heading4).toBeInTheDocument()
  })
})
