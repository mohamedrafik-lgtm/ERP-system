'use client';
import Image from "next/image";
import img from "@/img/454375571_1646661866176465_6149835982982053363_n.jpg";
import { AdditionalData, BasicDataInput, ContactInformationInput, EducationData } from "@/data";
import StudentImageUpload from "@/components/AddStudent/StudentImageUpload";
import { StudentInformation } from "@/components/AddStudent/RenderInputs/StudentInformation";
import { yupResolver } from "@hookform/resolvers/yup"
import { SubmitHandler, useForm } from "react-hook-form"
import { studentFormSchema } from "@/Schema/AddStudent"
import { IFormValues } from "@/interface";

const TraineeControl = () => {
  const {
          register,
          handleSubmit,
          setValue,
          formState: { errors },
        } = useForm<IFormValues>({
          resolver: yupResolver(studentFormSchema),
          mode: 'onBlur', // تفعيل التحقق عند فقدان التركيز
        });
      
      console.log(errors);
      
      const onSubmit: SubmitHandler<IFormValues> = (data) => {
        // الآن جميع البيانات بما فيها الصورة متوفرة في كائن data
        console.log("جميع بيانات النموذج:", data);
        
        // هنا يمكنك إرسال البيانات إلى الخادم
        // مثال: sendDataToServer(data);
      }

  const handleImageUpload = (file: File, preview: string) => {
    // تعيين قيمة photoUrl في النموذج مباشرة
    setValue('photoUrl', preview);
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} dir="ltr" className="w-9/12 mx-auto pt-14 space-y-14">
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
            <div dir="rtl" className="bg-orange-600 p-6  text-white rounded-b-lg">
                
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
                      <StudentInformation errors={errors}  register={register}  data={BasicDataInput} required={true}/>
            </div>
        </div>
        <div className="space-y-5 font-bold"> 
            <h2 className="text-white text-2xl border-b py-4">رفع صورة المتدرب <span className="text-red-500">*</span></h2>
             {/* Upload Image */}
             <div className="text-white">
                 <StudentImageUpload onImageUpload={handleImageUpload} />
                 {/* حقل مخفي لتخزين قيمة الصورة */}
                 <input type="hidden" {...register('photoUrl', { required: "صورة الطالب مطلوبة" })} />
                 {errors.photoUrl?.message && (
                   <p className="text-red-400 text-sm mt-2">
                     {errors.photoUrl.message.toString()}
                   </p>
                 )}
             </div>
        </div>
        <div className="space-y-5 font-bold">
            <h2 className="text-white text-2xl border-b py-4">معلومات التواصل</h2>
             {/* Contact Information */}
           <div className="grid grid-cols-2 gap-4  text-white">
           <StudentInformation errors={errors} register={register}  data={ContactInformationInput} required={true}/>
           </div>
        </div>
        <div className="space-y-5 font-bold">
            <h2 className="text-white text-2xl border-b py-4">بيانات تعليمية</h2>
            {/* Education Data */}
            <div className="grid grid-cols-2 gap-4  text-white">
            <StudentInformation errors={errors} register={register}  data={EducationData} required={true}/>
            </div>
        </div>
        <div className="space-y-5 font-bold">
            <h2 className="text-white text-2xl border-b py-4">بيانات اضافيه</h2>
            {/* Education Data */}
            <div className="grid grid-cols-2 gap-4  text-white">
            <StudentInformation errors={errors} register={register}  data={AdditionalData} required={false}/>
            </div>
        </div>
        <div className="mb-10">
          <button type="submit" className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition duration-300">
            حفظ التعديلات
          </button>

        </div>
      </form>
    </div>
  );
};

export default TraineeControl;
