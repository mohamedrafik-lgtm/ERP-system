// components/ProgramTableSkeleton.tsx
import React from "react";

const ProgramTableSkeleton = () => {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-6 bg-gray-300 rounded w-1/4" />
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">اسم البرنامج</th>
              <th className="p-3 text-left">السعر</th>
              <th className="p-3 text-left">الوصف</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(10)].map((_, i) => (
              <tr key={i} className="border-b">
                <td className="p-3"><div className="h-4 bg-gray-300 rounded w-6" /></td>
                <td className="p-3"><div className="h-4 bg-gray-300 rounded w-40" /></td>
                <td className="p-3"><div className="h-4 bg-gray-300 rounded w-20" /></td>
                <td className="p-3"><div className="h-4 bg-gray-300 rounded w-64" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProgramTableSkeleton;
