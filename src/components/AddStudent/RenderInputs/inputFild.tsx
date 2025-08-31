import { IStudentRequest } from "@/interface";
import FormField from "../FormField";

const InputField = ({
  label,
  name,
  register,
  type = 'text',
  error,
}: {
  label: string;
  name: keyof IStudentRequest;
  register: any;
  type?: string;
  error?: string;
}) => (
  <FormField label={label}>
    <div className="relative group">
      <input
        type={type}
        {...register(name)}
        className={`
          w-full
          px-4 py-3
          text-gray-700 text-base
          bg-white
          border-2 rounded-lg
          transition-all duration-300
          placeholder-gray-400
          ${error 
            ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
            : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
          }
          focus:outline-none focus:ring-4
          group-hover:border-gray-300
          disabled:bg-gray-50 disabled:cursor-not-allowed
        `}
      />
      {/* Input Icon - you can customize based on input type */}
      <div className={`
        absolute left-3 top-1/2 -translate-y-1/2
        text-gray-400 transition-colors duration-300
        group-hover:text-gray-500
        ${error ? 'text-red-400' : ''}
        ${type === 'number' ? 'text-blue-400' : ''}
      `}>
        {type === 'number' && (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
          </svg>
        )}
        {type === 'email' && (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        )}
        {type === 'tel' && (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        )}
      </div>
      
      {/* Error Icon */}
      {error && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      )}
    </div>
    
    {/* Error Message with Animation */}
    {error && (
      <div className="mt-2 animate-slideIn">
        <p className="text-red-500 text-sm flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </p>
      </div>
    )}
  </FormField>
);

export default InputField
