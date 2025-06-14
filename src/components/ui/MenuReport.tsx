import { useState, useEffect, useRef } from "react";

interface InlineMenuProps {
  name: string;
  svgIcon?: React.ReactNode;
}

type MenuProps = {
  items: InlineMenuProps[];
  svg?:React.ReactNode
  name?:string
};

const InlineMenu: React.FC<MenuProps> = ({ items, svg, name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // إغلاق القائمة عند الضغط خارجها
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white/20 flex space-x-3 hover:bg-white/50 text-white py-1 px-2 rounded-md cursor-pointer transition"
      >
        {name}
        
          {svg}
      </button>

      {isOpen && (
        <div className="absolute left-0  top-full mt-1 w-60 bg-slate-700 text-white rounded-md shadow z-10">
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
        </div>
      )}
    </div>
  );
};

export default InlineMenu;
