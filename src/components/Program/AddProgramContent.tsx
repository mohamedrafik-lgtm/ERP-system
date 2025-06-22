import { ProgramData } from "@/interface";
import { Input } from "../input";
import { FieldErrors, UseFormRegister } from "react-hook-form";

type InputProps = {
  register: UseFormRegister<ProgramData>;
  required?: boolean;
  errors: FieldErrors<ProgramData>;
};

const AddProgramForm = ({ register, errors }: InputProps) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm mb-1">اسم البرنامج (بالعربي)</label>
        <Input
          type="text"
          {...register("nameAr", { required: "اسم البرنامج بالعربي مطلوب" })}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        {errors.nameAr && <p className="text-red-500 text-sm">{errors.nameAr.message}</p>}
      </div>

      <div>
        <label className="block text-sm mb-1 ">اسم البرنامج (بالإنجليزي)</label>
        <Input
          type="text"
          {...register("nameEn", { required: "اسم البرنامج بالإنجليزي مطلوب" })}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        {errors.nameEn && <p className="text-red-500 text-sm">{errors.nameEn.message}</p>}
      </div>

      <div>
        <label className="block text-sm mb-1 ">سعر البرنامج</label>
        <Input
          type="number"
          {...register("price", { required: "سعر البرنامج مطلوب" })}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
      </div>

      <div>
        <label className="block text-sm mb-1 ">وصف قصير</label>
        <textarea
          {...register("description", { required: "وصف البرنامج مطلوب" })}
          rows={3}
          className="w-full border border-gray-300 rounded px-3 py-2 resize-none"
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>
    </div>
  );
};

export default AddProgramForm;
