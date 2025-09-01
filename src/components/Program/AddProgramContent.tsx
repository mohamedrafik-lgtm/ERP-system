import { ProgramData } from "@/interface";
import { Input } from "../input";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { BookOpen, DollarSign, FileText, Globe } from "lucide-react";

type InputProps = {
  register: UseFormRegister<ProgramData>;
  required?: boolean;
  errors: FieldErrors<ProgramData>;
};

const AddProgramForm = ({ register, errors }: InputProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-blue-500" />
          اسم البرنامج (بالعربي)
        </label>
        <Input
          type="text"
          {...register("nameAr", { required: "اسم البرنامج بالعربي مطلوب" })}
          className={`w-full border rounded-xl px-4 py-3 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.nameAr ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
          }`}
          placeholder="أدخل اسم البرنامج باللغة العربية"
        />
        {errors.nameAr && (
          <p className="text-red-500 text-sm flex items-center gap-1">
            <span className="w-1 h-1 bg-red-500 rounded-full"></span>
            {errors.nameAr.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
          <Globe className="w-4 h-4 text-green-500" />
          اسم البرنامج (بالإنجليزي)
        </label>
        <Input
          type="text"
          {...register("nameEn", { required: "اسم البرنامج بالإنجليزي مطلوب" })}
          className={`w-full border rounded-xl px-4 py-3 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.nameEn ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
          }`}
          placeholder="Enter program name in English"
        />
        {errors.nameEn && (
          <p className="text-red-500 text-sm flex items-center gap-1">
            <span className="w-1 h-1 bg-red-500 rounded-full"></span>
            {errors.nameEn.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-orange-500" />
          سعر البرنامج
        </label>
        <Input
          type="number"
          {...register("price", { required: "سعر البرنامج مطلوب" })}
          className={`w-full border rounded-xl px-4 py-3 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.price ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
          }`}
          placeholder="أدخل سعر البرنامج"
        />
        {errors.price && (
          <p className="text-red-500 text-sm flex items-center gap-1">
            <span className="w-1 h-1 bg-red-500 rounded-full"></span>
            {errors.price.message}
          </p>
        )}
      </div>

      <div className="space-y-2 md:col-span-2">
        <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
          <FileText className="w-4 h-4 text-purple-500" />
          وصف البرنامج
        </label>
        <textarea
          {...register("description", { required: "وصف البرنامج مطلوب" })}
          rows={4}
          className={`w-full border rounded-xl px-4 py-3 resize-none transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.description ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
          }`}
          placeholder="أدخل وصفاً مفصلاً للبرنامج التدريبي"
        />
        {errors.description && (
          <p className="text-red-500 text-sm flex items-center gap-1">
            <span className="w-1 h-1 bg-red-500 rounded-full"></span>
            {errors.description.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default AddProgramForm;
