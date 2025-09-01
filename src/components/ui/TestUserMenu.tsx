"use client";
import { useState } from "react";

const TestUserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        اختبار القائمة
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white border rounded shadow-lg z-50">
          <div className="p-4">
            <p className="font-bold">الملف الشخصي</p>
            <p className="text-sm text-gray-600">عرض وتعديل بياناتك</p>
          </div>
          <div className="p-4 border-t">
            <p className="font-bold">الإعدادات</p>
            <p className="text-sm text-gray-600">تخصيص تجربتك</p>
          </div>
          <div className="p-4 border-t">
            <button className="text-red-600 font-bold">تسجيل الخروج</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestUserMenu;
