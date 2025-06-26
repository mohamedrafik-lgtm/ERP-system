// components/AddStudent/ProgramSelect.tsx
'use client';

import { Listbox, Transition } from '@headlessui/react';
import { Check, ChevronDown } from 'lucide-react';
import { Fragment } from 'react';
import { Program } from '@/interface'; // تأكد إن الواجهة موجودة في هذا المسار

interface Props {
  label: string;
  value: number | null;
  onChange: (val: number) => void;
  programs: Program[];
  error?: string;
}

export default function ProgramSelect({
  label,
  value,
  onChange,
  programs,
  error,
}: Props) {
  const selectedProgram =
    programs.find((p) => p.id === value) || { id: 0, nameAr: 'اختر البرنامج' };

  return (
    <div className="space-y-1 w-full">
      <label className="block text-sm font-medium  mb-1">
        {label}
      </label>
      <Listbox value={value ?? ""} onChange={onChange}>
        <div className="relative">
          <Listbox.Button
            className={`relative w-full cursor-pointer rounded-xl bg-white  py-2.5 pl-4 pr-10 text-left text-sm shadow-sm transition-all duration-300 border focus:outline-none focus:ring-2 focus:ring-orange-500 ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <span className="block truncate text-gray-900 ">
              {selectedProgram.nameAr}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </span>
          </Listbox.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-2"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-2"
          >
            <Listbox.Options className="absolute z-20 mt-2 max-h-60 w-full overflow-auto rounded-xl bg-white  py-1 text-sm shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none">
              {programs.map((program) => (
                <Listbox.Option
                  key={program.id}
                  value={program.id}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-10 pr-4 transition-colors duration-200 ${
                      active
                        ? 'bg-orange-500 text-white '
                        : ''
                    }`
                  }
                >
                  {({ selected }) => (
                    <>
                      <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                        {program.nameAr}
                      </span>
                      {selected && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-orange-600">
                          <Check className="h-4 w-4" />
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
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}
