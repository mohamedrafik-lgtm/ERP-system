import FinancialModel from "@/components/ReviewOfFinancialrRestrictions/Dialog";
import { Search } from "@/components/ReviewOfFinancialrRestrictions/Search";
import FinancialStatementsTable from "@/components/ReviewOfFinancialrRestrictions/Table";
import InlineMenu from "@/components/ui/MenuReport";
import Paginator from "@/components/ui/paginator";
import { useMemo, memo } from "react";



const FinancialStatements = () => {
       const items = useMemo(() => [
        { name: 'حساب المدفوعات', label: 'حساب المدفوعات', value: 'حساب المدفوعات' },
        { name: 'رصيد حساب المدفوعات' , label: 'مدفوعات المتدربين', value: 'مدفوعات المتدربين' },
        { name: 'برامج رسوم', label: 'حساب رسوم برامج', value: 'حساب رسوم برامج' },
        { name: 'حساب الاقساط', label: 'حساب الاقساط', value: 'حساب الاقساط' }
       ], []);
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                 {/* Header Section */}
                 <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
                     <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">القيم المالية</h1>
                            <p className="text-gray-600 mt-1">إدارة وعرض جميع القيود المالية وإنشاء قيود جديدة</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-3">
                        <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>نظام محاسبي متكامل</span>
                        </div>
                        <FinancialModel/>
                     </div>
                 </div>

                 {/* Filter Section */}
                 <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">فلتر البيانات</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">رصيد حساب</label>
                            <InlineMenu name="رصيد حساب" items={items} />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">تقارير</label>
                            <InlineMenu name="تقارير" items={items} />
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">البحث</label>
                        <Search/>
                    </div>
                 </div>

                 {/* Table Section */}
                 <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8">
                    <div className="p-6 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">القيم المالية</h3>
                        </div>
                    </div>
                    <div className="p-6">
                        <FinancialStatementsTable/>
                    </div>
                 </div>

                 {/* Pagination Section */}
                 <div className="flex justify-center">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4">
                        <Paginator totalPages={5}/>
                    </div>
                 </div>
            </div>
        </div>
    )
}

export default memo(FinancialStatements);