'use client';

import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

export const CustomSelect = ({
  value,
  onChange,
  options,
  placeholder = 'اختر...',
  error,
  required,
  disabled
}: SelectProps) => {
  const selectedOption = options.find(opt => opt.value === value);

  return (
    <Listbox value={value} onChange={onChange} disabled={disabled}>
      <div className="relative">
        <Listbox.Button className={`
          relative w-full py-2.5 px-4
          bg-white text-right
          rounded-lg border border-gray-300 
          shadow-sm cursor-pointer
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          disabled:bg-gray-50 disabled:text-gray-500
          ${error ? 'border-red-500' : ''}
        `}>
          <span className="block truncate text-right">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              className={`h-5 w-5 ${disabled ? 'text-gray-400' : 'text-gray-500'}`}
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </Listbox.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-150"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {options.map((option) => (
              <Listbox.Option
                key={option.value}
                value={option.value}
                className={({ active, selected }) => `
                  relative cursor-pointer select-none py-2.5 px-4
                  ${active || selected ? 'bg-blue-50 text-blue-700' : 'text-gray-900'}
                `}
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate text-right ${selected ? 'font-medium' : 'font-normal'}`}>
                      {option.label}
                    </span>
                    {selected && (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                        </svg>
                      </span>
                    )}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};
