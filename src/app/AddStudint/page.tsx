import { renderstInput } from "@/components/addSTinput"
import StudentImageUpload from "@/components/AddStudint/StudentImageUpload"
import {AdditionalData, BasicBataInput, ContactInformationInput, EducationData} from "@/data"
const AddStudint = () => {

    return (
        <div className="pb-16">
            <form className="max-w-9/12 mx-auto space-y-5">
                <h2 className="text-3xl font-bold  mt-3">اضافه طالب</h2>
                <div className="space-y-7">
                    <h2 className="text-2xl text-end">البيانات الاساسيه</h2>
                    <div className="grid grid-cols-2 gap-5">
                      {renderstInput(BasicBataInput)}
                    </div>
                </div>
                <div>
                    <StudentImageUpload/>
                </div>
                <div className="space-y-7">
                    <h2 className="text-2xl text-end">بيانات الاتصال</h2>
                    <div className="grid grid-cols-2 gap-5">
                      {renderstInput(ContactInformationInput)}
                    </div>
                </div>
                <div className="space-y-7">
                    <h2 className="text-2xl text-end">بيانات التعليم</h2>
                    <div className="grid grid-cols-2 gap-5">
                      {renderstInput(EducationData)}
                    </div>
                </div>
                <div className="space-y-7">
                    <h2 className="text-2xl text-end">بيانات اضافيه</h2>
                    <div className="grid grid-cols-2 gap-5">
                      {renderstInput(AdditionalData)}
                    </div>
                </div>

                <div className="flex justify-end">
                    <button type="submit" className="px-8 py-2 text-2xl bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center space-x-1">
                        حفظ
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 mt-2">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                       </svg>
                        </button>
                </div>
            </form>
        </div>
    )
}
export default AddStudint