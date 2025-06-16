"use client"
// import { RenderStudentInput } from "@/components/AddStudent/addSTinput"
import { StudentInformation } from "@/components/AddStudent/RenderInputs/StudentInformation"
import StudentImageUpload from "@/components/AddStudent/StudentImageUpload"
import {AdditionalData, BasicDataInput, ContactInformationInput, EducationData} from "@/data"
import { IFormValues } from "@/interface"
import { studentFormSchema } from "@/Schema/AddStudent"
import { yupResolver } from "@hookform/resolvers/yup"
import { SubmitHandler, useForm } from "react-hook-form"
const AddStudent = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<IFormValues>({
        resolver: yupResolver(studentFormSchema),
      });
    console.log(errors)
    const onSubmit: SubmitHandler<IFormValues> = (data) => {
      console.log(data)
    }
    return (
        <div className="pb-16 bg-slate-800 text-white">
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-9/12 mx-auto space-y-5 pt-5">
                <h1 className="text-3xl font-bold">اضافه طالب</h1>
                <div className="space-y-7">
                    <h2 className="text-2xl text-end">البيانات الاساسيه</h2>
                    <div className="grid grid-cols-2 gap-5">
                      {/* <RenderStudentInput inputData={BasicDataInput}  /> */}
                      <StudentInformation errors={errors}  register={register}  data={BasicDataInput}/>
                    </div>
                </div>
                <div>
                    <StudentImageUpload/>
                </div>
                <div className="space-y-7">
                    <h2 className="text-2xl text-end">بيانات الاتصال</h2>
                    <div className="grid grid-cols-2 gap-5">
                    <StudentInformation errors={errors} register={register}  data={ContactInformationInput}/>
                    </div>
                </div>
                <div className="space-y-7">
                    <h2 className="text-2xl text-end">بيانات التعليم</h2>
                    <div className="grid grid-cols-2 gap-5">
                      {/* <RenderStudentInput inputData={EducationData}/> */}
                      <StudentInformation errors={errors} register={register}  data={EducationData}/>
                    </div>
                </div>
                <div className="space-y-7">
                    <h2 className="text-2xl text-end">بيانات اضافيه</h2>
                    <div className="grid grid-cols-2 gap-5">
                    <StudentInformation errors={errors} register={register}  data={AdditionalData}/>
                      {/* <RenderStudentInput inputData={AdditionalData}/> */}
                    </div>
                </div>

                <div className="flex justify-end">
                    <button type="submit" className="px-8 py-2 text-2xl bg-orange-600 text-white rounded-md hover:bg-orange-700 flex items-center space-x-1">
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
export default AddStudent;