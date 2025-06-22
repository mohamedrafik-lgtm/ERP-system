'use client';

import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { Check, ChevronsUpDown } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface MenuProps {
  label?: string;
  options?: Option[];
  placeholder?: string;
  field: any;
  multiple?: boolean;
}

export default function Menu({
  label = 'الاختيار',
  options = [],
  placeholder = 'اختر من القائمة',
  field,
  multiple = false,
}: MenuProps) {
  const [selected, setSelected] = useState<any>(field.value || (multiple ? [] : null));

  const handleChange = (value: any) => {
    setSelected(value);
    field.onChange(value);
  };

  const renderLabel = (value: string | string[]) => {
    if (multiple && Array.isArray(value)) {
      if (value.length === 0) return placeholder;
      return options.filter((opt) => value.includes(opt.value)).map((o) => o.label).join(', ');
    }
    return options.find((opt) => opt.value === value)?.label || placeholder;
  };

  return (
    <div className="mb-4">
      {label && <label className="block text-sm font-medium mb-2">{label}</label>}
      <Listbox value={selected} onChange={handleChange} multiple={multiple}>
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-pointer rounded-md bg-white py-2 pl-3 pr-10 text-left shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm">
            <span className="block truncate text-black">{renderLabel(selected)}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronsUpDown className="h-4 w-4 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-2"
            enter="transition ease-out duration-150"
            enterFrom="opacity-0 translate-y-2"
            enterTo="opacity-100 translate-y-0"
          >
            <Listbox.Options className="absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/10 focus:outline-none sm:text-sm">
              {options.map((option) => (
                <Listbox.Option
                  key={option.value}
                  value={option.value}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-orange-100 text-orange-900' : 'text-gray-900'
                    }`
                  }
                >
                  {({ selected }) => (
                    <>
                      <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                        {option.label}
                      </span>
                      {selected && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-orange-600">
                          <Check className="h-4 w-4" aria-hidden="true" />
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
    </div>
  );
}
