"use client";

import { useState } from "react";
import { 
  CreditCard, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Download,
  Eye,
  Calendar,
  DollarSign,
  Receipt,
  Banknote
} from "lucide-react";

const StudentPayments = () => {
  const [filterStatus, setFilterStatus] = useState("all");

  const payments = [
    {
      id: 1,
      feeName: "رسوم التسجيل",
      amount: 500,
      dueDate: "2024-01-15",
      status: "paid",
      paymentDate: "2024-01-10",
      method: "تحويل بنكي",
      receipt: "REC-001"
    },
    {
      id: 2,
      feeName: "الرسوم الشهرية - يناير",
      amount: 300,
      dueDate: "2024-01-20",
      status: "paid",
      paymentDate: "2024-01-18",
      method: "بطاقة ائتمان",
      receipt: "REC-002"
    },
    {
      id: 3,
      feeName: "الرسوم الشهرية - فبراير",
      amount: 300,
      dueDate: "2024-02-20",
      status: "pending",
      paymentDate: null,
      method: null,
      receipt: null
    },
    {
      id: 4,
      feeName: "رسوم الامتحان",
      amount: 100,
      dueDate: "2024-02-25",
      status: "overdue",
      paymentDate: null,
      method: null,
      receipt: null
    }
  ];

  const filteredPayments = payments.filter(payment => {
    if (filterStatus === "all") return true;
    return payment.status === filterStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'overdue':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return 'مدفوع';
      case 'pending':
        return 'معلق';
      case 'overdue':
        return 'متأخر';
      default:
        return 'غير محدد';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'overdue':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const totalPaid = payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
  const totalPending = payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);
  const totalOverdue = payments.filter(p => p.status === 'overdue').reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex" dir="rtl">
      
      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        <div className="p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">المدفوعات</h1>
            <p className="text-gray-600">متابعة حالة المدفوعات والرسوم</p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-2xl font-bold text-green-600">{totalPaid} ج.م</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">المدفوع</h3>
              <p className="text-gray-600 text-sm">إجمالي المبالغ المدفوعة</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
                <span className="text-2xl font-bold text-yellow-600">{totalPending} ج.م</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">معلق</h3>
              <p className="text-gray-600 text-sm">المبالغ المعلقة</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <span className="text-2xl font-bold text-red-600">{totalOverdue} ج.م</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">متأخر</h3>
              <p className="text-gray-600 text-sm">المبالغ المتأخرة</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">فلتر حسب الحالة:</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => setFilterStatus("all")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filterStatus === "all" 
                      ? "bg-blue-600 text-white" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  الكل
                </button>
                <button
                  onClick={() => setFilterStatus("paid")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filterStatus === "paid" 
                      ? "bg-green-600 text-white" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  مدفوع
                </button>
                <button
                  onClick={() => setFilterStatus("pending")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filterStatus === "pending" 
                      ? "bg-yellow-600 text-white" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  معلق
                </button>
                <button
                  onClick={() => setFilterStatus("overdue")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filterStatus === "overdue" 
                      ? "bg-red-600 text-white" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  متأخر
                </button>
              </div>
            </div>
          </div>

          {/* Payments List */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">قائمة المدفوعات</h3>
            </div>
            
            <div className="divide-y divide-gray-100">
              {filteredPayments.map((payment) => (
                <div key={payment.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{payment.feeName}</h4>
                        <p className="text-gray-600">المبلغ: {payment.amount} ج.م</p>
                        <p className="text-sm text-gray-500">موعد الاستحقاق: {formatDate(payment.dueDate)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-left">
                        <div className="flex items-center space-x-2 mb-2">
                          {getStatusIcon(payment.status)}
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(payment.status)}`}>
                            {getStatusText(payment.status)}
                          </span>
                        </div>
                        
                        {payment.status === 'paid' && (
                          <div className="text-sm text-gray-600">
                            <p>تاريخ الدفع: {formatDate(payment.paymentDate!)}</p>
                            <p>طريقة الدفع: {payment.method}</p>
                            <p>رقم الإيصال: {payment.receipt}</p>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {payment.status === 'paid' && (
                          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                            <Receipt className="w-5 h-5" />
                          </button>
                        )}
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                          <Eye className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                          <Download className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {payment.status === 'pending' && (
                    <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-5 h-5 text-yellow-600" />
                        <span className="text-yellow-800 font-medium">معلق الدفع</span>
                      </div>
                      <p className="text-yellow-700 text-sm mt-1">
                        يرجى دفع هذا المبلغ قبل {formatDate(payment.dueDate)} لتجنب التأخير
                      </p>
                    </div>
                  )}
                  
                  {payment.status === 'overdue' && (
                    <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="w-5 h-5 text-red-600" />
                        <span className="text-red-800 font-medium">متأخر الدفع</span>
                      </div>
                      <p className="text-red-700 text-sm mt-1">
                        هذا المبلغ متأخر عن موعد الاستحقاق. يرجى الدفع في أقرب وقت ممكن
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentPayments;
