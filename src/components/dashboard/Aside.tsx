"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { X, ChevronLeft, ChevronRight, Menu, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { NavItem } from "@/interface";

interface AsideProps {
  items: NavItem[];
}

const Aside = ({ items }: AsideProps) => {
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const toggleOpen = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  return (
    <>
      {/* زر فتح في الموبايل */}
      <button
        className="md:hidden fixed top-20 right-4 z-40 bg-gray-200 p-2 rounded"
        onClick={() => setIsOpenMobile(true)}
      >
        <Menu />
      </button>

      {/* سايدبار للموبايل */}
      {isOpenMobile && (
        <>
          <div
            className="fixed h-screen inset-0 bg-black/50 z-30"
            onClick={() => setIsOpenMobile(false)}
          />
          <div className="fixed top-0 right-0 w-64 h-full bg-gray-900 text-white z-40 p-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg text-white font-bold">القائمة</span>
              <button onClick={() => setIsOpenMobile(false)}>
                <X />
              </button>
            </div>
            <ul className="space-y-2">
              {items.map((item, index) => (
                <li key={index}>
                  <Link href={item.url || "#"}>
                    <div className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      {/* سايدبار للديسكتوب */}
      <aside
        className={`hidden space-y-7 md:flex flex-col bg-gray-900 text-white transition-all duration-300 h-full ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        <div
          className={`p-2 py-4 flex ${
            isCollapsed ? "justify-center" : "justify-between border-b"
          }`}
        >
          {!isCollapsed && <h2 className="text-2xl font-bold">لوحة التحكم</h2>}
          <button onClick={() => setIsCollapsed(!isCollapsed)}>
            {isCollapsed ? <ChevronLeft /> : <ChevronRight />}
          </button>
        </div>

        <ul className="space-y-2 px-2">
          {items.map((item, index) => {
            const hasChildren = item.children && item.children.length > 0;
            const isOpen = openIndexes.includes(index);

            return (
              <li key={index}>
                {hasChildren ? (
                  <div
                    onClick={() => toggleOpen(index)}
                    className={`flex items-center justify-between cursor-pointer p-2 hover:bg-gray-700 rounded ${
                      isCollapsed ? "justify-center" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {item.icon}
                      {!isCollapsed && <span>{item.label}</span>}
                    </div>
                    {!isCollapsed && (
                      <span>
                        {isOpen ? (
                          <ChevronDown size={16} />
                        ) : (
                          <ChevronRight size={16} />
                        )}
                      </span>
                    )}
                  </div>
                ) : (
                  <Link href={item.url || "#"}>
                    <div
                      className={`flex items-center gap-2 cursor-pointer p-2 hover:bg-gray-700 rounded ${
                        isCollapsed ? "justify-center" : ""
                      }`}
                    >
                      {item.icon}
                      {!isCollapsed && <span>{item.label}</span>}
                    </div>
                  </Link>
                )}

                <AnimatePresence>
                  {isOpen && hasChildren && !isCollapsed && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="pl-6 space-y-1 mt-1 mr-4"
                    >
                      {item.children!.map((child, idx) => (
                        <li key={idx}>
                          <Link href={child.url || "#"}>
                            <div className="p-2 hover:bg-gray-700 rounded text-sm">
                              {child.label}
                            </div>
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </aside>
    </>
  );
};

export default Aside;
