"use client";

import React, { useState, useMemo, useEffect } from 'react';
import {
  Users,
  Search,
  Filter,
  RefreshCw,
  Eye,
  Download,
  UserX,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  IdCard,
  Building2,
  UserCheck,
  UserX2,
  Loader2
} from "lucide-react";
import { useGetUndistributedTraineesQuery } from '@/lip/features/distribution/undistributedTraineesApi';
import { useGetProgramsQuery } from '@/lip/features/program/program';
import { UndistributedTrainee, UndistributedTraineesFilters } from '@/types/undistributed-trainees';
import { TraineeAvatar } from './components/TraineeAvatar';

const DistributionReportsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [programFilter, setProgramFilter] = useState<number | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedTrainees, setExpandedTrainees] = useState<Set<number>>(new Set());

  const filters: UndistributedTraineesFilters = {
    search: searchTerm || undefined,
    programId: programFilter,
    page: currentPage,
    limit: 10
  };

  const { 
    data: response, 
    isLoading, 
    error, 
    refetch 
  } = useGetUndistributedTraineesQuery(filters);

  // Debug: Log API response
  useEffect(() => {
    if (response) {
      console.log('API Response:', response);
    }
    if (error) {
      console.error('API Error:', error);
    }
  }, [response, error]);

  const { data: programs = [] } = useGetProgramsQuery();

  const trainees = response?.trainees || [];
  const pagination = response?.pagination;

  // Debug: Log trainees data to see photoUrl values
  useEffect(() => {
    if (trainees.length > 0) {
      console.log('Trainees data:', trainees);
      trainees.forEach((trainee, index) => {
        console.log(`Trainee ${index + 1}:`, {
          name: trainee.nameAr,
          photoUrl: trainee.photoUrl,
          hasPhoto: !!trainee.photoUrl
        });
      });
    }
  }, [trainees]);

  const toggleTrainee = (traineeId: number) => {
    setExpandedTrainees(prev => {
      const newSet = new Set(prev);
      if (newSet.has(traineeId)) {
        newSet.delete(traineeId);
      } else {
        newSet.add(traineeId);
      }
      return newSet;
    });
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('ar-SA');
  };

  const getGenderIcon = (gender: string) => {
    return gender === 'MALE' ? (
      <UserCheck className="w-4 h-4 text-blue-600" />
    ) : (
      <UserX2 className="w-4 h-4 text-pink-600" />
    );
  };

  const getGenderLabel = (gender: string) => {
    return gender === 'MALE' ? 'ذكر' : 'أنثى';
  };

  const getEnrollmentTypeLabel = (type: string) => {
    const types: { [key: string]: string } = {
      'FULL_TIME': 'دوام كامل',
      'PART_TIME': 'دوام جزئي',
      'ONLINE': 'أونلاين',
      'HYBRID': 'مختلط'
    };
    return types[type] || type;
  };

  const getMaritalStatusLabel = (status: string) => {
    const statuses: { [key: string]: string } = {
      'SINGLE': 'أعزب',
      'MARRIED': 'متزوج',
      'DIVORCED': 'مطلق',
      'WIDOWED': 'أرمل'
    };
    return statuses[status] || status;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">طلاب غير موزعين</h1>
            <p className="text-gray-600">عرض وإدارة الطلاب الذين لم يتم توزيعهم على القاعات</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => refetch()}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              تحديث
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              تصدير
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">إجمالي الطلاب غير الموزعين</p>
                <p className="text-2xl font-bold text-gray-900">{pagination?.total || 0}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <UserX className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">البرامج المتأثرة</p>
                <p className="text-2xl font-bold text-gray-900">{programs.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">الصفحة الحالية</p>
                <p className="text-2xl font-bold text-gray-900">{pagination?.page || 1}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="البحث بالاسم أو الرقم الوطني..."
                  className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div>
              <select
                className="w-full lg:w-auto px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
                value={programFilter || ''}
                onChange={(e) => setProgramFilter(e.target.value ? Number(e.target.value) : undefined)}
              >
                <option value="">جميع البرامج</option>
                {programs.map((program) => (
                  <option key={program.id} value={program.id}>
                    {program.nameAr}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-6 bg-gray-200 rounded mb-2 w-48"></div>
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                  </div>
                  <div className="h-8 bg-gray-200 rounded w-20"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-red-600 mb-2">فشل في تحميل البيانات</h3>
            <p className="text-red-500 mb-4">تأكد من تشغيل الباك إند على http://localhost:4000</p>
            <button 
              onClick={() => refetch()}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              إعادة المحاولة
            </button>
          </div>
        ) : trainees.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserCheck className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد طلاب غير موزعين</h3>
            <p className="text-gray-600">جميع الطلاب تم توزيعهم بنجاح</p>
          </div>
        ) : (
          <div className="space-y-4">
            {trainees.map((trainee) => (
              <div key={trainee.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Trainee Header */}
                <div 
                  className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleTrainee(trainee.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <TraineeAvatar 
                        photoUrl={trainee.photoUrl}
                        name={trainee.nameAr}
                        size="md"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{trainee.nameAr}</h3>
                        <p className="text-sm text-gray-600">{trainee.nameEn}</p>
                        <p className="text-xs text-gray-500">الرقم الوطني: {trainee.nationalId}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-600">البرنامج</p>
                        <p className="font-medium text-gray-900">{trainee.program.nameAr}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getGenderIcon(trainee.gender)}
                        <span className="text-sm text-gray-600">{getGenderLabel(trainee.gender)}</span>
                      </div>
                      {expandedTrainees.has(trainee.id) ? (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Trainee Details */}
                {expandedTrainees.has(trainee.id) && (
                  <div className="border-t border-gray-100 bg-gray-50 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {/* Personal Info */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-900 mb-3">المعلومات الشخصية</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">تاريخ الميلاد:</span>
                            <span className="text-sm font-medium">{formatDate(trainee.birthDate)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <IdCard className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">نوع التسجيل:</span>
                            <span className="text-sm font-medium">{getEnrollmentTypeLabel(trainee.enrollmentType)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">الحالة الاجتماعية:</span>
                            <span className="text-sm font-medium">{getMaritalStatusLabel(trainee.maritalStatus)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Contact Info */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-900 mb-3">معلومات الاتصال</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">الهاتف:</span>
                            <span className="text-sm font-medium">{trainee.phone}</span>
                          </div>
                          {trainee.email && (
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-600">البريد الإلكتروني:</span>
                              <span className="text-sm font-medium">{trainee.email}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">العنوان:</span>
                            <span className="text-sm font-medium">{trainee.address}</span>
                          </div>
                        </div>
                      </div>

                      {/* Guardian Info */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-900 mb-3">معلومات ولي الأمر</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">الاسم:</span>
                            <span className="text-sm font-medium">{trainee.guardianName}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">الهاتف:</span>
                            <span className="text-sm font-medium">{trainee.guardianPhone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">العلاقة:</span>
                            <span className="text-sm font-medium">{trainee.guardianRelation}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-between bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                عرض {((pagination.page - 1) * 10) + 1} إلى {Math.min(pagination.page * 10, pagination.total)} من {pagination.total}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={!pagination.hasPrev}
                className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                السابق
              </button>
              <span className="px-3 py-2 text-sm text-gray-600">
                صفحة {pagination.page} من {pagination.totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => prev + 1)}
                disabled={!pagination.hasNext}
                className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                التالي
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DistributionReportsPage;