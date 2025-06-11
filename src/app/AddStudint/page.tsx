import { renderstInput } from "@/components/addSTinput"
import StudentImageUpload from "@/components/AddStudint/StudentImageUpload"

const AddStudint = () => {

    return (
        <div className="pb-16">
            <form className="max-w-9/12 mx-auto space-y-5">
                <h2 className="text-3xl font-bold  mt-3">اضافه طالب</h2>
                <div className="space-y-7">
                    <h2 className="text-2xl text-end">البيانات الاساسيه</h2>
                    <div className="grid grid-cols-2 gap-5">
                      {renderstInput}
                    </div>
                </div>
                <div>
                    <StudentImageUpload/>
                </div>
            </form>
        </div>
    )
}
export default AddStudint