'use client';

interface InputFieldProps {
  label: string;
  error?: string;
  className?: string;
  required?: boolean;
  children: React.ReactNode;
}

export const FormField = ({ label, error, className = "", required, children }: InputFieldProps) => {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 mr-1">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
}

export const Select = ({ options, className = "", ...props }: SelectProps) => {
  return (
    <select
      {...props}
      className={`
        w-full px-4 py-2.5 
        bg-white border border-gray-300 
        rounded-lg shadow-sm 
        text-gray-900 text-right
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
        disabled:bg-gray-50 disabled:text-gray-500
        placeholder:text-gray-400
        transition-all duration-200
        ${className}
      `}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = ({ className = "", ...props }: InputProps) => {
  return (
    <input
      {...props}
      className={`
        w-full px-4 py-2.5
        bg-white border border-gray-300 
        rounded-lg shadow-sm 
        text-gray-900 text-right
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
        disabled:bg-gray-50 disabled:text-gray-500
        placeholder:text-gray-400
        transition-all duration-200
        ${props.type === 'number' ? 'appearance-none' : ''}
        ${className}
      `}
    />
  );
};

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const TextArea = ({ className = "", ...props }: TextAreaProps) => {
  return (
    <textarea
      {...props}
      className={`
        w-full px-4 py-2.5
        bg-white border border-gray-300 
        rounded-lg shadow-sm 
        text-gray-900 text-right
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
        disabled:bg-gray-50 disabled:text-gray-500
        placeholder:text-gray-400
        resize-none
        transition-all duration-200
        ${className}
      `}
    />
  );
};
