"use client";
import { useState } from "react";


interface MenuProps {
  label?: string;
  options?: { value: string; label: string }[];
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  value?: string;
  name?: string;
}

export default function Menu({ label = 'Program', options = [], placeholder = 'Select program', name = 'program' }: MenuProps) {
    const [selectedValue, setSelectedValue] = useState('');
  
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedValue(e.target.value);
      console.log('Selected program:', e.target.value);
    };
  
    return (
      <div className="mb-4">
        <label htmlFor={name} className="block text-sm font-medium text-white mb-2">
          {label}
        </label>
        <select
          id={name}
          name={name}
          value={selectedValue}
          onChange={handleChange}
          className="block w-full rounded-md  bg-white/10 py-2 px-3 shadow-sm focus:outline-none focus:ring-2 text-sm"
        >
          <option value="" disabled>{placeholder}</option>
          {options.map((option) => (
            <option className="text-black" key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
  
        {selectedValue && (
          <p className="mt-2 text-sm text-gray-600">You selected: {selectedValue}</p>
        )}
      </div>
    );
  };