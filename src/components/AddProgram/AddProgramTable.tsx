import { programs } from "@/data";


const ProgramTable = () => {
  return (
    <div className="overflow-x-auto p-4" dir="ltr">
      <div className="rounded-lg overflow-hidden border border-gray-300">
        <table className="min-w-full text-sm">
          <thead className=" text-left">
            <tr>
              <th className="px-4 py-5">اسم البرنامج</th>
              <th className="px-4 py-2">الوصف</th>
              <th className="px-4 py-2">الذمن</th>
              <th className="px-4 py-2">المصاريف</th>
              <th className="px-4 py-2">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {programs.map((program, idx) => (
              <tr
                key={idx}
                className="hover:bg-gray-50 transition duration-200 border-t border-gray-200"
              >
                
                <td className="px-4 py-3 font-medium text-gray-800">{program.program_name}</td>
                <td className="px-4 py-3 text-gray-700">{program.description}</td>
                <td className="px-4 py-3 text-gray-700">{program.duration}</td>
                <td className="px-4 py-3 text-gray-700">{program.fees}</td>
                <td className="px-4 py-3 flex space-x-5 text-sm text-gray-700">
                  <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-md cursor-pointer">حذف</button> 
                  <button className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded-md cursor-pointer">تعديل</button> 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProgramTable;
