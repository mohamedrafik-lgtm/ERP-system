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
        return new Date(dateString).toLocaleDateString('en-US', options);
      };
    return (
        <div dir="ltr" className="pt-15">
        <div className="max-w-8/12 mx-auto">
               <div>
                    <h1 className="text-3xl text-white mb-3">التقارير المالية للطلاب</h1>
                    <p className="text-orange-600">ستعرض هذه الصفحة التقارير المالية للطلاب.</p>
                </div>
                <div>
                    <h2 className="text-2xl text-white mt-5 py-4 mb-4 border-b">بيانات الطالب</h2>
                    {/* student information*/}
                    <Table/>
                </div>
                <div className="flex justify-between mt-10">
                    <TotalFees name="مجموع الرسوم" amount={5000} />
                    <TotalFees name="إجمالي المبلغ" amount={3500} />
                    <TotalFees name="الرصيد المستحق" amount={1500} />
                </div>

  
                <div className=" rounded-xl mt-10">
                 <h2 className="text-2xl font-semibold mb-8 text-white border-b  pb-3">الدفع بالتقسيط</h2>
      
                 <div className="overflow-hidden rounded-lg  border-gray-100 shadow-xs">
                   <table className="min-w-full divide-y divide-gray-200">
                     <thead className="bg-white/15">
                       <tr>
                         <th className="px-6 py-3 text-left text-sm font-medium text-white uppercase tracking-wider">تاريخ الاستحقاق</th>
                         <th className="px-6 py-3 text-left text-sm font-medium text-white uppercase tracking-wider">القيمه</th>
                         <th className="px-6 py-3 text-left text-sm font-medium text-white uppercase tracking-wider">الحالصه</th>
                       </tr>
                     </thead>
                     <tbody className=" divide-y divide-gray-200">
                       {payments.map((payment, index) => (
                         <tr key={index} className="hover:bg-orange transition-colors">
                           <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                             {new Date(payment.dueDate).toLocaleDateString('en-US', {
                               year: 'numeric',
                               month: 'short',
                               day: 'numeric'
                             })}
                           </td>
                           <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-semibold">
                             ${payment.amount.toLocaleString()}
                           </td>
                           <td className="px-6 py-4 whitespace-nowrap">
                             <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                               ${payment.status === 'Pending' ? 'bg-amber-50 text-amber-700 ring-1 ring-amber-100' : 
                                 payment.status === 'Paid' ? 'bg-green-50 text-green-700 ring-1 ring-green-100' : 
                                 'bg-gray-50 text-gray-700 ring-1 ring-gray-100'}`}>
                               {payment.status}
                             </span>
                           </td>
                         </tr>
                       ))}
                     </tbody>
                   </table>
                 </div>
               </div>

               <div className="rounded-xl mt-10">
                   <h2  className="text-2xl text-left font-semibold mb-6 text-white border-b pb-3 ">سجل المعاملات</h2>
                   <div className="overflow-hidden rounded-xl">
                     <table className="min-w-full divide-y divide-gray-200">
                       <thead className="bg-gray-700">
                         <tr className="rounded-t-xl text-right">
                           <th className="px-6 py-3 text-xs font-medium text-white uppercase tracking-wider">التاريخ</th>
                           <th className="px-6 py-3 text-xs font-medium text-white uppercase tracking-wider">الوصف</th>
                           <th className="px-6 py-3 text-xs font-medium text-white uppercase tracking-wider">النوع</th>
                           <th className="px-6 py-3 text-xs font-medium text-white uppercase tracking-wider">المبلغ</th>
                           <th className="px-6 py-3 text-xs font-medium text-white uppercase tracking-wider">الحالة</th>
                         </tr>
                       </thead>
                       <tbody className="text-white divide-y divide-gray-200">
                         {transactions.map((transaction, index) => {
                           const isLast = index === transactions.length - 1;
          
                           const translatedType = transaction.type === 'Payment' ? 'دفع' : 'إضافة';
                           const translatedStatus = transaction.status === 'Completed' ? 'مكتمل'
                                                 : transaction.status === 'Pending' ? 'قيد الانتظار'
                                                 : 'مرفوض';
                           return (
                             <tr
                               key={index}
                               className={`hover:bg-gray-600 transition-colors ${isLast ? 'rounded-b-xl' : ''} text-right`}
                             >
                               <td className="px-6 py-4 whitespace-nowrap text-sm">{formatDate(transaction.date)}</td>
                               <td className="px-6 py-4 text-sm">{transaction.description}</td>
                               <td className="px-6 py-4 whitespace-nowrap">
                                 <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                   ${transaction.type === 'Payment' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                                   {translatedType}
                                 </span>
                               </td>
                               <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium 
                                 ${transaction.type === 'Payment' ? 'text-green-400' : 'text-white'}`}>
                                 ${transaction.amount.toLocaleString()}
                               </td>
                               <td className="px-6 py-4 whitespace-nowrap">
                                 <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                                   ${transaction.status === 'Completed' ? 'bg-green-100 text-green-800 ring-1 ring-green-200' : 
                                     transaction.status === 'Pending' ? 'bg-amber-100 text-amber-800 ring-1 ring-amber-200' : 
                                     'bg-gray-100 text-gray-800 ring-1 ring-gray-200'}`}>
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