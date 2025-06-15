"use client";

import { studentActions, students } from "@/data";
import img from "@/img/454375571_1646661866176465_6149835982982053363_n.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import InlineMenu from "../ui/MenuReport";
import { NavigationButton } from "../ui/NavigationButton";

const StudentTable = () => {
  const router = useRouter();

  return (
    <div className="overflow-x-auto p-4" >
      <div className="rounded-lg overflow-hidden border border-gray-300">
        <table dir="rtl" className="min-w-full text-sm">
          <thead className="text-left">
            <tr className="text-center">
              <th className="px-4 py-5">الصورة</th>
              <th className="px-4 py-2">الاسم</th>
              <th className="px-4 py-2">رقم الملف</th>
              <th className="px-4 py-2">الهاتف الأرضي</th>
              <th className="px-4 py-2">الهاتف المحمول</th>
              <th className="px-4 py-2">التخصص</th>
              <th className="px-4 py-2">مدين</th>
              <th className="px-4 py-2">الرقم الثابت</th>
              <th className="px-4 py-2">الفرقه</th>
              <th className="px-4 py-2">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, idx) => (
              <tr
                key={idx}
                // onClick={() => router.push(`/AllStudent/${student.id}`)}
                className="hover:bg-orange-600 text-white transition duration-200 border-t border-gray-200 cursor-pointer"
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
                <td className="px-4 py-3 font-medium text-white">{student.name}</td>
                <td className="px-4 py-3 text-white">{student.fileNumber}</td>
                <td className="px-4 py-3 text-white">{student.landline}</td>
                <td className="px-4 py-3 text-white">{student.phone}</td>
                <td className="px-4 py-3 text-white">{student.specialization}</td>
                <td className="px-4 py-3 text-white">1543</td>
                <td className="px-4 py-3 text-white">5451151148884</td>
                <td className="px-4 py-3 font-semibold text-white">{student.dues}</td>
                <td
                  className="px-4 py-3 flex space-x-5 text-sm text-white z-10"
                  onClick={(e) => e.stopPropagation()} 
                >
                  {/* <button className="bg-slate-500 hover:bg-slate-600 text-white py-1 px-2 rounded-md cursor-pointer">حذف</button>  */}
                  {/* <button className="bg-white/20 hover:bg-white/50 text-white py-1 px-2 rounded-md cursor-pointer">
                     
                  </button>  */}
                  <InlineMenu name="" items={studentActions.map(action => ({ name: action, value: action }))} 
                    svg={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>}/>
                  <button onClick={() => router.push(`/AllStudent/${student.id}`)} className="bg-white/20 hover:bg-white/50 text-white py-1 px-2 rounded-md cursor-pointer">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                         <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                     </svg>
                  </button>
                  <NavigationButton url="/ExchangeAndPaymentRequests" className="bg-white/20 hover:bg-white/50 text-white py-1 px-2 rounded-md cursor-pointer" name="تحديد"/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentTable;
