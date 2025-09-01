"use client";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface InlineMenuProps {
  name?: string;
  svgIcon?: React.ReactNode;
}

type MenuProps = {
  items: InlineMenuProps[];
  svg?: React.ReactNode;
  name?: string;
};

const InlineMenu: React.FC<MenuProps> = ({ items, svg, name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX });
    }
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        className="inline-flex items-center gap-2 px-4 py-3 bg-white border-2 border-gray-200 rounded-xl hover:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-100 transition-all duration-200 shadow-sm hover:shadow-md"
      >
        <span className="text-sm font-semibold text-gray-700">{name}</span>
        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
        {svg}
      </button>

      {isOpen &&
        createPortal(
          <div
            ref={menuRef}
            className="absolute w-64 bg-white rounded-xl shadow-xl border border-gray-100 z-[9999] overflow-hidden"
            style={{
              top: position.top + 8,
              left: position.left,
              position: "absolute",
            }}
          >
            <div className="p-2">
              {items.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsOpen(false);
                    console.log(`تم اختيار: ${item.name}`);
                  }}
                  className="w-full px-4 py-3 flex items-center justify-between text-right hover:bg-orange-50 text-sm cursor-pointer rounded-lg transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                    <span className="text-gray-700 font-medium">{item.name}</span>
                  </div>
                  {item.svgIcon && (
                    <div className="text-gray-400 group-hover:text-orange-500 transition-colors duration-200">
                      {item.svgIcon}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default InlineMenu;
