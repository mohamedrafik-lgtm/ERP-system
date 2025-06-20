import AddQuestionModal from "./AddQuestionModal"

export const QuesionCard = () => {
    return (
        <div className="bg-white grid grid-cols-1 md:grid-cols-4 gap-4 justify-between items-center hover:bg-black/10 transition-all duration-300 rounded-xl p-4">
            <div className="space-y-2 md:col-span-3">
                {/* the Quesion */}
                <h3 className="text-lg md:text-xl ">احسب ترتيب العمليات حسب نظام الداخل اولا خارج اخيرا</h3>
                {/* the Answer */}
                <div className=" flex flex-wrap gap-2 justify-start md:justify-between items-center text-sm md:text-base">
                    <span>ا- دخول العمليه 1</span>
                    <span>ب- دخول العمليه 1</span>
                    <span>ج- دخول العمليه 1</span>
                    <span>د- دخول العمليه 1</span>
                </div>
            </div>

            <div className="flex justify-end ">
                <AddQuestionModal ButtonContent={<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                            </svg>}/>
            </div>
        </div>
    )
}
