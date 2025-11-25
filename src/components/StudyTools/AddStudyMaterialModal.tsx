"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { CreateStudyMaterialRequest } from '@/types/studyTools';
import { useCreateStudyMaterialMutation } from '@/lip/features/studyTools/studyToolsApi';
import toast from 'react-hot-toast';

// Validation Schema
const schema = yup.object({
  name: yup.string().required('اسم الأداة مطلوب'),
  nameEn: yup.string(),
  programId: yup.number().required('البرنامج التدريبي مطلوب').positive('يجب اختيار برنامج'),
  quantity: yup.number().required('الكمية مطلوبة').min(0, 'الكمية يجب أن تكون 0 أو أكثر'),
  description: yup.string(),
  linkedFeeId: yup.number().nullable(),
  isActive: yup.boolean(),
  responsibleUserIds: yup.array().of(yup.string()),
}).required();

interface AddStudyMaterialModalProps {
  isOpen: boolean;
  onClose: () => void;
  programs?: Array<{ id: number; nameAr: string }>;
  fees?: Array<{ id: number; name: string; amount: number }>;
  users?: Array<{ id: string; name: string; email: string }>;
}

export default function AddStudyMaterialModal({
  isOpen,
  onClose,
  programs = [],
  fees = [],
  users = [],
}: AddStudyMaterialModalProps) {
  const [createMaterial, { isLoading }] = useCreateStudyMaterialMutation();
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateStudyMaterialRequest>({
    resolver: yupResolver(schema),
    defaultValues: {
      isActive: true,
      quantity: 0,
    },
  });

  const onSubmit = async (data: CreateStudyMaterialRequest) => {
    try {
      await createMaterial({
        ...data,
        responsibleUserIds: selectedUsers.length > 0 ? selectedUsers : undefined,
      }).unwrap();
      
      toast.success('تم إضافة الأداة الدراسية بنجاح');
      reset();
      setSelectedUsers([]);
      onClose();
    } catch (error: any) {
      toast.error(error?.data?.message || 'حدث خطأ أثناء إضافة الأداة');
    }
  };

  const handleUserToggle = (userId: string) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" dir="rtl">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl transform transition-all">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">إضافة أداة دراسية جديدة</h2>
              <p className="text-sm text-gray-500 mt-1">املأ البيانات لإضافة أداة دراسية جديدة</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <XMarkIcon className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            {/* المعلومات الأساسية */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">المعلومات الأساسية</h3>
              
              <div className="space-y-4">
                {/* اسم الأداة */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    اسم الأداة <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register('name')}
                    placeholder="مثال: كتاب البرمجة"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                {/* الاسم بالإنجليزي */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الاسم بالإنجليزي
                  </label>
                  <input
                    type="text"
                    {...register('nameEn')}
                    placeholder="Example: Programming Book"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* البرنامج التدريبي */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    البرنامج التدريبي <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register('programId', { valueAsNumber: true })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">اختر البرنامج</option>
                    {programs.map((program) => (
                      <option key={program.id} value={program.id}>
                        {program.nameAr}
                      </option>
                    ))}
                  </select>
                  {errors.programId && (
                    <p className="mt-1 text-sm text-red-600">{errors.programId.message}</p>
                  )}
                </div>

                {/* الكمية */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الكمية <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    {...register('quantity', { valueAsNumber: true })}
                    min="0"
                    placeholder="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  {errors.quantity && (
                    <p className="mt-1 text-sm text-red-600">{errors.quantity.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* تفاصيل التسليم */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">تفاصيل التسليم</h3>
              
              <div className="space-y-4">
                {/* الرسم المرتبط */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الرسم المرتبط بعملية التسليم
                  </label>
                  <select
                    {...register('linkedFeeId', { 
                      setValueAs: (v) => v === '' ? null : Number(v) 
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">بدون رسوم</option>
                    {fees.map((fee) => (
                      <option key={fee.id} value={fee.id}>
                        {fee.name} ({fee.amount} جنيه)
                      </option>
                    ))}
                  </select>
                  <p className="mt-1 text-xs text-gray-500">
                    🟢 الأداة يمكن أن تُسلم بدون أي رسوم
                  </p>
                </div>

                {/* المسؤولين عن التسليم */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    المسؤولين عن التسليم (اختياري)
                  </label>
                  <div className="border border-gray-300 rounded-lg p-4 max-h-48 overflow-y-auto space-y-2">
                    {users.length === 0 ? (
                      <p className="text-sm text-gray-500 text-center py-4">
                        لا يوجد مستخدمين متاحين
                      </p>
                    ) : (
                      users.map((user) => (
                        <label
                          key={user.id}
                          className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={selectedUsers.includes(user.id)}
                            onChange={() => handleUserToggle(user.id)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{user.name}</p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                          </div>
                        </label>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* تفاصيل إضافية */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">تفاصيل إضافية</h3>
              
              <div className="space-y-4">
                {/* الوصف */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الوصف
                  </label>
                  <textarea
                    {...register('description')}
                    rows={4}
                    placeholder="وصف تفصيلي عن الأداة الدراسية..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  />
                </div>

                {/* حالة النشاط */}
                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                  <input
                    type="checkbox"
                    {...register('isActive')}
                    id="isActive"
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="isActive" className="text-sm font-medium text-gray-900 cursor-pointer">
                    🟢 الأداة يمكن تسليمها للمتدربين
                  </label>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                إلغاء
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    جاري الإضافة...
                  </>
                ) : (
                  'إضافة الأداة'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}