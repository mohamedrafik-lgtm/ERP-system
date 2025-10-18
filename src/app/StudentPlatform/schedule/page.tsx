"use client";

import React, { useState } from 'react';
import { useMySchedule } from '@/hooks/useMySchedule';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  BookOpen, 
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  RefreshCw
} from 'lucide-react';

const StudentSchedulePage = () => {
  const { scheduleData, loading, error, refetch } = useMySchedule();
  const [currentWeek, setCurrentWeek] = useState(0);

  const days = [
    { key: 'SUNDAY', name: 'الأحد', nameEn: 'Sunday' },
    { key: 'MONDAY', name: 'الاثنين', nameEn: 'Monday' },
    { key: 'TUESDAY', name: 'الثلاثاء', nameEn: 'Tuesday' },
    { key: 'WEDNESDAY', name: 'الأربعاء', nameEn: 'Wednesday' },
    { key: 'THURSDAY', name: 'الخميس', nameEn: 'Thursday' },
    { key: 'FRIDAY', name: 'الجمعة', nameEn: 'Friday' },
    { key: 'SATURDAY', name: 'السبت', nameEn: 'Saturday' },
  ];

  const getTypeText = (type: 'THEORY' | 'PRACTICAL') => {
    return type === 'THEORY' ? 'نظري' : 'عملي';
  };

  const getTypeColor = (type: 'THEORY' | 'PRACTICAL') => {
    return type === 'THEORY' 
      ? 'bg-blue-100 text-blue-800 border-blue-200' 
      : 'bg-green-100 text-green-800 border-green-200';
  };

  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('ar-EG', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري تحميل الجدول...</p>
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
          <button
            onClick={() => refetch()}
            className="mt-4 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mx-auto"
          >
            <RefreshCw size={16} />
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  if (!scheduleData?.success || !scheduleData?.schedule) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">لا يوجد جدول دراسي متاح</p>
          <p className="text-gray-500 text-sm mt-2">يرجى التواصل مع الإدارة للحصول على الجدول</p>
        </div>
      </div>
    );
  }

  const { classroom, schedule } = scheduleData;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">الجدول الدراسي</h1>
            <p className="text-gray-600">جدول المحاضرات والدروس الأسبوعية</p>
          </div>
          <button
            onClick={() => refetch()}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCw size={20} />
            تحديث الجدول
          </button>
        </div>

        {/* Classroom Info */}
        {classroom && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BookOpen className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{classroom.name}</h3>
                <p className="text-gray-600">الفصل رقم {classroom.classNumber}</p>
                <p className="text-sm text-gray-500">
                  من {new Date(classroom.startDate).toLocaleDateString('ar-EG')} 
                  إلى {new Date(classroom.endDate).toLocaleDateString('ar-EG')}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Schedule Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-700 border-l border-gray-200">
                  الوقت
                </th>
                {days.map((day) => (
                  <th key={day.key} className="px-4 py-3 text-center text-sm font-medium text-gray-700 border-l border-gray-200 min-w-[200px]">
                    <div>
                      <div className="font-semibold">{day.name}</div>
                      <div className="text-xs text-gray-500">{day.nameEn}</div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Time slots from 8 AM to 6 PM */}
              {Array.from({ length: 21 }, (_, i) => {
                const hour = 8 + Math.floor(i / 2);
                const minute = (i % 2) * 30;
                const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                
                return (
                  <tr key={timeString} className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-3 text-center text-sm font-medium text-gray-600 border-l border-gray-200 bg-gray-50">
                      {timeString}
                    </td>
                    {days.map((day) => {
                      const daySchedule = schedule[day.key as keyof typeof schedule] || [];
                      const slot = daySchedule.find(s => 
                        s.startTime <= timeString && s.endTime > timeString
                      );
                      
                      return (
                        <td key={day.key} className="px-2 py-2 border-l border-gray-200 min-h-[60px]">
                          {slot ? (
                            <div className={`p-3 rounded-lg border-2 ${getTypeColor(slot.type)} ${
                              slot.isCancelledThisWeek ? 'opacity-50 bg-red-50 border-red-200' : ''
                            }`}>
                              <div className="flex items-start justify-between mb-2">
                                <span className={`text-xs px-2 py-1 rounded-full border ${getTypeColor(slot.type)}`}>
                                  {getTypeText(slot.type)}
                                </span>
                                {slot.isCancelledThisWeek && (
                                  <AlertCircle className="w-4 h-4 text-red-500" />
                                )}
                              </div>
                              
                              <h4 className="font-semibold text-sm mb-1 line-clamp-2">
                                {slot.content.name}
                              </h4>
                              
                              <p className="text-xs text-gray-600 mb-1">
                                {slot.content.code}
                              </p>
                              
                              <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                                <User size={12} />
                                <span>{slot.content.instructor.name}</span>
                              </div>
                              
                              <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                                <Clock size={12} />
                                <span>{formatTime(slot.startTime)} - {formatTime(slot.endTime)}</span>
                              </div>
                              
                              {slot.location && (
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                  <MapPin size={12} />
                                  <span>{slot.location}</span>
                                </div>
                              )}
                              
                              {slot.distributionRoom && (
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                  <MapPin size={12} />
                                  <span>{slot.distributionRoom.roomName} - {slot.distributionRoom.roomNumber}</span>
                                </div>
                              )}
                              
                              {slot.isCancelledThisWeek && slot.cancellationReason && (
                                <div className="mt-2 p-2 bg-red-100 rounded text-xs text-red-700">
                                  <strong>ملغي:</strong> {slot.cancellationReason}
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="h-full min-h-[60px] flex items-center justify-center">
                              <span className="text-gray-300 text-xs">-</span>
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">مفتاح الجدول</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-100 border border-blue-200 rounded"></div>
            <span className="text-sm text-gray-700">محاضرة نظرية</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-100 border border-green-200 rounded"></div>
            <span className="text-sm text-gray-700">درس عملي</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-100 border border-red-200 rounded"></div>
            <span className="text-sm text-gray-700">ملغي هذا الأسبوع</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-100 border border-gray-200 rounded"></div>
            <span className="text-sm text-gray-700">لا يوجد محاضرة</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSchedulePage;