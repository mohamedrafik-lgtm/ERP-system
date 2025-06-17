"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface FilterButtonProps {
  label: string;
  paramKey: string;
  options: string[];
  className?: string;
}

export default function FilterButton({ label, paramKey, options, className }: FilterButtonProps) {
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
        {selectedValue ? `${label}: ${selectedValue}` : label}
        <ChevronDown
          className={`ml-2 h-4 w-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      <div
        className={`absolute z-[9999] mt-2 w-52 rounded-xl bg-white shadow-xl ring-1 ring-gray-200 overflow-hidden transition-all duration-200 ${
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
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
                  className={`w-full px-4 py-2 flex items-center justify-between text-sm transition-colors duration-150 ${
                    isSelected
                      ? "bg-blue-100 text-orange-700 font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {option}
                  {isSelected && <Check className="h-4 w-4 text-orange-600" />}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
