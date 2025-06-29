'use client';
import { useGetUserEmployeeQuery,useDeleteEmployeeMutation } from "@/lip/features/users/user";
import { RowCardSkeleton } from "../ui/Skeleton";
import ConfirmationModal from "./ConfirmationModal";

const EmployeeTable = () => {
  const {data,isLoading} = useGetUserEmployeeQuery()
  if(isLoading) return <RowCardSkeleton/>;
  return (
    <div className=" space-y-2">
      {/* عنوان الأعمدة */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 bg-white font-bold text-sm p-2 rounded-md">
        <div className="text-center">م</div>
        <div className="text-center">الاسم</div>
        <div className="text-center">البريد الالكتروني</div>
        <div className="text-center">الصلاحيه</div>
        <div className="text-center">تعديل</div>
        <div className="text-center">حذف</div>
      </div>

      {/* البيانات */}
      {data?.map((user, idx) => (
        <div
          key={idx}
          className="bg-white hover:bg-black/5 backdrop-blur-md rounded-xl p-2 shadow-sm hover:shadow-md transition-all duration-300"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 items-center">
            <div className="text-sm text-center">{idx}</div>
            <div className="text-sm text-center">{user.name}</div>
            <div className="text-sm text-center">{user.email}</div>
            <div className="text-sm text-center">{user.role}</div>
            <div className="flex justify-center"> 
              <button className={`text-white bg-green-500 px-3 py-1 rounded-md hover:bg-green-600 transition-all duration-300`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zM16.862 4.487L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
              </button>
            </div>

            <div className="flex justify-center">
              <ConfirmationModal email={user.email} id={user.id} name={user.name}/>

            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmployeeTable;
