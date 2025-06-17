import { Bank } from "@/data";
import Link from "next/link";


const QuestionBankTable = () =>{
    return (
      <div dir="" className=" space-y-4">
        {/* عنوان الأعمدة */}
        <div className="grid grid-cols-3 bg-white/20 text-white font-bold text-sm p-2 rounded-md">
          <div className="text-center">الماده الدراسيه</div>
          <div className="text-center">عدد الاسأله</div>
          <div className="text-center">تحكم</div>
        </div>
  
        {/* صفوف البيانات */}
        {Bank.map((matial) => (
          <div
            key={matial.id}
            className="grid grid-cols-3 items-center bg-white/10 backdrop-blur-md rounded-xl text-white p-2 shadow-sm hover:shadow-md hover:bg-orange-600 transition-all duration-200"
          >
            <div className="text-sm text-center">{matial.name}</div>
            <div className="text-sm text-center">{matial.QustionsCount}</div>
  
            {/* زر إدارة */}
            <div className="flex justify-center">
                <Link href={`/TrainingContentManagement/QuestionBank/${matial.id}`}>
                    <button className="px-3 py-1 cursor-pointer bg-white/20 hover:bg-white/40 rounded-xl">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                             <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                          </svg>
                    </button>
                </Link>
            </div> 
          </div>
        ))}
      </div>
    );
}

export default QuestionBankTable;