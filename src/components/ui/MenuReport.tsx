"use client";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface InlineMenuProps {
  name: string;
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
        className="bg-white/20 flex space-x-3 hover:bg-white/50 text-white py-1 px-2 rounded-md cursor-pointer transition"
      >
        {name}
        {svg}
      </button>

      {isOpen &&
        createPortal(
          <div
            ref={menuRef}
            className="absolute w-60 bg-slate-700 text-white rounded-md shadow z-[9999]"
            style={{
              top: position.top,
              left: position.left,
              position: "absolute",
            }}
          >
            <ul className="py-1">
              {items.map((item, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setIsOpen(false);
                    console.log(`تم اختيار: ${item.name}`);
                  }}
                  className="px-3 py-2 flex justify-between text-start hover:bg-slate-800 text-sm cursor-pointer"
                >
                  {item.name}
                  {item.svgIcon}
                </li>
              ))}
            </ul>
          </div>,
          document.body
        )}
    </>
  );
};

export default InlineMenu;
