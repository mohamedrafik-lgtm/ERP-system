import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import EmployeeModalContent from '@/components/EmployeeManagement/EmployeeModalContent';

// Mock react-hook-form
jest.mock('react-hook-form', () => ({
  useForm: jest.fn()
}));

describe('EmployeeModalContent', () => {
  const mockRegister = jest.fn();
  const mockErrors = {};

  beforeEach(() => {
    (useForm as jest.Mock).mockReturnValue({
      register: mockRegister,
      handleSubmit: jest.fn(),
      formState: { errors: mockErrors }
    });
  });

  it('renders all form fields', () => {
    render(
      <EmployeeModalContent 
        accountTypes={['STAFF', 'INSTRUCTOR']} 
        register={mockRegister} 
        errors={mockErrors} 
      />
    );
    
    expect(screen.getByLabelText('الاسم الكامل')).toBeInTheDocument();
    expect(screen.getByLabelText('البريد الإلكتروني')).toBeInTheDocument();
    expect(screen.getByLabelText('رقم الهاتف')).toBeInTheDocument();
    expect(screen.getByLabelText('نوع الحساب')).toBeInTheDocument();
    expect(screen.getByLabelText('كلمة المرور')).toBeInTheDocument();
  });

  it('renders info banner', () => {
    render(
      <EmployeeModalContent 
        accountTypes={['STAFF', 'INSTRUCTOR']} 
        register={mockRegister} 
        errors={mockErrors} 
      />
    );
    
    expect(screen.getByText('معلومات تسجيل الدخول')).toBeInTheDocument();
    expect(screen.getByText('سيقوم المستخدم بتسجيل الدخول باستخدام البريد الإلكتروني وكلمة المرور المدخلة هنا')).toBeInTheDocument();
  });

  it('renders account type options correctly', () => {
    render(
      <EmployeeModalContent 
        accountTypes={['STAFF', 'INSTRUCTOR']} 
        register={mockRegister} 
        errors={mockErrors} 
      />
    );
    
    const select = screen.getByLabelText('نوع الحساب');
    expect(select).toBeInTheDocument();
    
    const options = select.querySelectorAll('option');
    expect(options).toHaveLength(3); // Empty option + 2 account types
    expect(options[1]).toHaveTextContent('موظف');
    expect(options[2]).toHaveTextContent('مدرب');
  });

  it('has correct input types', () => {
    render(
      <EmployeeModalContent 
        accountTypes={['STAFF', 'INSTRUCTOR']} 
        register={mockRegister} 
        errors={mockErrors} 
      />
    );
    
    const emailInput = screen.getByLabelText('البريد الإلكتروني');
    const phoneInput = screen.getByLabelText('رقم الهاتف');
    const passwordInput = screen.getByLabelText('كلمة المرور');
    
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(phoneInput).toHaveAttribute('type', 'tel');
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('has correct placeholders', () => {
    render(
      <EmployeeModalContent 
        accountTypes={['STAFF', 'INSTRUCTOR']} 
        register={mockRegister} 
        errors={mockErrors} 
      />
    );
    
    expect(screen.getByPlaceholderText('أدخل الاسم الكامل')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('example@domain.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('+20 123 456 7890')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('أدخل كلمة المرور')).toBeInTheDocument();
  });

  it('displays password requirements', () => {
    render(
      <EmployeeModalContent 
        accountTypes={['STAFF', 'INSTRUCTOR']} 
        register={mockRegister} 
        errors={mockErrors} 
      />
    );
    
    expect(screen.getByText('يجب أن تكون كلمة المرور 6 أحرف على الأقل')).toBeInTheDocument();
  });

  it('renders error messages when errors are present', () => {
    const errorsWithMessage = {
      name: { message: 'الاسم مطلوب' },
      email: { message: 'البريد الإلكتروني غير صحيح' }
    };
    
    render(
      <EmployeeModalContent 
        accountTypes={['STAFF', 'INSTRUCTOR']} 
        register={mockRegister} 
        errors={errorsWithMessage} 
      />
    );
    
    expect(screen.getByText('الاسم مطلوب')).toBeInTheDocument();
    expect(screen.getByText('البريد الإلكتروني غير صحيح')).toBeInTheDocument();
  });

  it('applies error styling when errors are present', () => {
    const errorsWithMessage = {
      name: { message: 'الاسم مطلوب' }
    };
    
    render(
      <EmployeeModalContent 
        accountTypes={['STAFF', 'INSTRUCTOR']} 
        register={mockRegister} 
        errors={errorsWithMessage} 
      />
    );
    
    const nameInput = screen.getByLabelText('الاسم الكامل');
    expect(nameInput).toHaveClass('border-red-300', 'focus:border-red-500');
  });

  it('applies normal styling when no errors', () => {
    render(
      <EmployeeModalContent 
        accountTypes={['STAFF', 'INSTRUCTOR']} 
        register={mockRegister} 
        errors={mockErrors} 
      />
    );
    
    const nameInput = screen.getByLabelText('الاسم الكامل');
    expect(nameInput).toHaveClass('border-gray-200', 'focus:border-blue-500');
  });

  it('renders with correct grid layout', () => {
    render(
      <EmployeeModalContent 
        accountTypes={['STAFF', 'INSTRUCTOR']} 
        register={mockRegister} 
        errors={mockErrors} 
      />
    );
    
    const formContainer = screen.getByLabelText('الاسم الكامل').closest('div')?.parentElement;
    expect(formContainer).toHaveClass('grid', 'grid-cols-1', 'md:grid-cols-2');
  });

  it('has password field spanning full width', () => {
    render(
      <EmployeeModalContent 
        accountTypes={['STAFF', 'INSTRUCTOR']} 
        register={mockRegister} 
        errors={mockErrors} 
      />
    );
    
    const passwordField = screen.getByLabelText('كلمة المرور').closest('div');
    expect(passwordField).toHaveClass('md:col-span-2');
  });

  it('calls register function for all inputs', () => {
    render(
      <EmployeeModalContent 
        accountTypes={['STAFF', 'INSTRUCTOR']} 
        register={mockRegister} 
        errors={mockErrors} 
      />
    );
    
    expect(mockRegister).toHaveBeenCalledWith('name');
    expect(mockRegister).toHaveBeenCalledWith('email');
    expect(mockRegister).toHaveBeenCalledWith('phone');
    expect(mockRegister).toHaveBeenCalledWith('accountType');
    expect(mockRegister).toHaveBeenCalledWith('password');
  });

  it('handles empty accountTypes array', () => {
    render(
      <EmployeeModalContent 
        accountTypes={[]} 
        register={mockRegister} 
        errors={mockErrors} 
      />
    );
    
    const select = screen.getByLabelText('نوع الحساب');
    const options = select.querySelectorAll('option');
    expect(options).toHaveLength(1); // Only empty option
  });
});
