"use client";
import { useState } from "react";

const programs = [
  { id: 1, name: "برنامج تطوير الويب", hasAccess: true },
  { id: 2, name: "برنامج التصميم الجرافيكي", hasAccess: true },
  { id: 4, name: "برنامج إدارة الأعمال", hasAccess: false },
  { id: 5, name: "برنامج إدارة الأعمال", hasAccess: true },
  { id: 6, name: "برنامج إدارة الأعمال", hasAccess: true },
  { id: 7, name: "برنامج إدارة الأعمال", hasAccess: true },
  { id: 8, name: "برنامج إدارة الأعمال", hasAccess: true },
  { id: 9, name: "برنامج إدارة الأعمال", hasAccess: true },
];

const EmployeeDetailsTable = () => {
  const [data, setData] = useState(programs);

  const toggleAccess = (id: number) => {
    const updated = data.map((item) =>
      item.id === id ? { ...item, hasAccess: !item.hasAccess } : item
    );
    setData(updated);
  };

  return (
    <div className="p-4 space-y-4">
      {/* عنوان الأعمدة */}
      <div className="grid grid-cols-3 bg-white/20 text-white font-bold text-sm p-2 rounded-md">
        <div>م</div>
        <div>البرنامج</div>
        <div className="text-center">تحكم</div>
      </div>

      {/* صفوف البيانات */}
      {data.map((program, idx) => (
        <div
          key={program.id}
          className={`bg-white/10 backdrop-blur-md rounded-xl text-white p-2 shadow-sm transition-all duration-200 
            `}
        >
          <div className="grid grid-cols-3 items-center gap-2">
            <div className="text-sm font-semibold">{idx + 1}</div>
            <div className="text-sm">{program.name}</div>
            <div className="flex justify-center">
              <button
                onClick={() => toggleAccess(program.id)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                  program.hasAccess
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {program.hasAccess ? "ممنوع" : "السماح"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmployeeDetailsTable;
