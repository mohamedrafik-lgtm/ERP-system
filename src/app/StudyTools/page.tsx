"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  useGetStudyMaterialsQuery,
  useGetStudyMaterialsStatsQuery,
  useDeleteStudyMaterialMutation,
  useUpdateStudyMaterialMutation,
  useGetProgramsQuery,
  useGetFeesQuery,
} from '@/lip/features/studyTools/studyToolsApi';
import { StudyMaterialsFilters } from '@/types/studyTools';
import toast from 'react-hot-toast';
import {
  PlusIcon,
  MagnifyingGlassIcon,
  ArrowPathIcon,
  PencilIcon,
  TrashIcon,
  CubeIcon,
  CheckCircleIcon,
  XCircleIcon,
  UserGroupIcon,
  AcademicCapIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

export default function StudyToolsPage() {
  const router = useRouter();
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; id: string; name: string }>({
    isOpen: false,
    id: '',
    name: '',
  });
  const [editModal, setEditModal] = useState<{ isOpen: boolean; material: any | null }>({
    isOpen: false,
    material: null,
  });
  const [filters, setFilters] = useState<StudyMaterialsFilters>({
    search: '',
    isActive: undefined,
    page: 1,
    limit: 10,
  });

  const { data: materialsData, isLoading, error, refetch } = useGetStudyMaterialsQuery(filters);
  const { data: stats } = useGetStudyMaterialsStatsQuery();
  const { data: programs } = useGetProgramsQuery();
  const { data: fees } = useGetFeesQuery();
  const [deleteMaterial] = useDeleteStudyMaterialMutation();
  const [updateMaterial] = useUpdateStudyMaterialMutation();

  const materials = materialsData?.data || [];
  const meta = materialsData?.meta;

  const handleDeleteClick = (id: string, name: string) => {
    setDeleteModal({ isOpen: true, id, name });
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteMaterial(deleteModal.id).unwrap();
      toast.success('تم حذف الأداة بنجاح');
      setDeleteModal({ isOpen: false, id: '', name: '' });
    } catch (error) {
      toast.error('حدث خطأ أثناء حذف الأداة');
    }
  };

  const handleEditClick = (material: any) => {
    setEditModal({ isOpen: true, material });
  };

  const handleEditSubmit = async (data: any) => {
    try {
      await updateMaterial({ id: editModal.material.id, ...data }).unwrap();
      toast.success('تم تعديل الأداة بنجاح');
      setEditModal({ isOpen: false, material: null });
    } catch (error) {
      toast.error('حدث خطأ أثناء تعديل الأداة');
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      await updateMaterial({ id, isActive: !currentStatus }).unwrap();
      toast.success(currentStatus ? 'تم إلغاء التفعيل' : 'تم التفعيل');
    } catch (error) {
      toast.error('حدث خطأ أثناء تحديث الحالة');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">جاري تحميل الأدوات الدراسية...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">خطأ في تحميل البيانات</h2>
          <p className="text-gray-600 mb-6">حدث خطأ أثناء جلب بيانات الأدوات الدراسية</p>
          <button
            onClick={() => refetch()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">الأدوات الدراسية</h1>
              <p className="text-gray-600">إدارة الأدوات والمستلزمات الدراسية للبرامج التدريبية</p>
            </div>
            <button
              onClick={() => {
                console.log('Button clicked! Navigating to /StudyTools/new');
                router.push('/StudyTools/new');
              }}
              className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
            >
              <PlusIcon className="w-5 h-5" />
              إضافة أداة جديدة
            </button>
          </div>
        </motion.div>

        {stats && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl shadow-lg p-6 border border-orange-200">
              <div className="p-3 bg-white rounded-xl shadow-sm w-fit mb-4">
                <CubeIcon className="w-6 h-6 text-orange-600" />
              </div>
              <p className="text-sm text-orange-700 font-medium mb-1">إجمالي الأدوات</p>
              <p className="text-3xl font-bold text-orange-900">{stats.totalMaterials}</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl shadow-lg p-6 border border-purple-200">
              <div className="p-3 bg-white rounded-xl shadow-sm w-fit mb-4">
                <UserGroupIcon className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-sm text-purple-700 font-medium mb-1">عدد التسليمات</p>
              <p className="text-3xl font-bold text-purple-900">{stats.totalDeliveries}</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-lg p-6 border border-green-200">
              <div className="p-3 bg-white rounded-xl shadow-sm w-fit mb-4">
                <CheckCircleIcon className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-sm text-green-700 font-medium mb-1">الكمية المتاحة</p>
              <p className="text-3xl font-bold text-green-900">{stats.totalQuantity}</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-lg p-6 border border-blue-200">
              <div className="p-3 bg-white rounded-xl shadow-sm w-fit mb-4">
                <AcademicCapIcon className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-sm text-blue-700 font-medium mb-1">عدد البرامج</p>
              <p className="text-3xl font-bold text-blue-900">{stats.programsCount}</p>
            </div>
          </motion.div>
        )}

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="ابحث عن أداة دراسية..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value, page: 1 })}
                className="w-full pr-10 pl-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <select
              value={filters.isActive === undefined ? '' : filters.isActive.toString()}
              onChange={(e) => setFilters({ ...filters, isActive: e.target.value === '' ? undefined : e.target.value === 'true', page: 1 })}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-w-[150px]"
            >
              <option value="">جميع الحالات</option>
              <option value="true">نشط</option>
              <option value="false">غير نشط</option>
            </select>
            <button onClick={() => refetch()} className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-200 transition-colors font-medium">
              <ArrowPathIcon className="w-5 h-5" />
              تحديث
            </button>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {materials.length === 0 ? (
            <div className="text-center py-16">
              <CubeIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">لا توجد أدوات</h3>
              <p className="text-gray-500 mb-6">لم يتم العثور على أي أدوات دراسية</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">اسم الأداة الدراسية</th>
                    <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">البرنامج التدريبي</th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">الكمية</th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">عدد التسليمات</th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">الحالة</th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {materials.map((material) => (
                    <tr key={material.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{material.name}</div>
                        {material.description && <div className="text-sm text-gray-500 mt-1">{material.description}</div>}
                        {material.linkedFee && <div className="text-xs text-blue-600 mt-1">مرتبط برسم: {material.linkedFee.name} ({material.linkedFee.amount} جنيه)</div>}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <AcademicCapIcon className="w-4 h-4 text-blue-600" />
                          </div>
                          <span className="text-gray-900 font-medium">{material.program.nameAr}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">{material.quantity}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-gray-900 font-medium">{material._count.deliveries}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {material.isActive ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                            <CheckCircleIcon className="w-4 h-4" />
                            نشط
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                            <XCircleIcon className="w-4 h-4" />
                            غير نشط
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleToggleActive(material.id, material.isActive)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${material.isActive ? 'bg-red-100 text-red-700 hover:bg-red-200' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}
                          >
                            {material.isActive ? 'إلغاء التفعيل' : 'تفعيل'}
                          </button>
                          <button onClick={() => handleEditClick(material)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="تعديل">
                            <PencilIcon className="w-5 h-5" />
                          </button>
                          <button onClick={() => handleDeleteClick(material.id, material.name)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="حذف">
                            <TrashIcon className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {meta && meta.totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-gray-50">
              <div className="text-sm text-gray-600">
                عرض {((meta.page - 1) * meta.limit) + 1} إلى {Math.min(meta.page * meta.limit, meta.total)} من {meta.total} أداة
              </div>
              <div className="flex gap-2">
                <button onClick={() => setFilters({ ...filters, page: (filters.page || 1) - 1 })} disabled={!meta.hasPrev} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium">
                  السابق
                </button>
                <span className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium">{meta.page}</span>
                <button onClick={() => setFilters({ ...filters, page: (filters.page || 1) + 1 })} disabled={!meta.hasNext} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium">
                  التالي
                </button>
              </div>
            </div>
          )}
        </motion.div>

        {deleteModal.isOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto" dir="rtl">
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDeleteModal({ isOpen: false, id: '', name: '' })} />
            <div className="flex min-h-full items-center justify-center p-4">
              <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-red-100 rounded-xl">
                      <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">تأكيد الحذف</h2>
                      <p className="text-sm text-gray-500">هذا الإجراء لا يمكن التراجع عنه</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
                    <p className="text-gray-700 text-center">هل أنت متأكد من حذف الأداة الدراسية</p>
                    <p className="text-lg font-bold text-red-600 text-center mt-2">"{deleteModal.name}"</p>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-yellow-800">
                        <p className="font-semibold mb-1">تحذير:</p>
                        <ul className="list-disc list-inside space-y-1">
                          <li>سيتم حذف جميع البيانات المرتبطة</li>
                          <li>لن تتمكن من استرجاع البيانات</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
                  <div className="flex items-center justify-end gap-3">
                    <button onClick={() => setDeleteModal({ isOpen: false, id: '', name: '' })} className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-white transition-colors font-medium">
                      إلغاء
                    </button>
                    <button onClick={handleConfirmDelete} className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all shadow-lg font-medium flex items-center gap-2">
                      <ExclamationTriangleIcon className="w-5 h-5" />
                      تأكيد الحذف
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {editModal.isOpen && editModal.material && (
          <div className="fixed inset-0 z-50 overflow-y-auto" dir="rtl">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setEditModal({ isOpen: false, material: null })} />
            <div className="flex min-h-full items-center justify-center p-4">
              <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900">تعديل الأداة الدراسية</h2>
                  <p className="text-sm text-gray-500 mt-1">تعديل بيانات "{editModal.material.name}"</p>
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    handleEditSubmit({
                      name: formData.get('name'),
                      nameEn: formData.get('nameEn') || undefined,
                      description: formData.get('description') || undefined,
                      quantity: Number(formData.get('quantity')),
                      programId: Number(formData.get('programId')),
                      linkedFeeId: formData.get('linkedFeeId') ? Number(formData.get('linkedFeeId')) : null,
                      isActive: formData.get('isActive') === 'on',
                    });
                  }}
                  className="p-6 space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">اسم الأداة <span className="text-red-500">*</span></label>
                      <input type="text" name="name" defaultValue={editModal.material.name} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">الاسم بالإنجليزي</label>
                      <input type="text" name="nameEn" defaultValue={editModal.material.nameEn || ''} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">البرنامج التدريبي <span className="text-red-500">*</span></label>
                      <select name="programId" defaultValue={editModal.material.programId} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        {programs?.map((program) => (
                          <option key={program.id} value={program.id}>{program.nameAr}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">الكمية <span className="text-red-500">*</span></label>
                      <input type="number" name="quantity" defaultValue={editModal.material.quantity} min="0" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">الرسم المرتبط</label>
                      <select name="linkedFeeId" defaultValue={editModal.material.linkedFeeId || ''} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        <option value="">بدون رسوم</option>
                        {fees?.map((fee) => (
                          <option key={fee.id} value={fee.id}>{fee.name} ({fee.amount} جنيه)</option>
                        ))}
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">الوصف</label>
                      <textarea name="description" defaultValue={editModal.material.description || ''} rows={3} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg cursor-pointer">
                        <input type="checkbox" name="isActive" defaultChecked={editModal.material.isActive} className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                        <span className="text-sm font-medium text-gray-900">🟢 الأداة يمكن تسليمها للمتدربين</span>
                      </label>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
                    <button type="button" onClick={() => setEditModal({ isOpen: false, material: null })} className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium">
                      إلغاء
                    </button>
                    <button type="submit" className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg font-medium flex items-center gap-2">
                      <PencilIcon className="w-5 h-5" />
                      حفظ التعديلات
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}