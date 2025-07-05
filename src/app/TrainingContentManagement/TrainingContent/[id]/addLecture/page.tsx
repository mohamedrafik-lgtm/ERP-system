"use client";

import { useForm, Controller } from "react-hook-form";
import {  useState } from "react";
import { UploadCloud } from "lucide-react";
import SelectField from "@/components/Lecre/select";
import { useParams } from "next/navigation";
import { ILecture, ITypeLecture } from "@/interface";
import { useAddLectureMutation } from "@/lip/features/Lecture/lecture";
import toast from "react-hot-toast";



export default function AddLecturePage() {
      const params = useParams();
      const contentId = Number(params.id);
      const [addLecture, {isLoading,isSuccess}] = useAddLectureMutation()
  const { register, handleSubmit, control, setValue, watch,reset } = useForm<ILecture>({
    defaultValues: {
      title: "",
      description: "",
      type: ITypeLecture.VIDEO,
      chapter: 1,
      youtubeUrl: "",
      pdfFile: "",
      order: 1,
      contentId
    },
  });

  const [selectedFileName, setSelectedFileName] = useState("");

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fakeUploadedUrl = URL.createObjectURL(file);
      setValue("pdfFile", fakeUploadedUrl);
      setSelectedFileName(file.name);
    }
  };

  const onSubmit =async (data: ILecture) => {
    console.log(data)
    await addLecture(data);
    reset()
    if(!isSuccess) return toast.success("تم الإضافة بنجاح");
  };

  const typeOptions = [
    { label: "فيديو", value: ITypeLecture.VIDEO },
    { label: " PDF", value: ITypeLecture.PDF },
    { label: "كلاهما", value: ITypeLecture.BOTH },
  ];

  return (
    <div className="max-w-3xl mx-auto p-8">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
          إضافة محاضرة جديدة
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormField label="عنوان المحاضرة">
            <input
              {...register("title")}
              placeholder="اكتب عنوان المحاضرة"
              className="input-field"
            />
          </FormField>

          <FormField label="وصف المحاضرة">
            <textarea
              {...register("description")}
              rows={3}
              placeholder="اكتب وصف مختصر..."
              className="input-field"
            />
          </FormField>

          <FormField label="نوع المحاضرة">
            <Controller
              control={control}
              name="type"
              render={({ field }) => (
                <SelectField
                  value={field.value}
                  onChange={field.onChange}
                  options={typeOptions}
                />
              )}
            />
          </FormField>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="رقم الفصل">
              <input
                type="number"
                placeholder="1"
                {...register("chapter", { valueAsNumber: true })}
                className="input-field"
              />
            </FormField>

            <FormField label="ترتيب المحاضرة">
              <input
                type="number"
                placeholder="مثال: 1"
                {...register("order", { valueAsNumber: true })}
                className="input-field"
              />
            </FormField>
          </div>

          <FormField label="رابط اليوتيوب">
            <input
              type="url"
              placeholder="https://www.youtube.com/..."
              {...register("youtubeUrl")}
              className="input-field"
            />
          </FormField>

          <FormField label="رفع ملف PDF">
            <label className="flex items-center gap-3 border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-blue-400 transition">
              <UploadCloud className="h-6 w-6 text-gray-500" />
              <span className="text-sm text-gray-600">اختر ملف PDF من جهازك</span>
              <input
                type="file"
                accept="application/pdf"
                onChange={onFileChange}
                className="hidden"
              />
            </label>
            {selectedFileName && (
              <p className="text-green-600 text-sm mt-2">
                ✅ تم اختيار الملف: {selectedFileName}
              </p>
            )}
            <input
              type="hidden"
              {...register("pdfFile")}
              value={watch("pdfFile") || ""}
            />
          </FormField>

          

          <button
            type="submit"
            className={`w-full py-3 ${isLoading ? 'cursor-not-allowed' :''} items-center bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition`}
          >
            {
              isLoading ? <div className="flex space-x-2 items-center justify-center">
               <div className="w-4 h-4 bg-white rounded-full animate-bounce"></div>
               <div className="w-4 h-4 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
               <div className="w-4 h-4 bg-white rounded-full animate-bounce [animation-delay:-0.6s]"></div>
             </div> : "إضافة المحاضرة"
            }
            
          </button>
        </form>
      </div>
    </div>
  );
}

const FormField = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <label className="block mb-1 font-medium text-gray-700">{label}</label>
    {children}
  </div>
);



//   return (
//     <Listbox value={value} onChange={onChange}>
//       <div className="relative">
//         <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-4 pr-10 text-left border border-gray-300 focus:outline-none focus:ring focus:border-blue-400 transition">
//           <span className="block truncate">
//             {selected?.label || "اختر النوع"}
//           </span>
//           <span className="absolute inset-y-0 right-0 flex items-center pr-3">
//             <ChevronDown className="h-5 w-5 text-gray-500" />
//           </span>
//         </Listbox.Button>
//         <Transition
//           as={Fragment}
//           leave="transition ease-in duration-75"
//           leaveFrom="opacity-100"
//           leaveTo="opacity-0"
//         >
//           <Listbox.Options className="absolute z-10 mt-1 w-full max-h-60 overflow-auto rounded-lg bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//             {options.map((opt: any) => (
//               <Listbox.Option
//                 key={opt.value}
//                 value={opt.value}
//                 className={({ active }) =>
//                   `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
//                     active ? "bg-blue-100 text-blue-900" : "text-gray-900"
//                   }`
//                 }
//               >
//                 {({ selected }) => (
//                   <>
//                     <span
//                       className={`block truncate ${
//                         selected ? "font-semibold" : "font-normal"
//                       }`}
//                     >
//                       {opt.label}
//                     </span>
//                     {selected && (
//                       <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
//                         <Check className="h-5 w-5" />
//                       </span>
//                     )}
//                   </>
//                 )}
//               </Listbox.Option>
//             ))}
//           </Listbox.Options>
//         </Transition>
//       </div>
//     </Listbox>
//   );
// };

// Tailwind: input-field helper classes
// Add this to your globals or tailwind.config.js:

