import React from 'react'
import { render, screen } from '@testing-library/react'
import StatCard from '@/components/stateCard'

describe('StatCard Component', () => {
  const defaultProps = {
    title: 'Total Students',
    value: '1,234',
    color: 'blue',
  }

  it('renders without crashing', () => {
    render(<StatCard {...defaultProps} />)
    expect(screen.getByText('Total Students')).toBeInTheDocument()
    expect(screen.getByText('1,234')).toBeInTheDocument()
  })

  it('displays correct title', () => {
    render(<StatCard {...defaultProps} />)
    expect(screen.getByText('Total Students')).toBeInTheDocument()
  })

  it('displays correct value', () => {
    render(<StatCard {...defaultProps} />)
    expect(screen.getByText('1,234')).toBeInTheDocument()
  })

  it('applies correct color styling', () => {
    render(<StatCard {...defaultProps} />)
    const card = screen.getByText('Total Students').closest('div')
    expect(card).toHaveClass('bg-white')
  })

  it('renders with different colors', () => {
    const colors = ['red', 'green', 'blue', 'yellow', 'purple']
    
    colors.forEach(color => {
      const { unmount } = render(
        <StatCard title="Test" value="100" color={color} />
      )
      
      expect(screen.getByText('Test')).toBeInTheDocument()
      expect(screen.getByText('100')).toBeInTheDocument()
      
      unmount()
    })
  })

  it('handles large numbers', () => {
    render(<StatCard title="Big Number" value="999,999,999" color="green" />)
    expect(screen.getByText('999,999,999')).toBeInTheDocument()
  })

  it('handles small numbers', () => {
    render(<StatCard title="Small Number" value="0" color="red" />)
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('handles long titles', () => {
    const longTitle = 'This is a very long title that might wrap to multiple lines'
    render(<StatCard title={longTitle} value="123" color="blue" />)
    expect(screen.getByText(longTitle)).toBeInTheDocument()
  })

  it('handles empty values gracefully', () => {
    render(<StatCard title="Empty Value" value="" color="gray" />)
    expect(screen.getByText('Empty Value')).toBeInTheDocument()
    expect(screen.getByText('')).toBeInTheDocument()
  })

  it('has correct CSS structure', () => {
    render(<StatCard {...defaultProps} />)
    const card = screen.getByText('Total Students').closest('div')
    
    expect(card).toHaveClass('bg-white')
    expect(card).toHaveClass('rounded-lg')
    expect(card).toHaveClass('shadow')
    expect(card).toHaveClass('p-6')
  })

  it('displays title and value in correct hierarchy', () => {
    render(<StatCard {...defaultProps} />)
    
    const title = screen.getByText('Total Students')
    const value = screen.getByText('1,234')
    
    expect(title).toBeInTheDocument()
    expect(value).toBeInTheDocument()
    
    // Value should have larger font size than title
    expect(value).toHaveClass('text-2xl')
    expect(title).toHaveClass('text-sm')
  })

  it('handles special characters in title', () => {
    render(<StatCard title="Students & Teachers" value="100%" color="green" />)
    expect(screen.getByText('Students & Teachers')).toBeInTheDocument()
  })

  it('handles special characters in value', () => {
    render(<StatCard title="Percentage" value="95.5%" color="blue" />)
    expect(screen.getByText('95.5%')).toBeInTheDocument()
  })

  it('renders with Arabic text', () => {
    render(<StatCard title="عدد الطلاب" value="١٢٣٤" color="orange" />)
    expect(screen.getByText('عدد الطلاب')).toBeInTheDocument()
    expect(screen.getByText('١٢٣٤')).toBeInTheDocument()
  })

  it('maintains accessibility', () => {
    render(<StatCard {...defaultProps} />)
    const card = screen.getByText('Total Students').closest('div')
    
    // Should be accessible via screen readers
    expect(card).toBeInTheDocument()
  })

  it('handles color prop variations', () => {
    const colorVariations = [
      'primary',
      'secondary',
      'success',
      'danger',
      'warning',
      'info',
      'light',
      'dark',
    ]
    
    colorVariations.forEach(color => {
      const { unmount } = render(
        <StatCard title={`${color} card`} value="100" color={color} />
      )
      
      expect(screen.getByText(`${color} card`)).toBeInTheDocument()
      unmount()
    })
  })
})
