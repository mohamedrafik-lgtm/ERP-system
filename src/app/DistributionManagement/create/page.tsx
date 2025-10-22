"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  ArrowRight,
  Plus,
  Minus,
  Save,
  X,
  BookOpen,
  GraduationCap,
  Building2,
  Users,
  AlertCircle,
  CheckCircle,
  Info,
  Loader2
} from "lucide-react";
import { useCreateDistributionMutation } from '@/lip/features/distribution/distributionApi';
import toast from 'react-hot-toast';

// Validation Schema
const createDistributionSchema = yup.object({
  programId: yup.number().required('البرنامج مطلوب').min(1, 'يرجى اختيار برنامج صحيح'),
  type: yup.string().oneOf(['THEORY', 'PRACTICAL'], 'نوع التوزيع مطلوب').required(),
  numberOfRooms: yup.number().required('عدد المجموعات مطلوب').min(1, 'يجب أن يكون عدد المجموعات أكبر من 0'),
  roomCapacities: yup.array().of(yup.number().min(1, 'السعة يجب أن تكون أكبر من 0')).optional()
});

type CreateDistributionFormData = yup.InferType<typeof createDistributionSchema>;

// Mock programs data (in real app, this would come from API)
const mockPrograms = [
  { id: 1, nameAr: "تطوير الويب", nameEn: "Web Development" },
  { id: 2, nameAr: "الذكاء الاصطناعي", nameEn: "Artificial Intelligence" },
  { id: 3, nameAr: "تطوير التطبيقات", nameEn: "App Development" },
  { id: 4, nameAr: "أمن المعلومات", nameEn: "Cybersecurity" },
  { id: 5, nameAr: "علم البيانات", nameEn: "Data Science" }
];

