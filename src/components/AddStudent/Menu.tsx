import { Listbox, Transition } from '@headlessui/react';
import { Check, ChevronDown } from 'lucide-react';
import { Fragment } from 'react';

interface Option {
  label: string;
  value: string;
}

interface Props {
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: Option[];
  error?: string;
}

export default function SelectWithTransition({
  label,
  value,
  onChange,
  options,
  error,
}: Props) {
  const selected = options.find((o) => o.value === value) || { label: 'اختر', value: '' };

  return (
    <div className="flex flex-col space-y-2 w-full group/select">
      <label className="
        text-sm font-semibold text-gray-700
        transition-all duration-300
        group-hover/select:text-gray-900
        flex items-center gap-2
      ">
        <span className="
          w-1 h-1 rounded-full
          bg-blue-400 opacity-0
          transition-all duration-300
          group-hover/select:opacity-100
          group-hover/select:w-2
        "></span>
        {label}
      </label>
      <Listbox value={value ?? ''} onChange={onChange}>
        <div className="relative">
          <Listbox.Button
            className={`
              relative w-full
              px-4 py-3
              text-right
              bg-white
              border-2 rounded-lg
              transition-all duration-300
              cursor-pointer
              group
              ${error 
                ? 'border-red-300 hover:border-red-400' 
                : 'border-gray-200 hover:border-gray-300'
              }
              focus:outline-none focus:ring-4
              ${error ? 'focus:ring-red-50' : 'focus:ring-blue-50'}
              disabled:bg-gray-50 disabled:cursor-not-allowed
            `}
          >
            <span className={`
              block text-base
              ${selected.value === '' ? 'text-gray-400' : 'text-gray-700'}
              group-hover:text-gray-900
              transition-colors duration-200
            `}>
              {selected.label}
            </span>
            <span className="
              pointer-events-none
              absolute inset-y-0 right-3
              flex items-center
            ">
              <ChevronDown className={`
                w-5 h-5
                transition-all duration-300
                ${error ? 'text-red-400' : 'text-gray-400'}
                group-hover:text-gray-600
                ui-open:rotate-180
              `} />
            </span>
            
            {/* Decorative Elements */}
            <span className="
              absolute left-3 top-1/2 -translate-y-1/2
              w-5 h-5
              rounded-full
              transition-all duration-300
              ${error ? 'bg-red-50' : 'bg-blue-50'}
              opacity-0 scale-90
              group-hover:opacity-100 group-hover:scale-100
            "></span>
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
            <Listbox.Options className="
              absolute z-20 mt-2
              w-full max-h-60
              overflow-auto
              rounded-xl bg-white
              py-2
              text-base
              shadow-xl
              ring-1 ring-black/5
              focus:outline-none
              animate-fadeIn
            ">
              {options.map((opt) => (
                <Listbox.Option
                  key={opt.value}
                  value={opt.value}
                  className={({ active }) => `
                    relative
                    cursor-pointer
                    select-none
                    py-3 px-4
                    text-gray-900
                    transition-all duration-200
                    ${active 
                      ? 'bg-blue-50 text-blue-900'
                      : 'hover:bg-gray-50'
                    }
                  `}
                >
                  {({ selected, active }) => (
                    <>
                      <div className="flex items-center gap-3">
                        <span className={`
                          flex-1
                          transition-all duration-200
                          ${selected 
                            ? 'font-semibold text-blue-900'
                            : 'font-normal'
                          }
                          ${active ? 'transform translate-x-2' : ''}
                        `}>
                          {opt.label}
                        </span>
                        {selected ? (
                          <span className={`
                            flex items-center justify-center
                            w-5 h-5
                            rounded-full
                            transition-all duration-200
                            ${active 
                              ? 'bg-blue-100 text-blue-600'
                              : 'text-blue-500'
                            }
                          `}>
                            <Check className="h-3.5 w-3.5" />
                          </span>
                        ) : null}
                      </div>
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