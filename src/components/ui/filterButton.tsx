"use client";

import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface FilterButtonProps {
  label: string;
  paramKey: string;
  options: string[];
  className?: string;
}

export default function FilterButton({ label, paramKey, options , className}: FilterButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedValue = searchParams.get(paramKey) || "";

  const handleSelect = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(paramKey, value);
    router.push(`?${params.toString()}`);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`${className}`}
        // className="inline-flex items-center px-4 py-2 rounded-full bg-orange-600 text-sm font-medium text-white transition duration-200 shadow-sm"
      >
        {selectedValue ? `${label}: ${selectedValue}` : label}
        <ChevronDown
          className={`ml-2 h-4 w-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-20 mt-2 w-52 rounded-xl bg-white shadow-xl ring-1 ring-gray-200 overflow-hidden animate-fade-in">
          <ul className="py-1">
            {options.map((option) => {
              const isSelected = selectedValue === option;
              return (
                <li key={option}>
                  <button
                    onClick={() => handleSelect(option)}
                    className={`w-full px-4 py-2 flex items-center justify-between text-sm transition-colors duration-150 ${
                      isSelected
                        ? "bg-blue-100 text-blue-700 font-medium"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {option}
                    {isSelected && <Check className="h-4 w-4 text-blue-600" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
