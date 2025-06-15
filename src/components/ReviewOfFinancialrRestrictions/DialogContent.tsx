"use client";
import { EntryFormData } from "@/interface";
import { useForm, SubmitHandler } from "react-hook-form"



const NewEntryForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EntryFormData>()
  const onSubmit: SubmitHandler<EntryFormData> = (data) => {
    console.log(data, errors) 
    reset()
  }

  return (
    <div className="bg-white/20 text-white p-6 rounded-xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">ادخل قيد جديد</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">من حساب:</label>
            <select
              className="w-full bg-transparent border border-white/50 rounded px-3 py-2"
              
              {...register('fromAccount')}
            >
              <option value="">اختر حساب</option>
              <option>حسابات المتدربين</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">إلى حساب:</label>
            <select
              
              className="w-full bg-transparent border border-white/50 rounded px-3 py-2"
              
              {...register('toAccount')}
            >
              <option value="">اختر حساب</option>
              <option>حسابات المتدربين</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">التاريخ:</label>
            <input
              type="date"
              
              className="w-full bg-transparent border border-white/50 rounded px-3 py-2"
              {...register('date')}
            />
          </div>
          <div>
            <label className="block mb-1">المبلغ:</label>
            <input
              type="number"
              className="w-full bg-transparent border border-white/50 rounded px-3 py-2"
              {...register('amount')}
            />
          </div>
        </div>
        <div>
          <label className="block mb-1">ملاحظات:</label>
          <textarea
            className="w-full bg-transparent border border-white/50 rounded px-3 py-2"
            rows={3}
           {...register('notes')}
          ></textarea>
        </div>
        <div>
          <div className="relative">
               <input
                 type="file"
                 id="upload"
                 className="hidden"
                 {...register('file')}
               />
               <label
                 htmlFor="upload"
                              className="block w-full text-white border text-center rounded-xl px-5 py-2 cursor-pointer"
               >
                 اختر صورة أو ملف
               </label>
             </div>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded"
          >
            حفظ
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewEntryForm;
