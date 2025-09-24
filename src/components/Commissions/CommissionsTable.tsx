"use client";
import { useState, useMemo } from "react";
import { 
  Eye, 
  Edit, 
  Trash2, 
  MoreVertical, 
  DollarSign, 
  Calendar, 
  User,
  CheckCircle,
  Clock,
  AlertCircle,
  CreditCard,
  FileText,
  TrendingUp,
  Users,
  Phone,
  Mail,
  MapPin,
  Award,
  Target
} from "lucide-react";
import { Commission, CommissionStatus, CommissionType } from "@/types/commission.types";

interface CommissionsTableProps {
  commissions: Commission[];
  isLoading?: boolean;
  onView?: (commission: Commission) => void;
  onEdit?: (commission: Commission) => void;
  onDelete?: (commission: Commission) => void;
  onPay?: (commission: Commission) => void;
}

const CommissionsTable = ({ 
  commissions, 
  isLoading = false, 
  onView, 
  onEdit, 
  onDelete, 
  onPay 
}: CommissionsTableProps) => {
  const [selectedCommissionId, setSelectedCommissionId] = useState<number | null>(null);

  // Helper functions
  const getStatusInfo = (status: CommissionStatus) => {
    switch (status) {
      case 'PAID':
        return {
          label: 'مدفوع',
          color: 'green',
          icon: CheckCircle,
          bgColor: 'bg-green-100',
          textColor: 'text-green-800',
          borderColor: 'border-green-200'
        };
      case 'PENDING':
        return {
          label: 'معلق',
          color: 'orange',
          icon: Clock,
          bgColor: 'bg-orange-100',
          textColor: 'text-orange-800',
          borderColor: 'border-orange-200'
        };
      default:
        return {
          label: 'غير محدد',
          color: 'gray',
          icon: AlertCircle,
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800',
          borderColor: 'border-gray-200'
        };
    }
  };

  const getTypeInfo = (type: CommissionType) => {
    switch (type) {
      case 'FIRST_CONTACT':
        return {
          label: 'أول اتصال',
          color: 'blue',
          icon: Target,
          bgColor: 'bg-blue-100',
          textColor: 'text-blue-800'
        };
      case 'SECOND_CONTACT':
        return {
          label: 'ثاني اتصال',
          color: 'purple',
          icon: Award,
          bgColor: 'bg-purple-100',
          textColor: 'text-purple-800'
        };
      default:
        return {
          label: 'غير محدد',
          color: 'gray',
          icon: AlertCircle,
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800'
        };
    }
  };

  const formatDate = (date: Date | string) => {
    if (!date) return 'غير محدد';
    return new Date(date).toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-EG', {
      style: 'currency',
      currency: 'EGP',
      minimumFractionDigits: 0
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 animate-pulse">
            <div className="grid grid-cols-12 gap-6 items-center">
              <div className="col-span-2">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-2xl"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                  <div className="h-3 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
              <div className="col-span-2">
                <div className="h-6 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="col-span-2">
                <div className="h-6 bg-gray-200 rounded w-20"></div>
              </div>
              <div className="col-span-2">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
              </div>
              <div className="col-span-2">
                <div className="flex gap-2">
                  <div className="w-10 h-10 bg-gray-200 rounded-xl"></div>
                  <div className="w-10 h-10 bg-gray-200 rounded-xl"></div>
                  <div className="w-10 h-10 bg-gray-200 rounded-xl"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!commissions || commissions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <DollarSign className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">لا توجد عمولات</h3>
        <p className="text-gray-600">لم يتم العثور على أي عمولات في النظام</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Table Header */}
      <div className="bg-gradient-to-r from-gray-50 via-green-50 to-emerald-50 px-8 py-6 rounded-2xl border border-gray-200/50">
        <div className="grid grid-cols-12 gap-6 items-center text-sm font-bold text-gray-700">
          <div className="col-span-2 text-center">المسوق</div>
          <div className="col-span-2 text-center">المتدرب</div>
          <div className="col-span-2 text-center">نوع العمولة</div>
          <div className="col-span-2 text-center">المبلغ</div>
          <div className="col-span-2 text-center">الحالة</div>
          <div className="col-span-2 text-center">الإجراءات</div>
        </div>
      </div>

      {/* Table Body */}
      <div className="space-y-4">
        {commissions.map((commission) => {
          const statusInfo = getStatusInfo(commission.status);
          const typeInfo = getTypeInfo(commission.type);
          const StatusIcon = statusInfo.icon;
          const TypeIcon = typeInfo.icon;

          return (
            <div
              key={commission.id}
              className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="grid grid-cols-12 gap-6 items-center">
                {/* Marketing Employee Info */}
                <div className="col-span-2">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center border-3 border-white shadow-lg">
                        <User className="w-8 h-8 text-blue-600" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full flex items-center justify-center">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{commission.marketingEmployee.name}</h3>
                      <p className="text-sm text-gray-600">#{commission.marketingEmployee.id}</p>
                      <p className="text-xs text-gray-500">{commission.marketingEmployee.position}</p>
                    </div>
                  </div>
                </div>

                {/* Trainee Info */}
                <div className="col-span-2">
                  <div className="space-y-2">
                    <div>
                      <h4 className="font-semibold text-gray-900">{commission.trainee.nameAr}</h4>
                      <p className="text-sm text-gray-600">{commission.trainee.nameEn}</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Phone className="w-3 h-3" />
                      <span>{commission.trainee.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Mail className="w-3 h-3" />
                      <span>{commission.trainee.email}</span>
                    </div>
                  </div>
                </div>

                {/* Commission Type */}
                <div className="col-span-2">
                  <div className="text-center">
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl ${typeInfo.bgColor} ${typeInfo.textColor}`}>
                      <TypeIcon className="w-4 h-4" />
                      <span className="font-semibold">{typeInfo.label}</span>
                    </div>
                    {commission.description && (
                      <p className="text-xs text-gray-500 mt-1">{commission.description}</p>
                    )}
                  </div>
                </div>

                {/* Amount */}
                <div className="col-span-2">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {formatCurrency(commission.amount)}
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(commission.createdAt)}</span>
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="col-span-2">
                  <div className="text-center">
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl ${statusInfo.bgColor} ${statusInfo.textColor} border ${statusInfo.borderColor}`}>
                      <StatusIcon className="w-4 h-4" />
                      <span className="font-semibold">{statusInfo.label}</span>
                    </div>
                    {commission.paidAt && (
                      <p className="text-xs text-gray-500 mt-1">
                        دفع: {formatDate(commission.paidAt)}
                      </p>
                    )}
                    {commission.paidBy && (
                      <p className="text-xs text-gray-500">
                        بواسطة: {commission.paidBy}
                      </p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="col-span-2">
                  <div className="flex items-center justify-center gap-2">
                    {/* View Button */}
                    <button
                      onClick={() => onView?.(commission)}
                      className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
                      title="عرض التفاصيل"
                    >
                      <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    </button>

                    {/* Edit Button */}
                    <button
                      onClick={() => onEdit?.(commission)}
                      className="p-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
                      title="تعديل العمولة"
                    >
                      <Edit className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    </button>

                    {/* Pay Button (only for pending commissions) */}
                    {commission.status === 'PENDING' && (
                      <button
                        onClick={() => onPay?.(commission)}
                        className="p-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
                        title="دفع العمولة"
                      >
                        <CreditCard className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      </button>
                    )}

                    {/* More Actions */}
                    <div className="relative group">
                      <button className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all duration-200 hover:scale-105">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CommissionsTable;
