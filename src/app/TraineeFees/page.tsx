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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23f3f4f6%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Section */}
                <div className="mb-12">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-2xl shadow-blue-500/30 mb-6 relative">
                            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                        <h1 className="text-5xl font-black bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                            إدارة الرسوم
                        </h1>
                        <p className="text-xl text-gray-600 font-medium max-w-2xl mx-auto leading-relaxed">
                            نظام متكامل لإدارة وتتبع رسوم المتدربين بكفاءة عالية
                        </p>
                        <div className="flex items-center justify-center gap-8 mt-6">
                            <div className="flex items-center gap-2 text-gray-600">
                                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="font-medium">نظام آمن</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                                <span className="font-medium">تتبع دقيق</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                                <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                                <span className="font-medium">تقارير شاملة</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Actions Section */}
                <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/30 p-6 mb-10">
                    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                        <div className="flex-1 w-full lg:w-auto">
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-sm group-hover:blur-md transition-all duration-300"></div>
                                <input 
                                    type="text" 
                                    placeholder="ابحث عن رسم، برنامج، أو متدرب..." 
                                    className="relative w-full px-6 py-4 pl-14 bg-white/80 backdrop-blur-sm border-2 border-gray-200/50 rounded-2xl focus:ring-4 focus:ring-blue-100/50 focus:border-blue-500 transition-all duration-300 text-gray-700 placeholder-gray-500 group-hover:shadow-xl focus:shadow-2xl"
                                />
                                <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
                                    <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <div className="absolute right-5 top-1/2 transform -translate-y-1/2">
                                    <kbd className="px-3 py-1 text-xs font-bold text-gray-500 bg-gray-100/80 border border-gray-300/50 rounded-lg backdrop-blur-sm">Ctrl+K</kbd>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <FilterButton
                                className="bg-white/80 backdrop-blur-sm hover:bg-white text-gray-700 px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 border border-gray-200/50"
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
                                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl flex items-center gap-2 group"
                            >
                                <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                <span>إضافة رسم</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                {response && response.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
                        {/* إجمالي الرسوم */}
                        <div className="group relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/40 p-6 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-gray-600 mb-1">إجمالي الرسوم</p>
                                        <p className="text-2xl font-black text-gray-900">{response.length}</p>
                                        <p className="text-xs text-gray-500 font-medium">رسم إجمالي</p>
                                    </div>
                                </div>
                                <div className="h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
                            </div>
                        </div>
                        
                        {/* إجمالي المبلغ */}
                        <div className="group relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/40 p-6 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform duration-300">
                                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                        </svg>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-gray-600 mb-1">إجمالي المبلغ</p>
                                        <p className="text-2xl font-black text-purple-600">
                                            {response.reduce((sum, fee) => sum + fee.amount, 0).toLocaleString()}
                                        </p>
                                        <p className="text-xs text-gray-500 font-medium">
                                            {response[0]?.safe?.currency || 'ر.س'}
                                        </p>
                                    </div>
                                </div>
                                <div className="h-1 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"></div>
                            </div>
                        </div>
                        
                        {/* مدفوعة */}
                        <div className="group relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/40 p-6 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30 group-hover:scale-110 transition-transform duration-300">
                                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-gray-600 mb-1">مدفوعة</p>
                                        <p className="text-2xl font-black text-green-600">
                                            {response.filter(fee => fee.isApplied).length}
                                        </p>
                                        <p className="text-xs text-gray-500 font-medium">
                                            {response.filter(fee => fee.isApplied).reduce((sum, fee) => sum + fee.amount, 0).toLocaleString()} {response[0]?.safe?.currency || 'ر.س'}
                                        </p>
                                    </div>
                                </div>
                                <div className="h-1 bg-gradient-to-r from-green-500 to-green-600 rounded-full"></div>
                            </div>
                        </div>
                        
                        {/* غير مدفوعة */}
                        <div className="group relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/40 p-6 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/30 group-hover:scale-110 transition-transform duration-300">
                                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-gray-600 mb-1">غير مدفوعة</p>
                                        <p className="text-2xl font-black text-red-600">
                                            {response.filter(fee => !fee.isApplied).length}
                                        </p>
                                        <p className="text-xs text-gray-500 font-medium">
                                            {response.filter(fee => !fee.isApplied).reduce((sum, fee) => sum + fee.amount, 0).toLocaleString()} {response[0]?.safe?.currency || 'ر.س'}
                                        </p>
                                    </div>
                                </div>
                                <div className="h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Table Section */}
                <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/40 overflow-hidden">
                    <TraineeFeesTable />
                </div>

                {/* Pagination Section */}
                <div className="mt-8 flex justify-center">
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/30 p-4">
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