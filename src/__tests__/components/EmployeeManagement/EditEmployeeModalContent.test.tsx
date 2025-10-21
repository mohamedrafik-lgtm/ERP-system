import React from 'react';
import { render, screen } from '@testing-library/react';
import EditEmployeeModalContent from '@/components/EmployeeManagement/EditEmployeeModalContent';

describe('EditEmployeeModalContent', () => {
  const mockRegister = jest.fn();
  const mockErrors = {};

  it('renders all form fields', () => {
    render(
      <EditEmployeeModalContent 
        register={mockRegister} 
        errors={mockErrors} 
      />
    );
    
    expect(screen.getByLabelText('الاسم الكامل')).toBeInTheDocument();
    expect(screen.getByLabelText('البريد الإلكتروني')).toBeInTheDocument();
    expect(screen.getByLabelText('رقم الهاتف')).toBeInTheDocument();
    expect(screen.getByLabelText('نوع الحساب')).toBeInTheDocument();
    expect(screen.getByLabelText('معرف الدور (اختياري)')).toBeInTheDocument();
  });

  it('renders info banner for editing', () => {
    render(
      <EditEmployeeModalContent 
        register={mockRegister} 
        errors={mockErrors} 
      />
    );
    
    expect(screen.getByText('تحديث بيانات المستخدم')).toBeInTheDocument();
    expect(screen.getByText('يمكنك تحديث أي من الحقول التالية. الحقول الفارغة لن يتم تحديثها.')).toBeInTheDocument();
  });

  it('renders account type options', () => {
    render(
      <EditEmployeeModalContent 
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
      <EditEmployeeModalContent 
        register={mockRegister} 
        errors={mockErrors} 
      />
    );
    
    const emailInput = screen.getByLabelText('البريد الإلكتروني');
    const phoneInput = screen.getByLabelText('رقم الهاتف');
    
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(phoneInput).toHaveAttribute('type', 'tel');
  });

  it('has correct placeholders', () => {
    render(
      <EditEmployeeModalContent 
        register={mockRegister} 
        errors={mockErrors} 
      />
    );
    
    expect(screen.getByPlaceholderText('أدخل الاسم الكامل')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('example@domain.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('+20 123 456 7890')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('أدخل معرف الدور (اختياري)')).toBeInTheDocument();
  });

  it('shows role ID as optional field', () => {
    render(
      <EditEmployeeModalContent 
        register={mockRegister} 
        errors={mockErrors} 
      />
    );
    
    expect(screen.getByText('معرف الدور (اختياري)')).toBeInTheDocument();
    expect(screen.getByText('معرف الدور اختياري ويمكن تركه فارغاً')).toBeInTheDocument();
  });

  it('renders error messages when errors are present', () => {
    const errorsWithMessage = {
      name: { message: 'الاسم مطلوب' },
      email: { message: 'البريد الإلكتروني غير صحيح' }
    };
    
    render(
      <EditEmployeeModalContent 
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
      <EditEmployeeModalContent 
        register={mockRegister} 
        errors={errorsWithMessage} 
      />
    );
    
    const nameInput = screen.getByLabelText('الاسم الكامل');
    expect(nameInput).toHaveClass('border-red-300', 'focus:border-red-500');
  });

  it('applies normal styling when no errors', () => {
    render(
      <EditEmployeeModalContent 
        register={mockRegister} 
        errors={mockErrors} 
      />
    );
    
    const nameInput = screen.getByLabelText('الاسم الكامل');
    expect(nameInput).toHaveClass('border-gray-200', 'focus:border-orange-500');
  });

  it('renders with correct grid layout', () => {
    render(
      <EditEmployeeModalContent 
        register={mockRegister} 
        errors={mockErrors} 
      />
    );
    
    const formContainer = screen.getByLabelText('الاسم الكامل').closest('div')?.parentElement;
    expect(formContainer).toHaveClass('grid', 'grid-cols-1', 'md:grid-cols-2');
  });

  it('has role ID field spanning full width', () => {
    render(
      <EditEmployeeModalContent 
        register={mockRegister} 
        errors={mockErrors} 
      />
    );
    
    const roleIdField = screen.getByLabelText('معرف الدور (اختياري)').closest('div');
    expect(roleIdField).toHaveClass('md:col-span-2');
  });

  it('calls register function for all inputs', () => {
    render(
      <EditEmployeeModalContent 
        register={mockRegister} 
        errors={mockErrors} 
      />
    );
    
    expect(mockRegister).toHaveBeenCalledWith('name');
    expect(mockRegister).toHaveBeenCalledWith('email');
    expect(mockRegister).toHaveBeenCalledWith('phone');
    expect(mockRegister).toHaveBeenCalledWith('accountType');
    expect(mockRegister).toHaveBeenCalledWith('roleId');
  });

  it('uses orange color scheme for edit form', () => {
    render(
      <EditEmployeeModalContent 
        register={mockRegister} 
        errors={mockErrors} 
      />
    );
    
    const nameInput = screen.getByLabelText('الاسم الكامل');
    expect(nameInput).toHaveClass('focus:border-orange-500', 'focus:ring-orange-100');
  });
});
