import React from 'react'
import { render, screen } from '@testing-library/react'
import { Spinner } from '@/components/ui/Spinner'

describe('Spinner Component', () => {
  it('renders without crashing', () => {
    render(<Spinner />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('has correct CSS classes', () => {
    render(<Spinner />)
    const spinner = screen.getByRole('status')
    
    expect(spinner).toHaveClass('animate-spin')
    expect(spinner).toHaveClass('rounded-full')
    expect(spinner).toHaveClass('h-12')
    expect(spinner).toHaveClass('w-12')
    expect(spinner).toHaveClass('border-t-2')
    expect(spinner).toHaveClass('border-b-2')
    expect(spinner).toHaveClass('border-orange-500')
    expect(spinner).toHaveClass('mx-auto')
  })

  it('has correct dimensions', () => {
    render(<Spinner />)
    const spinner = screen.getByRole('status')
    
    expect(spinner).toHaveClass('h-12')
    expect(spinner).toHaveClass('w-12')
  })

  it('has correct border styling', () => {
    render(<Spinner />)
    const spinner = screen.getByRole('status')
    
    expect(spinner).toHaveClass('border-t-2')
    expect(spinner).toHaveClass('border-b-2')
    expect(spinner).toHaveClass('border-orange-500')
  })

  it('has correct animation', () => {
    render(<Spinner />)
    const spinner = screen.getByRole('status')
    
    expect(spinner).toHaveClass('animate-spin')
  })

  it('has correct positioning', () => {
    render(<Spinner />)
    const spinner = screen.getByRole('status')
    
    expect(spinner).toHaveClass('mx-auto')
  })

  it('has correct shape', () => {
    render(<Spinner />)
    const spinner = screen.getByRole('status')
    
    expect(spinner).toHaveClass('rounded-full')
  })
})
