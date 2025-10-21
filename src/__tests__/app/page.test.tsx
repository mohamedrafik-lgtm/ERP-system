import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Home from '@/app/page'
import { activities, stats } from '@/data'

// Mock Next.js Link component
jest.mock('next/link', () => {
  return ({ children, href, ...props }: any) => {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    )
  }
})

describe('Home Page Component', () => {
  const renderComponent = (component: React.ReactElement) => {
    return render(component)
  }

  it('renders dashboard title and welcome message', () => {
    renderComponent(<Home />)
    
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText(/Welcome back, Eleanor!/)).toBeInTheDocument()
  })

  it('renders all stat cards', () => {
    renderComponent(<Home />)
    
    stats.forEach((stat) => {
      expect(screen.getByText(stat.title)).toBeInTheDocument()
      expect(screen.getByText(stat.value)).toBeInTheDocument()
    })
  })

  it('renders quick action buttons', () => {
    renderComponent(<Home />)
    
    expect(screen.getByText('Add New Student')).toBeInTheDocument()
    expect(screen.getByText('Create New Course')).toBeInTheDocument()
  })

  it('renders quick actions section title', () => {
    renderComponent(<Home />)
    
    expect(screen.getByText('Quick Actions')).toBeInTheDocument()
  })

  it('renders recent activities section title', () => {
    renderComponent(<Home />)
    
    expect(screen.getByText('Recent Activities')).toBeInTheDocument()
  })

  it('renders activities table with headers', () => {
    renderComponent(<Home />)
    
    expect(screen.getByText('Date')).toBeInTheDocument()
    expect(screen.getByText('Activity')).toBeInTheDocument()
    expect(screen.getByText('Details')).toBeInTheDocument()
  })

  it('renders all activities from data', () => {
    renderComponent(<Home />)
    
    activities.forEach((activity) => {
      expect(screen.getByText(activity.activity)).toBeInTheDocument()
      expect(screen.getByText(activity.details)).toBeInTheDocument()
    })
  })

  it('has correct links for quick actions', () => {
    renderComponent(<Home />)
    
    const addStudentLink = screen.getByText('Add New Student').closest('a')
    const createCourseLink = screen.getByText('Create New Course').closest('a')
    
    expect(addStudentLink).toHaveAttribute('href', '/AddStudent')
    expect(createCourseLink).toHaveAttribute('href', '/AddProgram')
  })

  it('renders with correct layout classes', () => {
    renderComponent(<Home />)
    
    const mainContainer = screen.getByText('Dashboard').closest('div')
    expect(mainContainer).toHaveClass('p-6', 'max-w-6xl', 'mx-auto')
  })

  it('displays correct grid layout for stats', () => {
    renderComponent(<Home />)
    
    const statsContainer = screen.getByText(stats[0].title).closest('div')
    expect(statsContainer).toHaveClass('grid', 'grid-cols-1', 'md:grid-cols-3')
  })

  it('shows activities in a table format', () => {
    renderComponent(<Home />)
    
    const table = screen.getByRole('table')
    expect(table).toBeInTheDocument()
    
    const tableBody = table.querySelector('tbody')
    expect(tableBody).toBeInTheDocument()
  })

  it('renders activities with correct spacing', () => {
    renderComponent(<Home />)
    
    const tableBody = screen.getByRole('table').querySelector('tbody')
    expect(tableBody).toHaveClass('space-y-10')
  })

  it('displays quick actions with proper spacing', () => {
    renderComponent(<Home />)
    
    const quickActionsContainer = screen.getByText('Quick Actions').nextElementSibling
    expect(quickActionsContainer).toHaveClass('space-x-4')
  })

  it('renders button elements for quick actions', () => {
    renderComponent(<Home />)
    
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(2)
  })

  it('applies hover effects to quick action buttons', () => {
    renderComponent(<Home />)
    
    const buttons = screen.getAllByRole('button')
    buttons.forEach((button) => {
      expect(button).toHaveClass('hover:bg-white/70')
    })
  })

  it('renders activities table with proper styling', () => {
    renderComponent(<Home />)
    
    const tableContainer = screen.getByRole('table').closest('div')
    expect(tableContainer).toHaveClass('bg-white/70', 'rounded-xl', 'shadow')
  })

  it('displays table headers with correct styling', () => {
    renderComponent(<Home />)
    
    const headers = screen.getAllByRole('columnheader')
    headers.forEach((header) => {
      expect(header).toHaveClass('white/20', 'uppercase', 'text-xs')
    })
  })
})
