'use client';
import { ILecture, IResponseLecture, ITypeLecture } from '@/interface';
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useParams } from 'next/navigation';
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import SelectField from './select';
import { UploadCloud } from "lucide-react";
import { useUpdateLectureMutation } from '@/lip/features/Lecture/lecture';
import Spinner from '../ui/Spinner';

export default function UpdateLectureModale({youtubeUrl,chapter,contentId,description,order,pdfFile,title,type,id}:IResponseLecture) {
  let [isOpen, setIsOpen] = useState(false)
        const [selectedFileName, setSelectedFileName] = useState("");
        // const params = useParams();
        // const contentId = Number(params.id);
        const [UpdateLecture, {isLoading,isSuccess}] = useUpdateLectureMutation()
  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }


    const { register, handleSubmit, control, setValue, watch,reset } = useForm<IResponseLecture>({
      defaultValues: {
        title,
        description,
        type,
        chapter,
        youtubeUrl,
        pdfFile,
        order,
        id,
      },
    });
  

  
    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const fakeUploadedUrl = URL.createObjectURL(file);
        setValue("pdfFile", fakeUploadedUrl);
        setSelectedFileName(file.name);
      }
    };
  
    const onSubmit =async (data: IResponseLecture) => {
      console.log(data)
      await UpdateLecture(data);
      reset()
      if(!isSuccess) return toast.success("تم الإضافة بنجاح");
    };
  
    const typeOptions = [
      { label: "فيديو", value: ITypeLecture.VIDEO },
      { label: " PDF", value: ITypeLecture.PDF },
      { label: "كلاهما", value: ITypeLecture.BOTH },
    ];

  return (
    <>
      <Button
        onClick={open}
        className="rounded-md bg-green-500 px-2 py-1 text-sm font-medium text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-green-600"
      >
        تعديل 
      </Button>

      <Dialog open={isOpen} onSubmit={handleSubmit(onSubmit)} as="form" className="relative z-10 focus:outline-none" onClose={close} __demoMode>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-3xl rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <DialogTitle as="h3" className="text-base/7 font-medium text-white">
                تعديل المحتوي التدريبي
              </DialogTitle>

                <div  className="space-y-6">
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

          {/* <button
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
            
          </button> */}
        </div>


              <div className="mt-4 space-x-5">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-red-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-red-600 data-open:bg-red-700"
                  onClick={close}
                  type='button'
                >
                  الغاء 
                </Button>
                <Button
                  className={`inline-flex items-center gap-2 ${isLoading ? 'cursor-not-allowed opacity-70' : ''} rounded-md bg-green-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-green-600 data-open:bg-green-700`}
                  onClick={close}
                  type='submit'
                >
                  {isLoading ? <Spinner Color='text-white'/> : 'حفظ'}
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}


const FormField = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <label className="block mb-1 font-medium text-gray-700">{label}</label>
    {children}
  </div>
);