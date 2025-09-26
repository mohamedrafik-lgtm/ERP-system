"use client";
import { useGetTraineesStatsQuery, useGetTraineesQuery, useGetTraineeDocumentsQuery } from "@/lip/features/trainees/traineesApi";
import { RefreshCw, Users, UserCheck, UserPlus, GraduationCap, TrendingUp, FileText, CheckCircle, AlertCircle, Clock, Plus } from "lucide-react";
import { useState } from "react";
import DocumentUploadDialog from "@/components/TraineePayments/DocumentUploadDialog";

export default function TraineesArchivePage() {
  const { data, isLoading, error, refetch } = useGetTraineesStatsQuery();
  const { data: trainees = [] } = useGetTraineesQuery();
  const [selectedTraineeId, setSelectedTraineeId] = useState<number | null>(null);
  const { data: docs, refetch: refetchDocs } = useGetTraineeDocumentsQuery(selectedTraineeId as number, { skip: !selectedTraineeId });
  
  // Upload dialog state
  const [uploadDialog, setUploadDialog] = useState<{
    isOpen: boolean;
    documentType: 'PERSONAL_PHOTO' | 'ID_CARD_FRONT' | 'ID_CARD_BACK' | 'QUALIFICATION_FRONT' | 'QUALIFICATION_BACK' | 'EXPERIENCE_CERT' | 'MINISTRY_CERT' | 'PROFESSION_CARD' | 'SKILL_CERT';
  }>({
    isOpen: false,
    documentType: 'PERSONAL_PHOTO'
  });

  // Handle upload dialog
  const openUploadDialog = (documentType: typeof uploadDialog.documentType) => {
    setUploadDialog({ isOpen: true, documentType });
  };

  const closeUploadDialog = () => {
    setUploadDialog({ isOpen: false, documentType: 'PERSONAL_PHOTO' });
  };

  const handleUploadSuccess = () => {
    refetchDocs(); // Refresh documents after successful upload
  };

  // Get selected trainee name
  const selectedTrainee = trainees.find(t => t.id === selectedTraineeId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">أرشيف المتدربين</h1>
                <p className="text-gray-600 mt-1">إدارة وتتبع جميع المتدربين ومستنداتهم</p>
              </div>
            </div>
            <button 
              onClick={() => refetch()} 
              className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-xl border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <RefreshCw className="w-4 h-4" />
              تحديث
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-40 bg-white rounded-2xl shadow-sm border border-gray-200 animate-pulse" />
            ))}
          </div>
        )}

        {error && (
          <div className="p-6 bg-red-50 border border-red-200 rounded-2xl text-red-700 mb-8">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5" />
              <span className="font-medium">حدث خطأ أثناء جلب الإحصائيات</span>
            </div>
          </div>
        )}

        {data && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs text-gray-500 font-medium">إجمالي</span>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{data.totalTrainees}</p>
              <p className="text-sm text-gray-600">إجمالي المتدربين</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl">
                  <UserCheck className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs text-gray-500 font-medium">نشط</span>
              </div>
              <p className="text-3xl font-bold text-emerald-600 mb-1">{data.activeTrainees}</p>
              <p className="text-sm text-gray-600">النشطون</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl">
                  <UserPlus className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs text-gray-500 font-medium">جديد</span>
              </div>
              <p className="text-3xl font-bold text-amber-600 mb-1">{data.newTrainees}</p>
              <p className="text-sm text-gray-600">الجدد هذا الشهر</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs text-gray-500 font-medium">متخرج</span>
              </div>
              <p className="text-3xl font-bold text-purple-600 mb-1">{data.graduates}</p>
              <p className="text-sm text-gray-600">المتخرجون</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs text-gray-500 font-medium">نسبة</span>
              </div>
              <p className="text-3xl font-bold text-indigo-600 mb-1">{data.graduationRate}%</p>
              <p className="text-sm text-gray-600">نسبة التخرج</p>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Trainees List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">قائمة المتدربين</h2>
                </div>
                <p className="text-sm text-gray-600 mt-1">{trainees.length} متدرب</p>
              </div>
              <div className="p-4">
                <div className="space-y-3 max-h-[500px] overflow-auto">
                  {trainees.map((t: any) => (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTraineeId(t.id)}
                      className={`w-full text-right p-4 rounded-xl border transition-all duration-200 ${
                        selectedTraineeId === t.id 
                          ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-sm' 
                          : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          selectedTraineeId === t.id 
                            ? 'bg-gradient-to-r from-blue-500 to-indigo-500' 
                            : 'bg-gradient-to-r from-gray-200 to-gray-300'
                        }`}>
                          <span className="text-white font-semibold text-sm">
                            {t.nameAr?.charAt(0) || 'م'}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{t.nameAr}</p>
                          <p className="text-xs text-gray-500">ID: {t.id}</p>
                        </div>
                        {selectedTraineeId === t.id && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Documents Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <FileText className="w-5 h-5 text-indigo-600" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900">مستندات المتدرب</h2>
                  </div>
                  {selectedTraineeId && (
                    <button
                      onClick={() => openUploadDialog('PERSONAL_PHOTO')}
                      className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      <Plus className="w-4 h-4" />
                      إضافة وثيقة
                    </button>
                  )}
                </div>
              </div>
              <div className="p-6">
                {!selectedTraineeId && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-lg">اختر متدرباً لعرض مستنداته</p>
                    <p className="text-gray-400 text-sm mt-1">ستظهر هنا جميع المستندات المطلوبة والاختيارية</p>
                  </div>
                )}
                
                {selectedTraineeId && !docs && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Clock className="w-8 h-8 text-blue-500 animate-spin" />
                    </div>
                    <p className="text-gray-500 text-lg">جاري التحميل...</p>
                  </div>
                )}
                
                {docs && (
                  <div className="space-y-6">
                    {/* Progress Summary */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">نسبة الإكمال</h3>
                          <p className="text-sm text-gray-600">تقدم إكمال المستندات</p>
                        </div>
                        <div className="text-right">
                          <p className="text-3xl font-bold text-blue-600">{docs.stats.completionPercentage}%</p>
                          <p className="text-sm text-gray-600">{docs.stats.verifiedCount} موثق</p>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${docs.stats.completionPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    {/* Documents Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {docs.documents.map((d) => (
                        <div key={`${d.type}`} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all duration-200">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${
                                d.isUploaded && d.isVerified 
                                  ? 'bg-emerald-100' 
                                  : d.isUploaded 
                                    ? 'bg-amber-100' 
                                    : 'bg-gray-100'
                              }`}>
                                {d.isUploaded && d.isVerified ? (
                                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                                ) : d.isUploaded ? (
                                  <Clock className="w-5 h-5 text-amber-600" />
                                ) : (
                                  <FileText className="w-5 h-5 text-gray-400" />
                                )}
                              </div>
                              <div>
                                <p className="font-semibold text-gray-900">{d.nameAr}</p>
                                <p className="text-xs text-gray-500">نوع المستند</p>
                              </div>
                            </div>
                            <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                              d.required 
                                ? 'bg-red-100 text-red-700 border border-red-200' 
                                : 'bg-gray-100 text-gray-600 border border-gray-200'
                            }`}>
                              {d.required ? 'مطلوب' : 'اختياري'}
                            </span>
                          </div>
                          
                          <div className="space-y-3">
                            {d.isUploaded ? (
                              <>
                                <div className="flex items-center gap-2 text-sm">
                                  <span className="text-gray-600">الملف:</span>
                                  <span className="font-medium text-gray-900">{d.document?.fileName}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <span className="text-gray-600">الحالة:</span>
                                  <span className={`font-medium ${
                                    d.isVerified ? 'text-emerald-600' : 'text-amber-600'
                                  }`}>
                                    {d.isVerified ? 'موثق' : 'في انتظار التوثيق'}
                                  </span>
                                </div>
                                <button
                                  onClick={() => openUploadDialog(d.type)}
                                  className="w-full mt-3 px-3 py-2 text-sm bg-blue-50 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                                >
                                  تحديث الوثيقة
                                </button>
                              </>
                            ) : (
                              <>
                                <div className="flex items-center gap-2 text-sm">
                                  <AlertCircle className="w-4 h-4 text-orange-500" />
                                  <span className="text-orange-600 font-medium">لم يتم رفع المستند</span>
                                </div>
                                <button
                                  onClick={() => openUploadDialog(d.type)}
                                  className="w-full mt-3 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                                >
                                  <Plus className="w-4 h-4" />
                                  رفع الوثيقة
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Document Upload Dialog */}
      {selectedTraineeId && selectedTrainee && (
        <DocumentUploadDialog
          isOpen={uploadDialog.isOpen}
          onClose={closeUploadDialog}
          traineeId={selectedTraineeId}
          traineeName={selectedTrainee.nameAr}
          documentType={uploadDialog.documentType}
          onSuccess={handleUploadSuccess}
        />
      )}
    </div>
  );
}


