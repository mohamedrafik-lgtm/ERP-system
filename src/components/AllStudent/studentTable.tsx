"use client";

import { studentActions } from "@/data";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useCallback, useMemo, memo } from "react";
import { 
  Eye, 
  Edit, 
  Trash2, 
  MoreVertical, 
  Phone, 
  Mail, 
  Calendar, 
  GraduationCap,
  User,
  MapPin,
  CreditCard,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react";
import InlineMenu from "../ui/MenuReport";
import { useGetStudentsQuery } from "@/lip/features/student/student";
import { Input } from "../input";
import { RowCardSkeleton } from "../ui/Skeleton";

// دالة مساعدة للتعامل مع روابط الصور
const getImageUrl = (photo: any): string => {
  if (!photo) return '/placeholder-avatar.png';
  
  // التعامل مع كائن File
  if (photo instanceof File || (typeof photo === 'object' && photo.toString() === '[object File]')) {
    return '/placeholder-avatar.png';
  }
  
  // إذا كان الراجع هو مسار (string)
  if (typeof photo === 'string') {
    const url = photo.trim();
    // إذا كان المسار يبدأ بـ /uploads، نستخدمه مباشرة
    if (url.startsWith('/uploads')) {
      return url;
    }
  }
  
  return '/placeholder-avatar.png';
};

// دالة لتحديد حالة المتدرب
const getStudentStatus = (student: any) => {
  // يمكن إضافة منطق أكثر تعقيداً هنا
  return {
    status: 'active',
    label: 'نشط',
    color: 'green',
    icon: CheckCircle
  };
};

// دالة لتنسيق التاريخ
const formatDate = (dateString: string) => {
  if (!dateString) return 'غير محدد';
  return new Date(dateString).toLocaleDateString('ar-EG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const StudentTable = () => {
  const router = useRouter();
  const { data, isError, isLoading, isSuccess } = useGetStudentsQuery();
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);

  if(isLoading) return <RowCardSkeleton/>;

  if(isError) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
          <AlertCircle className="w-12 h-12 text-red-500" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">خطأ في تحميل البيانات</h3>
        <p className="text-gray-600">حدث خطأ أثناء جلب بيانات المتدربين</p>
      </div>
    );
  }

  if(!data || data.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <User className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">لا توجد بيانات</h3>
        <p className="text-gray-600">لم يتم العثور على أي متدربين</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Payment Form */}
      {selectedStudentId && (
        <div className="bg-gradient-to-r from-emerald-50 via-blue-50 to-indigo-50 border border-emerald-200 rounded-2xl p-8 mb-8 shadow-lg">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-900">دفع قسط للمتدرب المحدد</h4>
              <p className="text-gray-600">قم بإدخال قيمة القسط المراد دفعه</p>
            </div>
          </div>
          <form className="flex items-center gap-6">
            <div className="flex-1">
              <label htmlFor="installmentAmount" className="block text-sm font-bold text-gray-700 mb-2">
                قيمة القسط (ج.م)
              </label>
              <Input
                id="installmentAmount"
                type="number"
                placeholder="أدخل قيمة القسط"
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 text-lg"
              />
            </div>
            <div className="flex gap-3">
              <button 
                type="button"
                onClick={() => setSelectedStudentId(null)}
                className="px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-all duration-300 hover:scale-105"
              >
                إلغاء
              </button>
              <button 
                type="submit" 
                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-600 text-white font-bold rounded-xl hover:from-emerald-600 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-emerald-300 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                دفع القسط
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Enhanced Table */}
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
        {/* Table Header */}
        <div className="bg-gradient-to-r from-gray-50 via-blue-50 to-indigo-50 px-8 py-6 border-b border-gray-200/50">
          <div className="grid grid-cols-12 gap-6 items-center text-sm font-bold text-gray-700">
            <div className="col-span-2 text-center">المتدرب</div>
            <div className="col-span-2 text-center">معلومات الاتصال</div>
            <div className="col-span-2 text-center">البرنامج</div>
            <div className="col-span-2 text-center">الحالة</div>
            <div className="col-span-2 text-center">تاريخ التسجيل</div>
            <div className="col-span-2 text-center">الإجراءات</div>
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-200/50">
          {data?.map((student, idx) => {
            const studentStatus = getStudentStatus(student);
            const StatusIcon = studentStatus.icon;
            
            return (
              <div
                key={idx}
                className="px-8 py-6 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 transition-all duration-300 group"
              >
                <div className="grid grid-cols-12 gap-6 items-center">
                  {/* Student Info */}
                  <div className="col-span-2">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        {typeof student.photoUrl === 'string' && student.photoUrl.startsWith('/uploads') ? (
                          <div className="relative w-16 h-16">
                            <img
                              src={`http://localhost:4000${student.photoUrl}`}
                              alt={student.nameAr || "صورة المتدرب"}
                              className="w-16 h-16 rounded-2xl object-cover border-3 border-white shadow-lg"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = '/placeholder-avatar.png';
                              }}
                            />
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full flex items-center justify-center">
                              <StatusIcon className="w-3 h-3 text-white" />
                            </div>
                          </div>
                        ) : (
                          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center border-3 border-white shadow-lg">
                            <User className="w-8 h-8 text-blue-600" />
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">{student.nameAr}</h3>
                        <p className="text-sm text-gray-600">#{student.id}</p>
                        <p className="text-xs text-gray-500">{student.nameEn}</p>
                      </div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="col-span-2">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-700">{student.phone || 'غير محدد'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-700">{student.email || 'غير محدد'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-700">{student.city || 'غير محدد'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Program Info */}
                  <div className="col-span-2">
                    <div className="text-center">
                      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-xl">
                        <GraduationCap className="w-4 h-4 text-purple-600" />
                        <span className="font-semibold text-purple-800">
                          {student.program?.nameAr || 'غير محدد'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {student.programType || 'عادي'}
                      </p>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="col-span-2">
                    <div className="text-center">
                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl ${
                        studentStatus.color === 'green' 
                          ? 'bg-green-100 text-green-800' 
                          : studentStatus.color === 'yellow'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        <StatusIcon className="w-4 h-4" />
                        <span className="font-semibold">{studentStatus.label}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        آخر نشاط: {formatDate(student.updatedAt)}
                      </p>
                    </div>
                  </div>

                  {/* Registration Date */}
                  <div className="col-span-2">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          {formatDate(student.createdAt)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {student.enrollmentType || 'عادي'}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="col-span-2">
                    <div className="flex items-center justify-center gap-2">
                      {/* View Button */}
                      <button
                        onClick={() => router.push(`/AllStudent/${student.id}`)}
                        className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
                        title="عرض التفاصيل"
                      >
                        <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      </button>

                      {/* Edit Button */}
                      <button
                        onClick={() => router.push(`/AllStudent/${student.id}?edit=true`)}
                        className="p-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
                        title="تعديل البيانات"
                      >
                        <Edit className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      </button>

                      {/* More Actions Menu */}
                      <InlineMenu
                        name=""
                        items={studentActions.map((action) => ({
                          name: action,
                          value: action,
                        }))}
                        svg={<MoreVertical className="w-4 h-4" />}
                      />

                      {/* Select Button */}
                      <button
                        onClick={() => {
                          if (selectedStudentId === student.id) {
                            setSelectedStudentId(null);
                          } else if (selectedStudentId === null) {
                            setSelectedStudentId(student.id);
                          } else {
                            alert("يجب إلغاء التحديد الحالي أولاً قبل اختيار طالب آخر.");
                          }
                        }}
                        className={`px-4 py-3 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl ${
                          selectedStudentId === student.id
                            ? "bg-gradient-to-r from-green-500 to-green-600 text-white"
                            : "bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white"
                        }`}
                      >
                        {selectedStudentId === student.id ? "محدد" : "تحديد"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default memo(StudentTable) ;