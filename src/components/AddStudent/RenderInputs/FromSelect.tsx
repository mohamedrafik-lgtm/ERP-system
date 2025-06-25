'use client';

import { Listbox, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { Controller } from 'react-hook-form';
import { Check, ChevronsUpDown } from 'lucide-react';

const FormAnimatedSelect = ({ name, label, options, control }: any) => {
  const [selected, setSelected] = useState(options[0]);

  return (
    <div className="w-full">
      <label className="block mb-1">{label}</label>
      <Controller
        name={name}
        control={control}
        defaultValue={selected}
        render={({ field }) => (
          <Listbox value={field.value} onChange={(val) => { field.onChange(val); setSelected(val); }}>
            <div className="relative">
              <Listbox.Button className="relative w-full cursor-pointer rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-right shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300 sm:text-sm">
                <span className="block truncate">{selected}</span>
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                  <ChevronsUpDown className="h-4 w-4 text-gray-400" />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 -translate-y-1"
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 sm:text-sm">
                  {options.map((option: string, index: number) => (
                    <Listbox.Option
                      key={index}
                      className={({ active }) =>
                        `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                          active ? 'bg-orange-100 text-orange-700' : 'text-gray-900'
                        }`
                      }
                      value={option}
                    >
                      {({ selected }) => (
                        <>
                          <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                            {option}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-orange-600">
                              <Check className="h-4 w-4" />
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
        )}
      />
    </div>
  );
};

export default FormAnimatedSelect;
