"use client";

import Table from "@/components/StudentFinancialReports/Table";
import TotalFees from "@/components/StudentFinancialReports/TotalFees";
import { transactions } from "@/data";

interface iStudentFinancialReports {
    params: { StudentFinancialReportsid: string }
}

const StudentFinancialReports = ({params}:iStudentFinancialReports) => {
    console.log(params.StudentFinancialReportsid)
    
    const payments = [
        { dueDate: '2024-03-15', amount: 1000, status: 'Pending' },
        { dueDate: '2024-02-15', amount: 500, status: 'Pending' },
    ];
      
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" };
        return new Date(dateString).toLocaleDateString('ar-SA', options);
    };
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6" dir="rtl">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">التقارير المالية للطلاب</h1>
                    <p className="text-gray-600">عرض شامل للتقارير المالية والمدفوعات للطالب</p>
                </div>

                {/* Student Information Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">بيانات الطالب</h2>
                    <Table/>
                </div>

                {/* Total Fees Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <TotalFees name="مجموع الرسوم" amount={5000} />
                    <TotalFees name="إجمالي المبلغ" amount={3500} />
                    <TotalFees name="الرصيد المستحق" amount={1500} />
                </div>

                {/* Installment Payments Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">الدفع بالتقسيط</h2>
      
                    <div className="overflow-hidden rounded-xl border border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
                                <tr>
                                    <th className="px-6 py-4 text-right text-sm font-bold text-gray-700 uppercase tracking-wider">تاريخ الاستحقاق</th>
                                    <th className="px-6 py-4 text-right text-sm font-bold text-gray-700 uppercase tracking-wider">القيمة</th>
                                    <th className="px-6 py-4 text-right text-sm font-bold text-gray-700 uppercase tracking-wider">الحالة</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {payments.map((payment, index) => (
                                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {new Date(payment.dueDate).toLocaleDateString('ar-SA', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                            ₪{payment.amount.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1.5 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                ${payment.status === 'Pending' ? 'bg-amber-100 text-amber-800 ring-1 ring-amber-200' : 
                                                payment.status === 'Paid' ? 'bg-green-100 text-green-800 ring-1 ring-green-200' : 
                                                'bg-gray-100 text-gray-800 ring-1 ring-gray-200'}`}>
                                                {payment.status === 'Pending' ? 'قيد الانتظار' : payment.status === 'Paid' ? 'مدفوع' : 'غير مدفوع'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Transactions History Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">سجل المعاملات</h2>
                    
                    <div className="overflow-hidden rounded-xl border border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
                                <tr className="text-right">
                                    <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase tracking-wider">التاريخ</th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase tracking-wider">الوصف</th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase tracking-wider">النوع</th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase tracking-wider">المبلغ</th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase tracking-wider">الحالة</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {transactions.map((transaction, index) => {
                                    const translatedType = transaction.type === 'Payment' ? 'دفع' : 'إضافة';
                                    const translatedStatus = transaction.status === 'Completed' ? 'مكتمل'
                                                          : transaction.status === 'Pending' ? 'قيد الانتظار'
                                                          : 'مرفوض';
                                    return (
                                        <tr
                                            key={index}
                                            className="hover:bg-gray-50 transition-colors text-right"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(transaction.date)}</td>
                                            <td className="px-6 py-4 text-sm text-gray-900">{transaction.description}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-3 py-1.5 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                    ${transaction.type === 'Payment' ? 'bg-blue-100 text-blue-800 ring-1 ring-blue-200' : 'bg-purple-100 text-purple-800 ring-1 ring-purple-200'}`}>
                                                    {translatedType}
                                                </span>
                                            </td>
                                            <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold 
                                                ${transaction.type === 'Payment' ? 'text-green-600' : 'text-gray-900'}`}>
                                                ₪{transaction.amount.toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-3 py-1.5 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                    ${transaction.status === 'Completed' ? 'bg-green-100 text-green-800 ring-1 ring-green-200' : 
                                                    transaction.status === 'Pending' ? 'bg-amber-100 text-amber-800 ring-1 ring-amber-200' : 
                                                    'bg-red-100 text-red-800 ring-1 ring-red-200'}`}>
                                                    {translatedStatus}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentFinancialReports;

 {/* <div className="flex space-x-20 items-center border-b border-white">
                     <span className="text-white text-xl py-4 mb-4">اسم الطالب</span> <span className="text-white text-xl py-4 mb-4">محمد رفيق</span>
                    </div>
                    <div className="flex space-x-20 items-center border-b border-white">
                     <span className="text-white text-xl py-4 mb-4">الطالب id</span> <span className="text-white text-xl py-4 mb-4">12543</span>
                    </div>
                    <div className="flex space-x-20 items-center border-b border-white">
                     <span className="text-white text-xl py-4 mb-4">التخصص / الكورس</span> <span className="text-white text-xl py-4 mb-4">هندسه البرمجيات</span>
                    </div>
                    <div className="flex space-x-20 items-center border-b border-white">
                     <span className="text-white text-xl py-4 mb-4">تاريخ التسجيل</span> <span className="text-white text-xl py-4 mb-4">22/5/2023</span>
                    </div> */}