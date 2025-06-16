import QuestionBankTable from "@/components/questionBank/Table";

const QuestionBank = () => {

    return (
        <div>
            <div className="w-10/12 mx-auto mt-10 space-y-16" dir="ltr">
            <div className="flex justify-between items-center">
                   <div>
                       <h1 className="text-white text-3xl ">بنك الاسأله</h1>
                       <span className="text-sm text-white/20">اداره و تنظيم الاسألأه للمواد الدراسيه</span>
                   </div>
                   <div>
                    <button className="px-10 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white">اضافه بنك اسأله</button>
                   </div>
            </div>
            <div className="space-y-5"> 
                <h3 className="text-white text-2xl">تكنولوجيا معلومات</h3>
                <QuestionBankTable/>
            </div>
            <div className="space-y-5"> 
                <h3 className="text-white text-2xl">مساعد خدمات صحيه</h3>
                <QuestionBankTable/>
            </div>
            <div className="space-y-5"> 
                <h3 className="text-white text-2xl">المساحه و التخطيط</h3>
                <QuestionBankTable/>
            </div>
            
            </div>
        </div>
    )
}

export default QuestionBank;