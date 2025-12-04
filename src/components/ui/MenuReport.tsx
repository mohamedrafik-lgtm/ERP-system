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
  studentId?: number;
  onActionClick?: (action: string, studentId?: number) => void;
};

const InlineMenu: React.FC<MenuProps> = ({ items, svg, name, studentId, onActionClick }) => {
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
        className="relative inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-gray-200 transition-all duration-300 shadow-lg hover:shadow-xl group"
      >
        {svg}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </button>

      {isOpen &&
        createPortal(
          <div
            ref={menuRef}
            className="absolute w-72 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/40 z-[9999] overflow-hidden"
            style={{
              top: position.top + 8,
              left: position.left,
              position: "absolute",
            }}
          >
            <div className="p-3">
              <div className="mb-3 px-3 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
                <h3 className="text-sm font-bold text-gray-700 text-center">خيارات الإجراءات</h3>
              </div>
              {items.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsOpen(false);
                    if (onActionClick && item.name) {
                      onActionClick(item.name, studentId);
                    } else {
                      console.log(`تم اختيار: ${item.name}`);
                    }
                  }}
                  className="w-full px-4 py-4 flex items-center justify-between text-right hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 text-sm cursor-pointer rounded-xl transition-all duration-300 group border border-transparent hover:border-blue-200/50 hover:shadow-md"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-gray-100 to-gray-200 group-hover:from-blue-100 group-hover:to-purple-100 rounded-lg flex items-center justify-center transition-all duration-300">
                      {item.svgIcon && (
                        <div className="text-gray-500 group-hover:text-blue-600 transition-colors duration-300">
                          {item.svgIcon}
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <span className="text-gray-700 font-bold text-sm block">{item.name}</span>
                      <span className="text-xs text-gray-500">انقر للتنفيذ</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
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
