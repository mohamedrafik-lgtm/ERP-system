import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ActivityRow from '@/components/activiti'

describe('ActivityRow Component', () => {
  const defaultProps = {
    date: '2024-01-15',
    activity: 'Student Registration',
    details: 'New student registered for AI program',
  }

  it('renders without crashing', () => {
    render(
      <table>
        <tbody>
          <ActivityRow {...defaultProps} />
        </tbody>
      </table>
    )

    expect(screen.getByText('2024-01-15')).toBeTruthy()
    expect(screen.getByText('Student Registration')).toBeTruthy()
    expect(screen.getByText('New student registered for AI program')).toBeTruthy()
  })

  it('displays correct date', () => {
    render(
      <table>
        <tbody>
          <ActivityRow {...defaultProps} />
        </tbody>
      </table>
    )
    
    expect(screen.getByText('2024-01-15')).toBeInTheDocument()
  })

  it('displays correct activity', () => {
    render(
      <table>
        <tbody>
          <ActivityRow {...defaultProps} />
        </tbody>
      </table>
    )
    
    expect(screen.getByText('Student Registration')).toBeInTheDocument()
  })

  it('displays correct details', () => {
    render(
      <table>
        <tbody>
          <ActivityRow {...defaultProps} />
        </tbody>
      </table>
    )
    
    expect(screen.getByText('New student registered for AI program')).toBeInTheDocument()
  })

  it('renders as table row', () => {
    render(
      <table>
        <tbody>
          <ActivityRow {...defaultProps} />
        </tbody>
      </table>
    )
    
    const row = screen.getByRole('row')
    expect(row).toBeInTheDocument()
  })

  it('has correct number of cells', () => {
    render(
      <table>
        <tbody>
          <ActivityRow {...defaultProps} />
        </tbody>
      </table>
    )
    
    const cells = screen.getAllByRole('cell')
    expect(cells).toHaveLength(3)
  })

  it('handles different date formats', () => {
    const dateFormats = [
      '2024-01-15',
      '15/01/2024',
      'Jan 15, 2024',
      '15-01-2024',
    ]
    
    dateFormats.forEach(date => {
      const { unmount } = render(
        <table>
          <tbody>
            <ActivityRow date={date} activity="Test Activity" details="Test Details" />
          </tbody>
        </table>
      )
      
      expect(screen.getByText(date)).toBeInTheDocument()
      unmount()
    })
  })

  it('handles long activity names', () => {
    const longActivity = 'This is a very long activity name that might need to wrap to multiple lines in the table cell'
    
    render(
      <table>
        <tbody>
          <ActivityRow date="2024-01-15" activity={longActivity} details="Details" />
        </tbody>
      </table>
    )
    
    expect(screen.getByText(longActivity)).toBeInTheDocument()
  })

  it('handles long details', () => {
    const longDetails = 'This is a very long details description that provides comprehensive information about the activity and might need to wrap to multiple lines'
    
    render(
      <table>
        <tbody>
          <ActivityRow date="2024-01-15" activity="Activity" details={longDetails} />
        </tbody>
      </table>
    )
    
    expect(screen.getByText(longDetails)).toBeInTheDocument()
  })

  it('handles Arabic text', () => {
    const arabicProps = {
      date: '٢٠٢٤-٠١-١٥',
      activity: 'تسجيل طالب جديد',
      details: 'تم تسجيل طالب جديد في برنامج الذكاء الاصطناعي',
    }
    
    render(
      <table>
        <tbody>
          <ActivityRow {...arabicProps} />
        </tbody>
      </table>
    )
    
    expect(screen.getByText('٢٠٢٤-٠١-١٥')).toBeInTheDocument()
    expect(screen.getByText('تسجيل طالب جديد')).toBeInTheDocument()
    expect(screen.getByText('تم تسجيل طالب جديد في برنامج الذكاء الاصطناعي')).toBeInTheDocument()
  })

  it('handles empty strings gracefully', () => {
    render(
      <table>
        <tbody>
          <ActivityRow date="" activity="" details="" />
        </tbody>
      </table>
    )
    
    const cells = screen.getAllByRole('cell')
    expect(cells).toHaveLength(3)
  })

  it('handles special characters', () => {
    const specialProps = {
      date: '2024-01-15',
      activity: 'Activity with @#$%^&*() symbols',
      details: 'Details with <script>alert("test")</script> content',
    }
    
    render(
      <table>
        <tbody>
          <ActivityRow {...specialProps} />
        </tbody>
      </table>
    )
    
    expect(screen.getByText('Activity with @#$%^&*() symbols')).toBeInTheDocument()
    expect(screen.getByText('Details with <script>alert("test")</script> content')).toBeInTheDocument()
  })

  it('has correct table cell structure', () => {
    render(
      <table>
        <tbody>
          <ActivityRow {...defaultProps} />
        </tbody>
      </table>
    )
    
    const cells = screen.getAllByRole('cell')
    
    cells.forEach(cell => {
      expect(cell).toHaveClass('px-6')
      expect(cell).toHaveClass('py-4')
    })
  })

  it('maintains consistent styling across multiple rows', () => {
    const activities = [
      { date: '2024-01-15', activity: 'Activity 1', details: 'Details 1' },
      { date: '2024-01-16', activity: 'Activity 2', details: 'Details 2' },
      { date: '2024-01-17', activity: 'Activity 3', details: 'Details 3' },
    ]
    
    render(
      <table>
        <tbody>
          {activities.map((activity, index) => (
            <ActivityRow key={index} {...activity} />
          ))}
        </tbody>
      </table>
    )
    
    const rows = screen.getAllByRole('row')
    expect(rows).toHaveLength(3)
    
    activities.forEach(activity => {
      expect(screen.getByText(activity.date)).toBeInTheDocument()
      expect(screen.getByText(activity.activity)).toBeInTheDocument()
      expect(screen.getByText(activity.details)).toBeInTheDocument()
    })
  })
})
