import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Input } from '@/components/input'

describe('Input Component', () => {
  it('renders without crashing', () => {
    render(<Input />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('renders with correct type attribute', () => {
    render(<Input type="email" />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('type', 'email')
  })

  it('renders with correct placeholder', () => {
    const placeholder = 'Enter your name'
    render(<Input placeholder={placeholder} />)
    const input = screen.getByPlaceholderText(placeholder)
    expect(input).toBeInTheDocument()
  })

  it('renders with correct id', () => {
    const id = 'name-input'
    render(<Input id={id} />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('id', id)
  })

  it('renders with correct className', () => {
    const className = 'custom-input-class'
    render(<Input className={className} />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass(className)
  })

  it('handles value changes correctly', () => {
    const handleChange = jest.fn()
    render(<Input onChange={handleChange} />)
    const input = screen.getByRole('textbox')
    
    fireEvent.change(input, { target: { value: 'test value' } })
    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>()
    render(<Input ref={ref} />)
    
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  it('applies default CSS classes', () => {
    render(<Input />)
    const input = screen.getByRole('textbox')
    
    expect(input).toHaveClass('w-full')
    expect(input).toHaveClass('px-3')
    expect(input).toHaveClass('py-2')
    expect(input).toHaveClass('border')
    expect(input).toHaveClass('rounded')
    expect(input).toHaveClass('bg-white')
    expect(input).toHaveClass('dark:bg-slate-800')
    expect(input).toHaveClass('text-sm')
  })

  it('combines custom className with default classes', () => {
    const customClass = 'custom-input-class'
    render(<Input className={customClass} />)
    const input = screen.getByRole('textbox')
    
    expect(input).toHaveClass('w-full')
    expect(input).toHaveClass('px-3')
    expect(input).toHaveClass('py-2')
    expect(input).toHaveClass('border')
    expect(input).toHaveClass('rounded')
    expect(input).toHaveClass('bg-white')
    expect(input).toHaveClass('dark:bg-slate-800')
    expect(input).toHaveClass('text-sm')
    expect(input).toHaveClass(customClass)
  })

  it('handles disabled state', () => {
    render(<Input disabled />)
    const input = screen.getByRole('textbox')
    expect(input).toBeDisabled()
  })

  it('handles required attribute', () => {
    render(<Input required />)
    const input = screen.getByRole('textbox')
    expect(input).toBeRequired()
  })

  it('handles name attribute', () => {
    const name = 'username'
    render(<Input name={name} />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('name', name)
  })

  it('handles autoComplete attribute', () => {
    const autoComplete = 'off'
    render(<Input autoComplete={autoComplete} />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('autocomplete', autoComplete)
  })

  it('handles aria attributes', () => {
    const ariaLabel = 'Username input'
    render(<Input aria-label={ariaLabel} />)
    const input = screen.getByLabelText(ariaLabel)
    expect(input).toBeInTheDocument()
  })

  it('handles data attributes', () => {
    const dataTestId = 'username-input'
    render(<Input data-testid={dataTestId} />)
    const input = screen.getByTestId(dataTestId)
    expect(input).toBeInTheDocument()
  })

  it('handles multiple props correctly', () => {
    const props = {
      type: 'password',
      placeholder: 'Enter password',
      id: 'password-input',
      className: 'password-field',
      required: true,
      disabled: false,
      name: 'password',
      autoComplete: 'current-password',
    }

    render(<Input {...props} />)
    const input = screen.getByRole('textbox')
    
    expect(input).toHaveAttribute('type', 'password')
    expect(input).toHaveAttribute('placeholder', 'Enter password')
    expect(input).toHaveAttribute('id', 'password-input')
    expect(input).toHaveClass('password-field')
    expect(input).toBeRequired()
    expect(input).not.toBeDisabled()
    expect(input).toHaveAttribute('name', 'password')
    expect(input).toHaveAttribute('autocomplete', 'current-password')
  })
})
