import Link from "next/link";
import RoleModel from "./RoleModel";

const roles = [
    { id: 1, name: "المدير", userCount: 1 },
    { id: 2, name: "الرئيس", userCount: 2 },
    { id: 3, name: "المشرفين", userCount: 5 },
    { id: 4, name: "المحاسبين", userCount: 3 },
    { id: 5, name: "المسوقين", userCount: 4 },
    { id: 6, name: "موظف شؤون المتدربين", userCount: 2 },
    { id: 7, name: "أمين معمل", userCount: 1 },
  ];
  
  const RolesPermissionsTable = () => {
    return (
      <div dir="rtl" className=" space-y-4 ">
        {/* عنوان الأعمدة */}
        <div className="grid grid-cols-5 bg-white font-bold text-sm p-2 rounded-md">
          <div>م</div>
          <div>الإسم</div>
          <div>المستخدمين</div>
          <div className="text-center">الصلاحيات</div>
          <div className="text-center">تحكم</div>
        </div>
  
        {/* صفوف البيانات */}
        {roles.map((role, idx) => (
          <div
            key={role.id}
            className="grid grid-cols-5 items-center bg-white backdrop-blur-md rounded-xl p-2 shadow-sm hover:shadow-md transition-all duration-200"
          >
            <div className="text-sm font-semibold">{idx + 1}</div>
            <div className="text-sm">{role.name}</div>
            <div className="text-sm">
              <div className="w-fit px-2 py-1  flex items-center cursor-pointer rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" />
                </svg>

              {role.userCount}
              </div>
              </div>
  
            {/* زر إدارة */}
            <div className="flex justify-center">
              <Link
                href={`#`}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm flex justify-center"
              >
                تحكم
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
              </Link>
            </div>
  
            {/* تحكم */}
            <div className="flex  justify-center gap-2">
            <RoleModel title="تعديل الصلاحيه" btContent={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>} className={"bg-white hover:bg-white/40 px-3 py-1 rounded-md text-sm"}/>
              {/* <button className="">
                  

              </button> */}
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default RolesPermissionsTable;
  