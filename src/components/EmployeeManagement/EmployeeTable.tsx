import { users } from "@/data";
import { NavigationButton } from "../ui/NavigationButton";

const EmployeeTable = () => {
  return (
    <div className=" space-y-2">
      {/* عنوان الأعمدة */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 bg-white font-bold text-sm p-2 rounded-md">
        <div>م</div>
        <div>الاسم</div>
        <div>المجموعة</div>
        <div>التقارير</div>
        <div>البرامج التدريبية</div>
        <div className="text-center">تحكم</div>
      </div>

      {/* البيانات */}
      {users.map((user, idx) => (
        <div
          key={idx}
          className="bg-white hover:bg-black/10 backdrop-blur-md rounded-xl p-2 shadow-sm hover:shadow-md transition-all duration-200"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 items-center">
            <div className="text-sm font-semibold">{user.id}</div>
            <div className="text-sm font-semibold">{user.name}</div>
            <div className="text-sm">{user.group}</div>

            {/* زر التقارير */}
            <div>
              <button className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-4 py-1 rounded-md">
               التقارير
              </button>
            </div>

            {/* زر البرامج التدريبية */}
            <div>
              <NavigationButton className="bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1 rounded-md" url={`/EmployeeManagement/${user.id}`} name={"عرض البرامج"} />
            </div>

            {/* أزرار التحكم */}
            <div className="flex gap-2 justify-center">
              <button className=" hover:bg-white/40  p-1.5 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zM16.862 4.487L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21a48.108 48.108 0 00-3.478-.397M5.25 6.187a48.11 48.11 0 013.478-.397m7.5 0V4.874c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916M3 6.187c.34-.059.68-.114 1.022-.165M4.772 5.79L6 18a2.25 2.25 0 002.244 2.077h7.832A2.25 2.25 0 0018.16 18L19.5 7.125" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmployeeTable;
