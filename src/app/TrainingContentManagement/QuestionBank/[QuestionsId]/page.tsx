import AddQuestionModal from "@/components/questionBank/AddQuestionModal"
import { QuesionCard } from "@/components/questionBank/QuesionCard"

const Questions = () =>{
    return (
        <div>
            <div className="w-10/12 mx-auto mt-14 space-y-14 mb-14" dir="ltr">
                {/* title */}
                <div className="flex justify-between items-center">
                    <div className="space-y-2">
                         <h1 className="text-white text-3xl">اسأله الماده</h1>
                         <span className="text-white/20 text-sm">جميع الاسأله الخاصه بماده تحليل النظم</span>
                    </div>
                    <div>
                        <AddQuestionModal ButtonContent="اضافه سؤال"/>
                    </div>
                </div>

                {/* content */}
                <div className="space-y-5">
                 <h3 className="text-2xl text-white">الاسأله</h3>
                 <QuesionCard/>
                 <QuesionCard/>
                 <QuesionCard/>
                 <QuesionCard/>
                 <QuesionCard/>
                 <QuesionCard/>
                 <QuesionCard/>
                 <QuesionCard/>
                 <QuesionCard/>
                </div>
            </div>
        </div>
    )
}

export default Questions