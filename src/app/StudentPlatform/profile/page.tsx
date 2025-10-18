"use client";

import React, { useState } from 'react';
import { useTraineeProfile } from '@/hooks/useTraineeProfile';
import StudentSidebar from '@/components/ui/StudentSidebar';
import { 
  Gender, 
  MaritalStatus, 
  Religion, 
  EducationType, 
  TraineeStatus, 
  Year,
  EnrollmentType,
  ProgramType
} from '@/types/trainee';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  GraduationCap, 
  FileText, 
  Edit3,
  Save,
  X,
  Camera
} from 'lucide-react';

const StudentProfilePage = () => {
  const { profile, loading, error, updateProfile } = useTraineeProfile();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<any>({});

  const handleEdit = () => {
    if (profile?.trainee) {
      setEditData({
        nameAr: profile.trainee.nameAr,
        nameEn: profile.trainee.nameEn,
        phone: profile.trainee.phone,
        email: profile.trainee.email || '',
        address: profile.trainee.address,
        city: profile.trainee.city,
        governorate: profile.trainee.governorate || '',
        whatsapp: profile.trainee.whatsapp || '',
        facebook: profile.trainee.facebook || '',
        landline: profile.trainee.landline || '',
        guardianName: profile.trainee.guardianName,
        guardianPhone: profile.trainee.guardianPhone,
        guardianEmail: profile.trainee.guardianEmail || '',
        guardianJob: profile.trainee.guardianJob || '',
        guardianRelation: profile.trainee.guardianRelation,
        notes: profile.trainee.notes || '',
      });
      setIsEditing(true);
    }
  };

  const handleSave = async () => {
    try {
      await updateProfile({
        trainee: {
          ...profile?.trainee,
          ...editData,
        }
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({});
  };

  const getGenderText = (gender: Gender) => {
    switch (gender) {
      case Gender.MALE: return 'ذكر';
      case Gender.FEMALE: return 'أنثى';
      default: return gender;
    }
  };

  const getMaritalStatusText = (status: MaritalStatus) => {
    switch (status) {
      case MaritalStatus.SINGLE: return 'أعزب';
      case MaritalStatus.MARRIED: return 'متزوج';
      case MaritalStatus.DIVORCED: return 'مطلق';
      case MaritalStatus.WIDOWED: return 'أرمل';
      default: return status;
    }
  };

  const getReligionText = (religion: Religion) => {
    switch (religion) {
      case Religion.ISLAM: return 'الإسلام';
      case Religion.CHRISTIANITY: return 'المسيحية';
      case Religion.JUDAISM: return 'اليهودية';
      default: return religion;
    }
  };

  const getEducationTypeText = (type: EducationType) => {
    switch (type) {
      case EducationType.PREPARATORY: return 'إعدادي';
      case EducationType.INDUSTRIAL_SECONDARY: return 'ثانوي صناعي';
      case EducationType.COMMERCIAL_SECONDARY: return 'ثانوي تجاري';
      case EducationType.AGRICULTURAL_SECONDARY: return 'ثانوي زراعي';
      case EducationType.AZHAR_SECONDARY: return 'ثانوي أزهري';
      case EducationType.GENERAL_SECONDARY: return 'ثانوي عام';
      case EducationType.UNIVERSITY: return 'جامعي';
      case EducationType.INDUSTRIAL_APPRENTICESHIP: return 'تلمذة صناعية';
      default: return type;
    }
  };

  const getTraineeStatusText = (status: TraineeStatus) => {
    switch (status) {
      case TraineeStatus.NEW: return 'جديد';
      case TraineeStatus.CURRENT: return 'حالي';
      case TraineeStatus.GRADUATE: return 'خريج';
      case TraineeStatus.WITHDRAWN: return 'منسحب';
      default: return status;
    }
  };

  const getYearText = (year: Year) => {
    switch (year) {
      case Year.FIRST: return 'الأول';
      case Year.SECOND: return 'الثاني';
      case Year.THIRD: return 'الثالث';
      case Year.FOURTH: return 'الرابع';
      default: return year;
    }
  };

  const getEnrollmentTypeText = (type: EnrollmentType) => {
    switch (type) {
      case EnrollmentType.REGULAR: return 'منتظم';
      case EnrollmentType.DISTANCE: return 'عن بُعد';
      case EnrollmentType.BOTH: return 'مختلط';
      default: return type;
    }
  };

  const getProgramTypeText = (type: ProgramType) => {
    switch (type) {
      case ProgramType.SUMMER: return 'صيفي';
      case ProgramType.WINTER: return 'شتوي';
      case ProgramType.ANNUAL: return 'سنوي';
      default: return type;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <p className="text-red-600 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  if (!profile?.trainee) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <p className="text-gray-600 text-lg">لا توجد بيانات متاحة</p>
        </div>
      </div>
    );
  }

  const trainee = profile.trainee;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex" dir="rtl">
      {/* Student Sidebar */}
      <StudentSidebar 
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">الملف الشخصي</h1>
              <p className="text-gray-600">عرض وتعديل بياناتك الشخصية</p>
            </div>
            {!isEditing && (
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <Edit3 size={20} />
                تعديل البيانات
              </button>
            )}
          </div>

          {/* Profile Photo and Basic Info */}
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="relative">
              {trainee.photoUrl && trainee.photoUrl !== '' ? (
                <img
                  src={trainee.photoUrl}
                  alt="صورة الطالب"
                  className="w-32 h-32 rounded-full object-cover border-4 border-blue-100 shadow-lg"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
              ) : null}
              <div className={`w-32 h-32 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center border-4 border-blue-200 shadow-lg ${trainee.photoUrl && trainee.photoUrl !== '' ? 'hidden' : ''}`}>
                <User size={48} className="text-blue-600" />
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors shadow-lg">
                  <Camera size={16} />
                </button>
              )}
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.nameAr || ''}
                    onChange={(e) => setEditData({...editData, nameAr: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                ) : (
                  <span className="text-gray-800 font-medium">{trainee.nameAr}</span>
                )}
              </h2>
              <div className="text-lg text-gray-600 mb-4">
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.nameEn || ''}
                    onChange={(e) => setEditData({...editData, nameEn: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                ) : (
                  <span className="text-gray-600">{trainee.nameEn}</span>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <FileText className="text-blue-600" size={20} />
                  <span className="text-gray-600">الرقم القومي:</span>
                  <span className="font-semibold">{trainee.nationalId}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="text-blue-600" size={20} />
                  <span className="text-gray-600">تاريخ الميلاد:</span>
                  <span className="font-semibold">
                    {new Date(trainee.birthDate).toLocaleDateString('ar-EG')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <User className="text-blue-600" size={24} />
              </div>
              المعلومات الشخصية
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">الجنس</label>
                <p className="text-gray-800">{getGenderText(trainee.gender)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">الحالة الاجتماعية</label>
                <p className="text-gray-800">{getMaritalStatusText(trainee.maritalStatus)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">الديانة</label>
                <p className="text-gray-800">{getReligionText(trainee.religion)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">الجنسية</label>
                <p className="text-gray-800">{trainee.nationality}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">البلد</label>
                <p className="text-gray-800">{trainee.country}</p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <Phone className="text-green-600" size={24} />
              </div>
              معلومات الاتصال
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">رقم الهاتف</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editData.phone || ''}
                    onChange={(e) => setEditData({...editData, phone: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                ) : (
                  <p className="text-gray-800">{trainee.phone}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">البريد الإلكتروني</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editData.email || ''}
                    onChange={(e) => setEditData({...editData, email: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                ) : (
                  <p className="text-gray-800">{trainee.email || 'غير محدد'}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">واتساب</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editData.whatsapp || ''}
                    onChange={(e) => setEditData({...editData, whatsapp: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                ) : (
                  <p className="text-gray-800">{trainee.whatsapp || 'غير محدد'}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">فيسبوك</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.facebook || ''}
                    onChange={(e) => setEditData({...editData, facebook: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                ) : (
                  <p className="text-gray-800">{trainee.facebook || 'غير محدد'}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">الهاتف الأرضي</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editData.landline || ''}
                    onChange={(e) => setEditData({...editData, landline: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                ) : (
                  <p className="text-gray-800">{trainee.landline || 'غير محدد'}</p>
                )}
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <MapPin className="text-purple-600" size={24} />
              </div>
              معلومات العنوان
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">المحافظة</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.governorate || ''}
                    onChange={(e) => setEditData({...editData, governorate: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                ) : (
                  <p className="text-gray-800">{trainee.governorate || 'غير محدد'}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">المدينة</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.city || ''}
                    onChange={(e) => setEditData({...editData, city: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                ) : (
                  <p className="text-gray-800">{trainee.city}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">العنوان التفصيلي</label>
                {isEditing ? (
                  <textarea
                    value={editData.address || ''}
                    onChange={(e) => setEditData({...editData, address: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    rows={3}
                  />
                ) : (
                  <p className="text-gray-800">{trainee.address}</p>
                )}
              </div>
            </div>
          </div>

          {/* Guardian Information */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <div className="p-2 bg-orange-100 rounded-lg">
                <User className="text-orange-600" size={24} />
              </div>
              معلومات ولي الأمر
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">اسم ولي الأمر</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.guardianName || ''}
                    onChange={(e) => setEditData({...editData, guardianName: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                ) : (
                  <p className="text-gray-800">{trainee.guardianName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">رقم هاتف ولي الأمر</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editData.guardianPhone || ''}
                    onChange={(e) => setEditData({...editData, guardianPhone: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                ) : (
                  <p className="text-gray-800">{trainee.guardianPhone}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">البريد الإلكتروني لولي الأمر</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editData.guardianEmail || ''}
                    onChange={(e) => setEditData({...editData, guardianEmail: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                ) : (
                  <p className="text-gray-800">{trainee.guardianEmail || 'غير محدد'}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">وظيفة ولي الأمر</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.guardianJob || ''}
                    onChange={(e) => setEditData({...editData, guardianJob: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                ) : (
                  <p className="text-gray-800">{trainee.guardianJob || 'غير محدد'}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">صلة القرابة</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.guardianRelation || ''}
                    onChange={(e) => setEditData({...editData, guardianRelation: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                ) : (
                  <p className="text-gray-800">{trainee.guardianRelation}</p>
                )}
              </div>
            </div>
          </div>

          {/* Educational Information */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <GraduationCap className="text-indigo-600" size={24} />
              </div>
              المعلومات التعليمية
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">نوع التعليم</label>
                <p className="text-gray-800">{getEducationTypeText(trainee.educationType)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">اسم المدرسة</label>
                <p className="text-gray-800">{trainee.schoolName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">تاريخ التخرج</label>
                <p className="text-gray-800">
                  {new Date(trainee.graduationDate).toLocaleDateString('ar-EG')}
                </p>
              </div>
              {trainee.totalGrade && (
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">المجموع</label>
                  <p className="text-gray-800">{trainee.totalGrade}</p>
                </div>
              )}
              {trainee.gradePercentage && (
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">النسبة المئوية</label>
                  <p className="text-gray-800">{trainee.gradePercentage}%</p>
                </div>
              )}
            </div>
          </div>

          {/* Program Information */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <div className="p-2 bg-teal-100 rounded-lg">
                <GraduationCap className="text-teal-600" size={24} />
              </div>
              معلومات البرنامج
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">اسم البرنامج</label>
                <p className="text-gray-800">{trainee.program?.nameAr || 'غير محدد'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">نوع التسجيل</label>
                <p className="text-gray-800">{getEnrollmentTypeText(trainee.enrollmentType)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">نوع البرنامج</label>
                <p className="text-gray-800">{getProgramTypeText(trainee.programType)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">السنة الدراسية</label>
                <p className="text-gray-800">{getYearText(trainee.classLevel)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">الحالة</label>
                <p className="text-gray-800">{getTraineeStatusText(trainee.traineeStatus)}</p>
              </div>
              {trainee.academicYear && (
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">السنة الأكاديمية</label>
                  <p className="text-gray-800">{trainee.academicYear}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Notes Section */}
        {trainee.notes && (
          <div className="bg-white rounded-xl shadow-lg p-6 mt-6 border border-gray-100 hover:shadow-xl transition-shadow duration-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <FileText className="text-yellow-600" size={24} />
              </div>
              ملاحظات
            </h3>
            {isEditing ? (
              <textarea
                value={editData.notes || ''}
                onChange={(e) => setEditData({...editData, notes: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                rows={4}
                placeholder="أضف ملاحظات..."
              />
            ) : (
              <div className="text-gray-800 bg-gray-50 p-4 rounded-lg">{trainee.notes}</div>
            )}
          </div>
        )}

        {/* Edit Actions */}
        {isEditing && (
          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <X size={20} />
              إلغاء
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <Save size={20} />
              حفظ التغييرات
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentProfilePage;