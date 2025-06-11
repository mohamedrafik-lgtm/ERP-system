import { students } from "@/data";
import img from "@/img/454375571_1646661866176465_6149835982982053363_n.jpg";
import Image from "next/image";

const studentTable = () => {
  return (
    <div className="overflow-x-auto p-4" dir="ltr">
      <div className="rounded-lg overflow-hidden border border-gray-300">
        <table className="min-w-full text-sm">
          <thead className=" text-left">
            <tr>
              <th className="px-4 py-5">الصورة</th>
              <th className="px-4 py-2">الاسم</th>
              <th className="px-4 py-2">رقم الملف</th>
              <th className="px-4 py-2">الهاتف الأرضي</th>
              <th className="px-4 py-2">الهاتف المحمول</th>
              <th className="px-4 py-2">التخصص</th>
              <th className="px-4 py-2">المستحقات</th>
              <th className="px-4 py-2">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, idx) => (
              <tr
                key={idx}
                className="hover:bg-gray-50 transition duration-200 border-t border-gray-200"
              >
                <td className="px-4 py-3">
                  <Image
                    src={img.src}
                    alt={student.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </td>
                <td className="px-4 py-3 font-medium text-gray-800">{student.name}</td>
                <td className="px-4 py-3 text-gray-700">{student.fileNumber}</td>
                <td className="px-4 py-3 text-gray-700">{student.landline}</td>
                <td className="px-4 py-3 text-gray-700">{student.phone}</td>
                <td className="px-4 py-3 text-gray-700">{student.specialization}</td>
                <td className="px-4 py-3 font-semibold text-gray-700">{student.dues}</td>
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

export default studentTable;
