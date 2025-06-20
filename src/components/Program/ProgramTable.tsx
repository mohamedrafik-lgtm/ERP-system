import { programs } from "@/data";


const ProgramTable = () => {
  return (
    <div className="overflow-x-auto p-4" dir="ltr">
      <div className="rounded-lg overflow-hidden border border-gray-300">
        <table className="min-w-full text-sm">
          <thead className=" text-left bg-white">
            <tr>
              <th className="px-4 py-5">الاسم باللغة العربية</th>
              <th className="px-4 py-2">الاسم باللغة الانجليزية</th>
              <th className="px-4 py-2">المده</th>
              <th className="px-4 py-2">المصاريف</th>
              <th className="px-4 py-2">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {programs.map((program, idx) => (
              <tr
                key={idx}
                className=" bg-white transition duration-200 border-t border-gray-200"
              >
                
                <td className="px-4 py-3 font-medium ">{program.program_name}</td>
                <td className="px-4 py-3 ">{program.description}</td>
                <td className="px-4 py-3 ">{program.duration}</td>
                <td className="px-4 py-3 ">{program.fees}</td>
                <td className="px-4 py-3 flex space-x-5 text-sm ">
                <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-md cursor-pointer">حذف</button> 
                <button className="bg-green-500 hover:bg-green-600 text-white  py-1 px-2 rounded-md cursor-pointer">تعديل</button> 
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
