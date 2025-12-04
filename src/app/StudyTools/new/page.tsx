"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  useCreateStudyMaterialMutation,
  useGetProgramsQuery,
  useGetUsersQuery,
} from '@/lip/features/studyTools/studyToolsApi';
import toast from 'react-hot-toast';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Cookies from 'js-cookie';

export default function NewStudyMaterialPage() {
  const router = useRouter();
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedProgramId, setSelectedProgramId] = useState<number | null>(null);
  
  const { data: programs } = useGetProgramsQuery();
  const { data: users } = useGetUsersQuery();
  const [createMaterial, { isLoading }] = useCreateStudyMaterialMutation();
  
  // جلب الرسوم حسب البرنامج المختار
  const [fees, setFees] = useState<any[]>([]);
  const [loadingFees, setLoadingFees] = useState(false);
  
  const fetchFeesByProgram = async (programId: number) => {
    setLoadingFees(true);
    try {
      const token = Cookies.get('access_token') || Cookies.get('auth_token');
      const response = await fetch(`http://localhost:4000/api/finances/trainee-fees?programId=${programId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setFees(data);
      }
    } catch (error) {
      console.error('Error fetching fees:', error);
    }
    setLoadingFees(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      await createMaterial({
        name: formData.get('name') as string,
        nameEn: formData.get('nameEn') as string || undefined,
        programId: Number(formData.get('programId')),
        quantity: Number(formData.get('quantity')),
        linkedFeeId: formData.get('linkedFeeId') ? Number(formData.get('linkedFeeId')) : null,
        description: formData.get('description') as string || undefined,
        isActive: formData.get('isActive') === 'on',
        responsibleUserIds: selectedUsers.length > 0 ? selectedUsers : undefined,
      }).unwrap();
      
      toast.success('تم إضافة الأداة الدراسية بنجاح');
      router.push('/StudyTools');
    } catch (error: any) {
      toast.error(error?.data?.message || 'حدث خطأ أثناء إضافة الأداة');
    }
  };

  const handleUserToggle = (userId: string) => {
    setSelectedUsers(prev =>
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowRightIcon className="w-5 h-5" />
            رجوع
          </button>
          <h1 className="text-3xl font-bold text-gray-900">إضافة أداة دراسية جديدة</h1>
          <p className="text-gray-600 mt-2">املأ البيانات لإضافة أداة دراسية جديدة</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">المعلومات الأساسية</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  اسم الأداة <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="مثال: كتاب البرمجة"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الاسم بالإنجليزي
                </label>
                <input
                  type="text"
                  name="nameEn"
                  placeholder="Example: Programming Book"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  البرنامج التدريبي <span className="text-red-500">*</span>
                </label>
                <select
                  name="programId"
                  required
                  onChange={(e) => {
                    const programId = Number(e.target.value);
                    setSelectedProgramId(programId);
                    if (programId) {
                      fetchFeesByProgram(programId);
                    } else {
                      setFees([]);
                    }
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">اختر البرنامج</option>
                  {programs?.map((program) => (
                    <option key={program.id} value={program.id}>{program.nameAr}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الكمية <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="quantity"
                  min="0"
                  required
                  placeholder="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">تفاصيل التسليم</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الرسم المرتبط بعملية التسليم
                </label>
                <select
                  name="linkedFeeId"
                  disabled={!selectedProgramId || loadingFees}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">
                    {!selectedProgramId ? 'اختر البرنامج أولاً' : loadingFees ? 'جاري التحميل...' : 'بدون رسوم'}
                  </option>
                  {fees?.map((fee) => (
                    <option key={fee.id} value={fee.id}>{fee.name} ({fee.amount} جنيه)</option>
                  ))}
                </select>
                <p className="mt-1 text-xs text-gray-500">🟢 الأداة يمكن أن تُسلم بدون أي رسوم</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  المسؤولين عن التسليم (اختياري)
                </label>
                <div className="border border-gray-300 rounded-lg p-4 max-h-48 overflow-y-auto space-y-2">
                  {users && users.length > 0 ? (
                    users.map((user) => (
                      <label key={user.id} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
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
                  ) : (
                    <p className="text-sm text-gray-500 text-center py-4">لا يوجد مستخدمين متاحين</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">تفاصيل إضافية</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الوصف</label>
                <textarea
                  name="description"
                  rows={4}
                  placeholder="وصف تفصيلي عن الأداة الدراسية..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                <input
                  type="checkbox"
                  name="isActive"
                  id="isActive"
                  defaultChecked
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="isActive" className="text-sm font-medium text-gray-900 cursor-pointer">
                  🟢 الأداة يمكن تسليمها للمتدربين
                </label>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg font-medium disabled:opacity-50 flex items-center gap-2"
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
  );
}