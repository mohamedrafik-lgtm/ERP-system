'use client';
import FeesDialog from "@/components/TraineeFees/Modal";
import TraineeFeesTable from "@/components/TraineeFees/TraineeFeesTable";
import FilterButton from "@/components/ui/filterButton";
import Paginator from "@/components/ui/paginator";
import { useGetFeesQuery } from "@/lip/features/Fees/Fees";
import { useGetFinanceQuery } from "@/lip/features/Lockers/safe";
import { useGetProgramsQuery } from "@/lip/features/program/program";
import { useState, useCallback, useMemo, memo } from "react";

const TraineeFees = () =>{
    const [isOpen, setIsOpen] = useState(false);
    const {data} = useGetProgramsQuery ();
    const {data:res} = useGetFinanceQuery();
    const {data: response} = useGetFeesQuery();

    const handleOpenDialog = useCallback(() => {
        setIsOpen(true);
    }, []);

    const handleCloseDialog = useCallback(() => {
        setIsOpen(false);
    }, []);

    // حساب الإحصائيات
    const statistics = useMemo(() => {
        if (!response || response.length === 0) {
            return {
                totalAmount: 0,
                paidAmount: 0,
                unpaidAmount: 0,
                totalCount: 0,
                paidCount: 0,
                unpaidCount: 0,
                currency: 'ر.س'
            };
        }

        const totalAmount = response.reduce((sum, fee) => sum + fee.amount, 0);
        const paidFees = response.filter(fee => fee.isApplied);
        const unpaidFees = response.filter(fee => !fee.isApplied);
        
        const paidAmount = paidFees.reduce((sum, fee) => sum + fee.amount, 0);
        const unpaidAmount = unpaidFees.reduce((sum, fee) => sum + fee.amount, 0);
        
        return {
            totalAmount,
            paidAmount,
            unpaidAmount,
            totalCount: response.length,
            paidCount: paidFees.length,
            unpaidCount: unpaidFees.length,
            currency: response[0]?.safe?.currency || 'ر.س'
        };
    }, [response]);
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">رسوم المتدرب</h1>
                            <p className="text-gray-600 mt-1">إدارة وعرض تفاصيل رسوم المتدربين</p>
                        </div>
                    </div>
                </div>

                {/* Search and Actions Section */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
                    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                        <div className="flex-1 w-full lg:w-auto">
                            <div className="relative">
                                <input 
                                    type="text" 
                                    placeholder="ابحث عن رسم..." 
                                    className="w-full px-4 py-3 pl-12 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-200"
                                />
                                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <FilterButton
                                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2"
                                label="فلتر"
                                paramKey="status"
                                options={[
                                    "الكل",
                                    "مدفوع",
                                    "غير مدفوع"
                                ]}
                            />
                            <button
                                onClick={() => setIsOpen(true)}
                                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105 shadow-lg flex items-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                إضافة رسوم متدربين
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                {response && response.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">إجمالي الرسوم</p>
                                    <p className="text-2xl font-bold text-gray-900">{response.length}</p>
                                </div>
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">إجمالي المبلغ</p>
                                    <p className="text-2xl font-bold text-purple-600">
                                        {response.reduce((sum, fee) => sum + fee.amount, 0).toLocaleString()}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {response[0]?.safe?.currency || 'ر.س'}
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">مدفوعة</p>
                                    <p className="text-2xl font-bold text-green-600">
                                        {response.filter(fee => fee.isApplied).length}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {response.filter(fee => fee.isApplied).reduce((sum, fee) => sum + fee.amount, 0).toLocaleString()} {response[0]?.safe?.currency || 'ر.س'}
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">غير مدفوعة</p>
                                    <p className="text-2xl font-bold text-red-600">
                                        {response.filter(fee => !fee.isApplied).length}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {response.filter(fee => !fee.isApplied).reduce((sum, fee) => sum + fee.amount, 0).toLocaleString()} {response[0]?.safe?.currency || 'ر.س'}
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Table Section */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    <TraineeFeesTable />
                </div>

                {/* Pagination Section */}
                <div className="mt-6 flex justify-center">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
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