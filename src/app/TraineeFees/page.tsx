'use client';
import FeesDialog from "@/components/TraineeFees/Modal";
import TraineeFeesTable from "@/components/TraineeFees/TraineeFeesTable";
import FilterButton from "@/components/ui/filterButton";
import Paginator from "@/components/ui/paginator";
import { useGetFeesQuery } from "@/lip/features/Fees/Fees";
import { useGetFinanceQuery } from "@/lip/features/Lockers/safe";
import { useGetProgramsQuery } from "@/lip/features/program/program";
import { useGetTraineeFeesQuery } from "@/lip/features/traineeFees/traineeFeesApi";
import { useState, useCallback, useMemo, memo } from "react";

const TraineeFees = () =>{
    const [isOpen, setIsOpen] = useState(false);
    const {data} = useGetProgramsQuery ();
    const {data:res} = useGetFinanceQuery();
    const {data: response} = useGetFeesQuery();
    
    // استخدام API الجديد لرسوم المتدربين
    const { 
        data: traineeFeesData, 
        isLoading: isTraineeFeesLoading, 
        error: traineeFeesError,
        refetch: refetchTraineeFees
    } = useGetTraineeFeesQuery();

    const handleOpenDialog = useCallback(() => {
        setIsOpen(true);
    }, []);

    const handleCloseDialog = useCallback(() => {
        setIsOpen(false);
    }, []);

    // حساب الإحصائيات - استخدام البيانات الجديدة
    const statistics = useMemo(() => {
        const dataToUse = traineeFeesData || response || [];
        
        if (!dataToUse || dataToUse.length === 0) {
            return {
                totalAmount: 0,
                paidAmount: 0,
                unpaidAmount: 0,
                totalCount: 0,
                paidCount: 0,
                unpaidCount: 0,
                currency: 'ج.م'
            };
        }

        const totalAmount = dataToUse.reduce((sum, fee) => sum + fee.amount, 0);
        const paidFees = dataToUse.filter(fee => fee.isApplied);
        const unpaidFees = dataToUse.filter(fee => !fee.isApplied);
        
        const paidAmount = paidFees.reduce((sum, fee) => sum + fee.amount, 0);
        const unpaidAmount = unpaidFees.reduce((sum, fee) => sum + fee.amount, 0);
        
        return {
            totalAmount,
            paidAmount,
            unpaidAmount,
            totalCount: dataToUse.length,
            paidCount: paidFees.length,
            unpaidCount: unpaidFees.length,
            currency: dataToUse[0]?.safe?.currency || 'ج.م'
        };
    }, [traineeFeesData, response]);
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-x-hidden" dir="rtl" style={{ maxWidth: '100vw' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" style={{ maxWidth: '100%', overflow: 'hidden' }}>
                {/* Modern Header with Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 mb-1">
                                    إدارة الرسوم
                                </h1>
                                <p className="text-sm text-gray-600">
                                    إدارة وتتبع رسوم المتدربين بسهولة
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setIsOpen(true)}
                                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                إضافة رسم جديد
                            </button>
                        </div>
                    </div>
                </div>

                {/* Search and Filter Section */}
                <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5 mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <input 
                                    type="text" 
                                    placeholder="ابحث عن رسم، برنامج، أو متدرب..." 
                                    className="w-full pr-12 pl-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-800 placeholder-gray-500"
                                />
                                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <FilterButton
                            className="bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 px-5 py-3 rounded-xl font-medium transition-all shadow-sm hover:shadow-md flex items-center gap-2 whitespace-nowrap"
                            label="فلتر"
                            paramKey="status"
                            options={[
                                "الكل",
                                "مفعل",
                                "غير مدفوع"
                            ]}
                        />
                    </div>
                </div>

                {/* Stats Cards */}
                {((traineeFeesData || response)?.length ?? 0) > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
                        {/* إجمالي الرسوم */}
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-md border border-blue-200 p-5 hover:shadow-lg transition-all">
                            <div className="flex items-start justify-between mb-3">
                                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-md">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <span className="text-xs font-medium text-blue-700 bg-blue-200 px-2 py-1 rounded-full">
                                    رسم
                                </span>
                            </div>
                            <p className="text-sm font-medium text-blue-700 mb-1">إجمالي الرسوم</p>
                            <p className="text-3xl font-black text-blue-900">{(traineeFeesData || response)?.length || 0}</p>
                        </div>
                        
                        {/* إجمالي المبلغ */}
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-md border border-purple-200 p-5 hover:shadow-lg transition-all">
                            <div className="flex items-start justify-between mb-3">
                                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center shadow-md">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                    </svg>
                                </div>
                                <span className="text-xs font-medium text-purple-700 bg-purple-200 px-2 py-1 rounded-full">
                                    {(traineeFeesData || response)?.[0]?.safe?.currency || 'ر.س'}
                                </span>
                            </div>
                            <p className="text-sm font-medium text-purple-700 mb-1">إجمالي المبلغ</p>
                            <p className="text-3xl font-black text-purple-900">
                                {(traineeFeesData || response)?.reduce((sum, fee) => sum + fee.amount, 0).toLocaleString() || 0}
                            </p>
                        </div>
                        
                        {/* مدفوعة */}
                        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-md border border-green-200 p-5 hover:shadow-lg transition-all">
                            <div className="flex items-start justify-between mb-3">
                                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center shadow-md">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <span className="text-xs font-medium text-green-700 bg-green-200 px-2 py-1 rounded-full">
                                    مدفوع
                                </span>
                            </div>
                            <p className="text-sm font-medium text-green-700 mb-1">رسوم مدفوعة</p>
                            <p className="text-3xl font-black text-green-900">
                                {(traineeFeesData || response)?.filter(fee => fee.isApplied).length || 0}
                            </p>
                            <p className="text-xs text-green-600 font-medium mt-2">
                                {(traineeFeesData || response)?.filter(fee => fee.isApplied).reduce((sum, fee) => sum + fee.amount, 0).toLocaleString() || 0} {(traineeFeesData || response)?.[0]?.safe?.currency || 'ر.س'}
                            </p>
                        </div>
                        
                        {/* غير مدفوعة */}
                        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl shadow-md border border-red-200 p-5 hover:shadow-lg transition-all">
                            <div className="flex items-start justify-between mb-3">
                                <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center shadow-md">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <span className="text-xs font-medium text-red-700 bg-red-200 px-2 py-1 rounded-full">
                                    معلق
                                </span>
                            </div>
                            <p className="text-sm font-medium text-red-700 mb-1">غير مدفوعة</p>
                            <p className="text-3xl font-black text-red-900">
                                {(traineeFeesData || response)?.filter(fee => !fee.isApplied).length || 0}
                            </p>
                            <p className="text-xs text-red-600 font-medium mt-2">
                                {(traineeFeesData || response)?.filter(fee => !fee.isApplied).reduce((sum, fee) => sum + fee.amount, 0).toLocaleString() || 0} {(traineeFeesData || response)?.[0]?.safe?.currency || 'ر.س'}
                            </p>
                        </div>
                    </div>
                )}

                {/* Table Section with Complete Overflow Fix */}
                <div className="bg-white rounded-xl shadow-md border border-gray-200">
                    {isTraineeFeesLoading ? (
                        <div className="flex flex-col items-center justify-center py-16">
                            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
                            <span className="mt-4 text-gray-600 font-medium">جاري تحميل البيانات...</span>
                        </div>
                    ) : traineeFeesError ? (
                        <div className="text-center py-16 px-4">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-red-600 mb-2">خطأ في تحميل البيانات</h3>
                            <p className="text-gray-600 mb-6">حدث خطأ أثناء جلب بيانات الرسوم. يرجى المحاولة مرة أخرى.</p>
                            <button 
                                onClick={() => refetchTraineeFees()}
                                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg"
                            >
                                إعادة المحاولة
                            </button>
                        </div>
                    ) : (
                        <div className="overflow-x-auto" style={{ maxWidth: '100%' }}>
                            <div className="min-w-max w-full" style={{ maxWidth: 'none' }}>
                                <TraineeFeesTable data={traineeFeesData || []} />
                            </div>
                        </div>
                    )}
                </div>

                {/* Pagination Section */}
                <div className="mt-6 flex justify-center">
                    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4">
                        <Paginator totalPages={3} />
                    </div>
                </div>
            </div>

            {/* Dialog */}
            <FeesDialog 
                programs={data ?? []}
                safes={res ?? []} 
                isOpen={isOpen} 
                onClose={handleCloseDialog} 
            />
        </div>
    );
}

export default memo(TraineeFees);