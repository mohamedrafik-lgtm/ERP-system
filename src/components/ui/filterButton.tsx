"use client";

import { useEffect, useRef, useState, useCallback, memo } from "react";
import { ChevronDown, Check } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface FilterButtonProps {
  label: string;
  paramKey: string;
  options: string[];
  className?: string;
}

const FilterButton = ({ label, paramKey, options, className }: FilterButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const menuRef = useRef<HTMLDivElement>(null);

  const selectedValue = searchParams.get(paramKey) || "";

  const handleSelect = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(paramKey, value);
    router.push(`?${params.toString()}`);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`${className}`}
      >
        <span className="text-sm font-semibold text-gray-700">
          {selectedValue ? `${label}: ${selectedValue}` : label}
        </span>
        <ChevronDown
          className={`ml-2 h-4 w-4 text-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      <div
        className={`absolute z-[9999] mt-2 w-64 rounded-xl bg-white shadow-xl border border-gray-100 overflow-hidden transition-all duration-200 ${
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="p-2">
          <ul
            className={`transition-all duration-300 ease-out transform ${
              isOpen
                ? "max-h-[500px] opacity-100 translate-y-0"
                : "max-h-0 opacity-0 -translate-y-2"
            } overflow-hidden`}
          >
            {options.map((option) => {
              const isSelected = selectedValue === option;
              return (
                <li key={option}>
                  <button
                    onClick={() => handleSelect(option)}
                    className={`w-full px-4 py-3 flex items-center justify-between text-sm transition-all duration-200 rounded-lg group ${
                      isSelected
                        ? "bg-gradient-to-r from-orange-50 to-red-50 text-orange-700 font-medium border border-orange-200"
                        : "text-gray-700 hover:bg-gray-50 hover:border-gray-200 border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full transition-opacity duration-200 ${
                        isSelected ? "bg-orange-500 opacity-100" : "bg-gray-300 opacity-0 group-hover:opacity-100"
                      }`}></div>
                      <span>{option}</span>
                    </div>
                    {isSelected && (
                      <Check className="h-4 w-4 text-orange-600" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default memo(FilterButton);
