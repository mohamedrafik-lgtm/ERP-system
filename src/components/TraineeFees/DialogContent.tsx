"use client";

import { Input } from "../input";
import { Controller, useForm } from "react-hook-form";
import FeesSelectBox from "./FeesSelectBox";


interface FormData {
  programId: number | null;
}
const ModernForm = () => {
  const { handleSubmit, control, watch } = useForm<FormData>({
    defaultValues: { programId: null },
  });




  const onSubmit = (data: FormData) => {
    console.log("🚀 Data ready for API:", data);
  };
  const inputClasses =
    "w-full bg-white border border-white/30 p-2 rounded-md placeholder-black/60";
  const selectClasses =
    "w-full bg-white border border-white/30 p-2 rounded-md text-black";

  return (
    <div className="p-6 bg-white/20 rounded-xl max-w-3xl mx-auto space-y-4">
      <p className="bg-orange-500/90 text-white p-3 rounded-md text-sm leading-relaxed">
        تعديل مبلغ نوع رسوم أو حذف النوع لا يقلل المبالغ المستحقة على المتدربين السابقين، تطبق
        هذا النوع عليهم ولا يسقط مديونيتهم المرتبطة على إضافة هذا النوع من الرسوم عليهم، ولكن لتعديل
        مدفوعه متدرب يتم ذلك من خلال صفحة مدفوعات هذا المتدرب.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* name */}
        <div>
          <label className="block mb-1">الاسم:</label>
          <Input name="name" type="text" className={inputClasses} />
        </div>

        {/* amount */}
        <div>
          <label className="block mb-1">المبلغ:</label>
          <Input name="amount" type="number" className={inputClasses} />
        </div>

        {/* النوع */}
        <div>
        <Controller
        control={control}
        name="programId"
        render={({ field }) => (
          <FeesSelectBox value={field.value} onChange={field.onChange} />
        )}
      />
        </div>

        {/* academicYear */}
        <div>
          <label className="block mb-1">العام التدريبي:</label>
          <Input name="academicYear" type="text" className={inputClasses} />
        </div>

        {/* السماح بالتطبيق المتعدد */}
        <div>
          <label className="block mb-1">
            السماح بالتنسيق أكثر من مرة على نفس المتدرب:
          </label>
          <select name="allowMultipleApply" className={selectClasses}>
            <option value="false">لا</option>
            <option value="true">نعم</option>
          </select>
        </div>

        {/* البرنامج */}
        <div>
        <Controller
        control={control}
        name="programId"
        render={({ field }) => (
          <FeesSelectBox value={field.value} onChange={field.onChange} />
        )}
      />
        </div>

        {/* الخزنة */}
        <div>
            <Controller
            control={control}
            name="programId"
            render={({ field }) => (
              <FeesSelectBox value={field.value} onChange={field.onChange} />
            )}
          />
        </div>
      </form>
    </div>
  );
};

export default ModernForm;