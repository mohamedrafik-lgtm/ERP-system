"use client";

import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { Check, ChevronsUpDown } from "lucide-react";

interface Program {
  id: number;
  name: string;
}

interface Props {
  value: number | null;
  onChange: (value: number | null) => void;
}

export default function FeesSelectBox({ value, onChange }: Props) {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  useEffect(() => {
    // Simulated fetch
    setPrograms([
      { id: 1, name: "برنامج الصيف" },
      { id: 2, name: "برنامج الشتاء" },
      { id: 3, name: "برنامج خاص" },
    ]);
  }, []);

  useEffect(() => {
    const match = programs.find((p) => p.id === value);
    setSelectedProgram(match || null);
  }, [value, programs]);

  const handleChange = (program: Program | null) => {
    setSelectedProgram(program);
    onChange(program ? program.id : null);
  };

  return (
    <div className="w-full">
      <label className="block mb-1 text-black">البرنامج التدريبي:</label>
      <Listbox value={selectedProgram} onChange={handleChange}>
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-default rounded-md bg-white border border-white/30 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none">
            <span className="block truncate text-black">
              {selectedProgram ? selectedProgram.name : "-- اختر البرنامج --"}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronsUpDown className="h-5 w-5 text-black/60" aria-hidden="true" />
            </span>
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none">
              {programs.map((program) => (
                <Listbox.Option
                  key={program.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-orange-500/20 text-black" : "text-black"
                    }`
                  }
                  value={program}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {program.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-orange-500">
                          <Check className="h-5 w-5" aria-hidden="true" />
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
    </div>
  );
}
