"use client"
import { ReactNode, useEffect, useRef, useState, } from "react"
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
export const Dropmenu = ({name,list}:IProps) =>{
     const [isOpen,setIsOpen] = useState(false);
     const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
    return(
         <li className="relative list-none"ref={dropdownRef}
            
        >
          <button className={`font-normal py-1 px-3 hover:bg-orange-600 ${isOpen ? 'bg-orange-600 text-white' : ""} hover:text-white transition-all duration-300 rounded-md`} onClick={() => setIsOpen((prev) => !prev)}
          >
             {name}
          </button>

          {isOpen && (
                <ul className={`absolute right-0 mt-6 w-60 text-black bg-white p-1 rounded-md shadow-md z-10 text-right transition-all duration-300`} onClick={()=>setIsOpen(false)}>
                {list.map((itm,idx)=><Link href={itm.url} key={idx} className="flex justify-between  items-center rounded-md px-4 py-2  hover:bg-black transition-all duration-300 hover:text-white cursor-pointer">
                    <div>{itm.svg}</div>
                    <li className="font-normal" key={idx}>{itm.name}</li>
                </Link>)}
            </ul>
          )}
        </li>
    )
}