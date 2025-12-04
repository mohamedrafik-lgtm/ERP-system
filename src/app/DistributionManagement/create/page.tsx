"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGetProgramsQuery } from "@/lip/features/program/program";
import {
  ArrowLeftIcon,
  UserGroupIcon,
  BookOpenIcon,
  BeakerIcon
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

interface CreateDistributionPayload {
  programId: number;
  type: "THEORY" | "PRACTICAL";
  numberOfRooms: number;
  roomCapacities?: number[];
}

export default function CreateDistributionPage() {
  const router = useRouter();
  const { data: programs, isLoading: programsLoading } = useGetProgramsQuery();

  const [formData, setFormData] = useState<CreateDistributionPayload>({
    programId: 0,
    type: "THEORY",
    numberOfRooms: 1,
    roomCapacities: [0], // على الأقل عنصر واحد
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.programId) {
      toast.error('يرجى اختيار البرنامج التدريبي');
      return;
    }

    if (formData.numberOfRooms < 1) {
      toast.error('عدد المجموعات يجب أن يكون 1 على الأقل');
      return;
    }

    try {
      const token = Cookies.get('access_token') || Cookies.get('auth_token');
      
      // تحديث roomCapacities بناءً على عدد المجموعات
      const dataToSend = {
        ...formData,
        roomCapacities: Array(formData.numberOfRooms).fill(0)
      };
      
      const response = await fetch('http://localhost:4000/api/trainee-distribution', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorData = await response.json();
        
        // عرض رسالة الخطأ من الـ Backend
        if (errorData.message) {
          if (Array.isArray(errorData.message)) {
            toast.error(errorData.message.join(', '));
          } else {
            toast.error(errorData.message);
          }
        } else {
          toast.error(`خطأ ${response.status}: ${errorData.error || 'فشل في إنشاء التوزيع'}`);
        }
        return;
      }

      toast.success('تم إنشاء التوزيع بنجاح');
      router.push('/DistributionManagement');
    } catch (error: any) {
      console.error('Error creating distribution:', error);
      toast.error(error.message || 'حدث خطأ أثناء إنشاء التوزيع');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6" dir="rtl">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <UserGroupIcon className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">توزيع جديد للمتدربين</h1>
                <p className="text-gray-600">قم بإنشاء توزيع جديد للمتدربين على المجموعات الدراسية</p>
              </div>
            </div>
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              رجوع
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          {/* Program Selection */}
          <div className="mb-8">
            <label className="block text-gray-900 font-bold mb-3">
              البرنامج التدريبي <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.programId}
              onChange={(e) => setFormData({ ...formData, programId: Number(e.target.value) })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value={0}>اختر البرنامج</option>
              {programs?.map((program) => (
                <option key={program.id} value={program.id}>
                  {program.nameAr}
                </option>
              ))}
            </select>
          </div>

          {/* Distribution Type */}
          <div className="mb-8">
            <label className="block text-gray-900 font-bold mb-3">
              نوع التوزيع <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: "THEORY" })}
                className={`p-6 border-2 rounded-xl transition-all ${
                  formData.type === "THEORY"
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex flex-col items-center gap-3">
                  <div className={`p-3 rounded-lg ${
                    formData.type === "THEORY" ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    <BookOpenIcon className={`w-8 h-8 ${
                      formData.type === "THEORY" ? 'text-blue-600' : 'text-gray-600'
                    }`} />
                  </div>
                  <span className={`font-bold ${
                    formData.type === "THEORY" ? 'text-blue-900' : 'text-gray-700'
                  }`}>
                    توزيع النظري
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: "PRACTICAL" })}
                className={`p-6 border-2 rounded-xl transition-all ${
                  formData.type === "PRACTICAL"
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex flex-col items-center gap-3">
                  <div className={`p-3 rounded-lg ${
                    formData.type === "PRACTICAL" ? 'bg-purple-100' : 'bg-gray-100'
                  }`}>
                    <BeakerIcon className={`w-8 h-8 ${
                      formData.type === "PRACTICAL" ? 'text-purple-600' : 'text-gray-600'
                    }`} />
                  </div>
                  <span className={`font-bold ${
                    formData.type === "PRACTICAL" ? 'text-purple-900' : 'text-gray-700'
                  }`}>
                    توزيع العملي
                  </span>
                </div>
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-3">
              يمكن إنشاء توزيعين لكل برنامج: توزيع النظري، وتوزيع العملي
            </p>
          </div>

          {/* Number of Rooms */}
          <div className="mb-8">
            <label className="block text-gray-900 font-bold mb-3">
              عدد المجموعات <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="1"
              value={formData.numberOfRooms}
              onChange={(e) => setFormData({ ...formData, numberOfRooms: Number(e.target.value) })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-2xl font-bold"
              required
            />
            <p className="text-sm text-gray-600 mt-3">
              سيتم توزيع المتدربين تلقائياً على المجموعات بشكل أبجدي على المجموعات
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-bold"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-colors font-bold shadow-lg"
            >
              إنشاء التوزيع
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
