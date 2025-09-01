"use client"
import { ReactNode, useEffect, useRef, useState, useCallback, memo } from "react"
import Link from "next/link";
interface list{
    name:string,
    svg?:ReactNode,
    url:string
}
interface IProps{
    name:string,
    list:list[]
}
const DropmenuComponent = ({name,list}:IProps) =>{
     const [isOpen,setIsOpen] = useState(false);
     const dropdownRef = useRef<HTMLLIElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);
    return(
         <li className="relative list-none" ref={dropdownRef}>
          <button 
            className={`group flex items-center gap-2 px-4 py-2 font-medium rounded-xl transition-all duration-300 hover:scale-105 ${
              isOpen 
                ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg' 
                : 'text-gray-700 hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-600 hover:text-white hover:shadow-lg'
            }`} 
            onClick={toggleMenu}
          >
            <span>{name}</span>
            <svg 
              className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden border border-gray-100 backdrop-blur-sm">
              {/* Header */}
              <div className="px-4 py-3 bg-gradient-to-r from-orange-50 to-red-50 border-b border-gray-100">
                <h4 className="text-sm font-bold text-gray-800">{name}</h4>
                <p className="text-xs text-gray-600">اختر من الخيارات التالية</p>
              </div>
              
              {/* Menu Items */}
              <ul className="py-2" onClick={closeMenu}>
                {list.map((itm,idx)=>(
                  <li key={idx}>
                    <Link 
                      href={itm.url} 
                      className="group flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-700 transition-all duration-200"
                    >
                      <div className="w-10 h-10 bg-gradient-to-r from-orange-100 to-orange-200 rounded-xl flex items-center justify-center group-hover:from-orange-200 group-hover:to-orange-300 transition-all duration-200">
                        {itm.svg}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{itm.name}</p>
                        <p className="text-xs text-gray-500">انقر للانتقال</p>
                      </div>
                      <svg className="w-4 h-4 text-gray-400 group-hover:text-orange-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
    )
}

export const Dropmenu = memo(DropmenuComponent);