const CreateDistributionPage = () => {
  const router = useRouter();
  const [roomCapacities, setRoomCapacities] = useState<number[]>([]);
  const [showRoomCapacities, setShowRoomCapacities] = useState(false);

  const [createDistribution, { isLoading, error }] = useCreateDistributionMutation();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid }
  } = useForm<CreateDistributionFormData>({
    resolver: yupResolver(createDistributionSchema),
    mode: 'onChange'
  });

  const numberOfRooms = watch('numberOfRooms');
  const type = watch('type');

  // Update room capacities when numberOfRooms changes
  useEffect(() => {
    if (numberOfRooms && numberOfRooms > 0) {
      const newCapacities = Array(numberOfRooms).fill(0);
      setRoomCapacities(newCapacities);
      setValue('roomCapacities', newCapacities);
    }
  }, [numberOfRooms, setValue]);

  const onSubmit = async (data: CreateDistributionFormData) => {
    try {
      const payload = {
        programId: data.programId,
        type: data.type,
        numberOfRooms: data.numberOfRooms,
        roomCapacities: showRoomCapacities ? data.roomCapacities : undefined
      };

      await createDistribution(payload).unwrap();
      toast.success('تم إنشاء التوزيع بنجاح');
      router.push('/DistributionStatistics');
    } catch (error) {
      toast.error('فشل في إنشاء التوزيع');
      console.error('Error creating distribution:', error);
    }
  };

  const updateRoomCapacity = (index: number, value: number) => {
    const newCapacities = [...roomCapacities];
    newCapacities[index] = value;
    setRoomCapacities(newCapacities);
    setValue('roomCapacities', newCapacities);
  };

  const getTypeIcon = (type: string) => {
    return type === 'THEORY' ? (
      <BookOpen className="w-5 h-5" />
    ) : (
      <GraduationCap className="w-5 h-5" />
    );
  };

  const getTypeColor = (type: string) => {
    return type === 'THEORY' 
      ? 'bg-blue-100 text-blue-700 border-blue-200' 
      : 'bg-purple-100 text-purple-700 border-purple-200';
  };

  const getTypeLabel = (type: string) => {
    return type === 'THEORY' ? 'نظري' : 'عملي';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6" dir="rtl">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">إنشاء توزيع جديد</h1>
            <p className="text-gray-600">قم بإنشاء توزيع جديد للطلاب على القاعات</p>
          </div>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <X className="w-4 h-4" />
            إلغاء
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <div className="space-y-6">
              {/* Program Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  البرنامج التدريبي *
                </label>
                <Controller
                  name="programId"
                  control={control}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">اختر البرنامج</option>
                      {mockPrograms.map((program) => (
                        <option key={program.id} value={program.id}>
                          {program.nameAr} - {program.nameEn}
                        </option>
                      ))}
                    </select>
                  )}
                />
                {errors.programId && (
                  <p className="mt-2 text-sm text-red-600">{errors.programId.message}</p>
                )}
              </div>

              {/* Distribution Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  نوع التوزيع *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Controller
                    name="type"
                    control={control}
                    render={({ field }) => (
                      <>
                        <label className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          field.value === 'THEORY' 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}>
                          <input
                            type="radio"
                            value="THEORY"
                            checked={field.value === 'THEORY'}
                            onChange={field.onChange}
                            className="sr-only"
                          />
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${getTypeColor('THEORY')}`}>
                              <BookOpen className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">نظري</p>
                              <p className="text-sm text-gray-600">محاضرات نظرية</p>
                            </div>
                          </div>
                        </label>

                        <label className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          field.value === 'PRACTICAL' 
                            ? 'border-purple-500 bg-purple-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}>
                          <input
                            type="radio"
                            value="PRACTICAL"
                            checked={field.value === 'PRACTICAL'}
                            onChange={field.onChange}
                            className="sr-only"
                          />
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${getTypeColor('PRACTICAL')}`}>
                              <GraduationCap className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">عملي</p>
                              <p className="text-sm text-gray-600">جلسات عملية</p>
                            </div>
                          </div>
                        </label>
                      </>
                    )}
                  />
                </div>
                {errors.type && (
                  <p className="mt-2 text-sm text-red-600">{errors.type.message}</p>
                )}
              </div>

              {/* Number of Rooms */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  عدد المجموعات *
                </label>
                <Controller
                  name="numberOfRooms"
                  control={control}
                  render={({ field }) => (
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => field.onChange(Math.max(1, (field.value || 1) - 1))}
                        className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={field.value || ''}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                        className="w-20 px-3 py-2 border border-gray-200 rounded-lg text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => field.onChange((field.value || 1) + 1)}
                        className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                />
                {errors.numberOfRooms && (
                  <p className="mt-2 text-sm text-red-600">{errors.numberOfRooms.message}</p>
                )}
              </div>

              {/* Room Capacities (Optional) */}
              {numberOfRooms > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-gray-700">
                      سعة المجموعات (اختياري)
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowRoomCapacities(!showRoomCapacities)}
                      className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      {showRoomCapacities ? 'إخفاء' : 'تخصيص السعات'}
                    </button>
                  </div>

                  {showRoomCapacities && (
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {Array.from({ length: numberOfRooms }, (_, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <label className="text-sm text-gray-600 w-16">
                              المجموعة {index + 1}:
                            </label>
                            <input
                              type="number"
                              min="1"
                              value={roomCapacities[index] || ''}
                              onChange={(e) => updateRoomCapacity(index, parseInt(e.target.value) || 0)}
                              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="السعة"
                            />
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                        <Info className="w-4 h-4 text-blue-600" />
                        <p className="text-sm text-blue-700">
                          إذا لم تحدد السعات، سيتم توزيع الطلاب تلقائياً بالتساوي
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Preview */}
              {numberOfRooms > 0 && type && (
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">معاينة التوزيع</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${getTypeColor(type)}`}>
                        {getTypeIcon(type)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{getTypeLabel(type)}</p>
                        <p className="text-sm text-gray-600">نوع التوزيع</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-orange-100 text-orange-700">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{numberOfRooms} مجموعة</p>
                        <p className="text-sm text-gray-600">عدد المجموعات</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={!isValid || isLoading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  جاري الإنشاء...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  إنشاء التوزيع
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDistributionPage;

