import React from 'react'
import { render, screen } from '@testing-library/react'
import { Skeleton } from '@/components/ui/Skeleton'

describe('Skeleton Component', () => {
  it('renders without crashing', () => {
    render(<Skeleton />)
    expect(screen.getByTestId('skeleton')).toBeInTheDocument()
  })

  it('has correct CSS classes', () => {
    render(<Skeleton />)
    const skeleton = screen.getByTestId('skeleton')
    
    expect(skeleton).toHaveClass('animate-pulse')
    expect(skeleton).toHaveClass('bg-gray-300')
    expect(skeleton).toHaveClass('rounded')
  })

  it('has correct animation', () => {
    render(<Skeleton />)
    const skeleton = screen.getByTestId('skeleton')
    
    expect(skeleton).toHaveClass('animate-pulse')
  })

  it('has correct background color', () => {
    render(<Skeleton />)
    const skeleton = screen.getByTestId('skeleton')
    
    expect(skeleton).toHaveClass('bg-gray-300')
  })

  it('has correct border radius', () => {
    render(<Skeleton />)
    const skeleton = screen.getByTestId('skeleton')
    
    expect(skeleton).toHaveClass('rounded')
  })

  it('applies custom className when provided', () => {
    const customClass = 'custom-skeleton-class'
    render(<Skeleton className={customClass} />)
    const skeleton = screen.getByTestId('skeleton')
    
    expect(skeleton).toHaveClass(customClass)
  })

  it('combines custom className with default classes', () => {
    const customClass = 'custom-skeleton-class'
    render(<Skeleton className={customClass} />)
    const skeleton = screen.getByTestId('skeleton')
    
    expect(skeleton).toHaveClass('animate-pulse')
    expect(skeleton).toHaveClass('bg-gray-300')
    expect(skeleton).toHaveClass('rounded')
    expect(skeleton).toHaveClass(customClass)
  })

  it('renders with default dimensions when no className provided', () => {
    render(<Skeleton />)
    const skeleton = screen.getByTestId('skeleton')
    
    // Should have basic skeleton styling
    expect(skeleton).toHaveClass('animate-pulse')
  })
})
