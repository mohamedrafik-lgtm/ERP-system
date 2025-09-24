"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCreateMarketingEmployeeMutation } from "@/lip/features/marketers/marketersApi";
import toast from "react-hot-toast";
import {
  UserPlus,
  ArrowRight,
  Save,
  RefreshCw,
  AlertCircle,
  User,
  Mail,
  Phone
} from "lucide-react";
import Link from "next/link";

// Validation schema - مبسط للـ API الجديد
const schema = yup.object({
  name: yup.string().required("الاسم مطلوب").min(2, "الاسم يجب أن يكون على الأقل حرفين"),
  phone: yup.string().required("رقم الهاتف مطلوب").matches(/^[0-9+\-\s]+$/, "رقم الهاتف غير صحيح"),
  email: yup.string().email("البريد الإلكتروني غير صحيح").optional(),
  isActive: yup.boolean().optional()
});

type FormData = yup.InferType<typeof schema>;

const AddMarketer = () => {
  // RTK Query mutation
  const [createMarketingEmployee, { isLoading: isSubmitting }] = useCreateMarketingEmployeeMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      isActive: true
    }
  });

  const onSubmit = async (data: FormData) => {
    // Toast تحميل
    const loadingToast = toast.loading("جاري إضافة موظف التسويق... ⏳", {
      position: "top-center",
      style: {
        background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
        color: "white",
        fontWeight: "bold",
        fontSize: "16px",
        padding: "16px 24px",
        borderRadius: "12px",
        boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)",
      },
    });

    try {
      console.log("Submitting marketing employee data:", data);
      
      const result = await createMarketingEmployee(data).unwrap();
      
      // إزالة toast التحميل
      toast.dismiss(loadingToast);
      
      console.log("Marketing employee created successfully:", result);
      
      // Toast نجاح مع تصميم جميل
      toast.success("تم إضافة موظف التسويق بنجاح! 🎉", {
        duration: 4000,
        position: "top-center",
        style: {
          background: "linear-gradient(135deg, #10b981, #059669)",
          color: "white",
          fontWeight: "bold",
          fontSize: "16px",
          padding: "16px 24px",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(16, 185, 129, 0.3)",
        },
        icon: "✅",
      });
      
      reset();
    } catch (error) {
      console.error("Error creating marketing employee:", error);
      
      // إزالة toast التحميل
      toast.dismiss(loadingToast);
      
      // Toast خطأ مع تصميم جميل
      toast.error("حدث خطأ في إضافة موظف التسويق! ❌", {
        duration: 4000,
        position: "top-center",
        style: {
          background: "linear-gradient(135deg, #ef4444, #dc2626)",
          color: "white",
          fontWeight: "bold",
          fontSize: "16px",
          padding: "16px 24px",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(239, 68, 68, 0.3)",
        },
        icon: "❌",
      });
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmMWY1ZjkiIGZpbGwtb3BhY2l0eT0iMC40Ij48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-60"></div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Link
              href="/Marketing"
              className="p-3 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 border border-gray-200/50"
            >
              <ArrowRight className="w-5 h-5" />
            </Link>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                <UserPlus className="w-8 h-8 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-black bg-gradient-to-r from-gray-900 via-green-800 to-emerald-800 bg-clip-text text-transparent">
                إضافة مسوق جديد
              </h1>
              <p className="text-lg text-gray-600 font-medium">
                أضف مسوق جديد إلى النظام
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Basic Information */}
            <div className="bg-gradient-to-r from-blue-50/50 to-purple-50/50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">المعلومات الأساسية</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    الاسم *
                  </label>
                  <input
                    {...register("name")}
                    type="text"
                    className="w-full py-3 px-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100/50 focus:border-blue-500 transition-all duration-300 text-lg"
                    placeholder="أدخل اسم موظف التسويق"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    رقم الهاتف *
                  </label>
                  <div className="relative">
                    <input
                      {...register("phone")}
                      type="tel"
                      className="w-full py-3 px-4 pr-12 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100/50 focus:border-blue-500 transition-all duration-300 text-lg"
                      placeholder="+201234567890"
                    />
                    <Phone className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    البريد الإلكتروني (اختياري)
                  </label>
                  <div className="relative">
                    <input
                      {...register("email")}
                      type="email"
                      className="w-full py-3 px-4 pr-12 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100/50 focus:border-blue-500 transition-all duration-300 text-lg"
                      placeholder="example@company.com"
                    />
                    <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Active Status */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    حالة النشاط
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      {...register("isActive")}
                      type="checkbox"
                      className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">نشط</span>
                  </div>
                </div>
              </div>
            </div>


            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <button
                type="button"
                onClick={() => {
                  reset();
                  toast.success("تم مسح النموذج بنجاح! 🗑️", {
                    duration: 2000,
                    position: "top-center",
                    style: {
                      background: "linear-gradient(135deg, #6b7280, #4b5563)",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "14px",
                      padding: "12px 20px",
                      borderRadius: "10px",
                      boxShadow: "0 8px 20px rgba(107, 114, 128, 0.3)",
                    },
                    icon: "🗑️",
                  });
                }}
                className="px-8 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                <span>مسح النموذج</span>
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>جاري الحفظ...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    <span>حفظ موظف التسويق</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMarketer;
