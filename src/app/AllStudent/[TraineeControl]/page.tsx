import Image from "next/image";
import img from "@/img/454375571_1646661866176465_6149835982982053363_n.jpg";
import { RenderStudentInput } from "@/components/AddStudent/addSTinput";
import { AdditionalData, BasicDataInput, ContactInformationInput, EducationData } from "@/data";
import StudentImageUpload from "@/components/AddStudent/StudentImageUpload";

const TraineeControl = () => {
  return (
    <div>
      <form dir="ltr" className="w-9/12 mx-auto pt-14 space-y-14">
        <div>
          <h1 className="text-white text-3xl">التحكم في المتدرب</h1>
        </div>
        <div className="grid grid-cols-4 gap-10 items-stretch mt-10">
          {/* الصندوق النصي */}
          <div className="rounded-lg border border-white flex flex-col justify-between ">
            <div className="p-4 bg-orange-600 rounded-t-lg">
              <h3 dir="rtl" className="text-white text-right">اخر تعديل بواسطه</h3>
            </div>
            <div className="flex items-center justify-center flex-1">
              <p className="text-white text-3xl font-bold">Raed othman</p>
            </div>
            <div dir="rtl">
                <p className="bg-orange-600 p-3 text-white rounded-b-lg">بتاريخ: 2024-11-12 12:14:42</p>
            </div>
          </div>

          <div className=" rounded-lg border border-white flex flex-col">
            <div className="p-4 bg-orange-600 rounded-t-lg">
              <h3 dir="rtl" className="text-white text-right">بيانات دراسية</h3>
            </div>
            <div className="grid  h-full">
                <div dir="rtl" className="flex items-center justify-around">
                   <span className="text-white text-2xl">البرنامج</span>  <p className="text-white text-2xl">full stack</p>
                </div>
                <div dir="rtl" className="flex justify-around">
                   <span className="text-white text-xl">الفرقه</span>  <p className="text-white text-2xl">1</p>
                </div>
            </div>
            <div dir="rtl" className="bg-orange-600 p-6 text-white rounded-b-lg">
                
                </div>
          </div>

          <div className=" rounded-lg border border-white flex flex-col">
            <div className="p-4 bg-orange-600 rounded-t-lg">
              <h3 dir="rtl" className="text-white text-right">حاله الطالب</h3>
            </div>
            <div className="flex justify-center items-center h-full">
               <h3 className="text-2xl text-white font-bold">مستجد</h3>     
            </div>
            <div dir="rtl" className="bg-orange-600 p-6 p-3 text-white rounded-b-lg">
                
            </div>
          </div>

          {/* الصورة */}
          <div className="px-10 py-5 flex justify-center rounded-md border border-white">
            <Image
              src={img}
              alt="st image"
              width={200}
              height={200}
              className="rounded-lg object-cover"
            />
           
          </div>
        </div>
        <div  className="space-y-5 font-bold">
            <h2 className="text-white text-2xl border-b py-4">بيانات المتدرب</h2>
            <div className="grid grid-cols-2 gap-4  text-white">
                {RenderStudentInput(BasicDataInput)}
            </div>
        </div>
        <div className="space-y-5 font-bold"> 
            <h2 className="text-white text-2xl border-b py-4">رفع صورة المتدرب</h2>
             {/* Upload Image */}
             <div className="text-white">
                 <StudentImageUpload/>
             </div>
        </div>
        <div className="space-y-5 font-bold">
            <h2 className="text-white text-2xl border-b py-4">معلومات التواصل</h2>
             {/* Contact Information */}
           <div className="grid grid-cols-2 gap-4  text-white">
               {RenderStudentInput(ContactInformationInput)}
           </div>
        </div>
        <div className="space-y-5 font-bold">
            <h2 className="text-white text-2xl border-b py-4">بيانات تعليمية</h2>
            {/* Education Data */}
            <div className="grid grid-cols-2 gap-4  text-white">
                {RenderStudentInput(EducationData)}
            </div>
        </div>
        <div className="space-y-5 font-bold">
            <h2 className="text-white text-2xl border-b py-4">بيانات اضافيه</h2>
            {/* Education Data */}
            <div className="grid grid-cols-2 gap-4  text-white">
                {RenderStudentInput(AdditionalData)}
            </div>
        </div>
        <div className="mb-10">
          <button className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition duration-300">
            حفظ التعديلات
          </button>

        </div>
      </form>
    </div>
  );
};

export default TraineeControl;
