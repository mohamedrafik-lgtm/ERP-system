'use client';

import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/24/solid';

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

export const EnhancedSelect = ({
  value,
  onChange,
  options,
  placeholder = 'اختر...',
  label,
  error,
  required,
  disabled
}: SelectProps) => {
  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="relative w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 mr-1">*</span>}
        </label>
      )}
      
      <Listbox value={value} onChange={onChange} disabled={disabled}>
        <div className="relative mt-1">
          <Listbox.Button className={`
            relative w-full cursor-default rounded-lg 
            bg-white py-3 pl-10 pr-4 text-right
            border border-gray-300 
            focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 
            sm:text-sm
            ${error ? 'border-red-300 focus-visible:border-red-500 focus-visible:ring-red-400' : ''}
            ${disabled ? 'bg-gray-50 text-gray-500' : ''}
          `}>
            <span className={`block truncate ${!selectedOption ? 'text-gray-400' : 'text-gray-900'}`}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <ChevronUpDownIcon
                className={`h-5 w-5 ${error ? 'text-red-400' : 'text-gray-400'}`}
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 -translate-y-2"
            enterTo="transform opacity-100 translate-y-0"
          >
            <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options.map((option) => (
                <Listbox.Option
                  key={option.value}
                  className={({ active, selected }) => `
                    relative cursor-default select-none py-3 pl-10 pr-4
                    ${active || selected ? 'bg-blue-50' : 'bg-white'}
                    ${selected ? 'text-blue-900' : 'text-gray-900'}
                  `}
                  value={option.value}
                >
                  {({ selected, active }) => (
                    <>
                      <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                        {option.label}
                      </span>
                      {selected ? (
                        <span 
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 
                            ${active ? 'text-blue-600' : 'text-blue-500'}`}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};
