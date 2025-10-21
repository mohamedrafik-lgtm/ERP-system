'use client';
import { useGetUsersQuery, useDeleteUserMutation } from "@/lip/features/users/user";
import { RowCardSkeleton } from "../ui/Skeleton";
import ConfirmationModal from "./ConfirmationModal";
import DeleteConfirmationEnhanced from "./DeleteConfirmationEnhanced";
import EditEmployeeModal from "./EditEmployeeModal";
import UserDetailsModal from "./UserDetailsModal";
import { useState } from "react";
import { 
  UserIcon, 
  EnvelopeIcon, 
  ShieldCheckIcon, 
  PencilIcon, 
  TrashIcon,
  EyeIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const EmployeeTable = () => {
  const {data,isLoading} = useGetUsersQuery()
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  
  if(isLoading) return <RowCardSkeleton/>;

  const handleEditUser = (userId: string) => {
    setSelectedUserId(userId);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedUserId('');
  };

  const handleViewDetails = (userId: string) => {
    setSelectedUserId(userId);
    setDetailsModalOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setDetailsModalOpen(false);
    setSelectedUserId('');
  };
  
  const getRoleBadge = (accountType: string) => {
    if (accountType === 'STAFF') {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
          <UserIcon className="w-3 h-3" />
          موظف
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
        <ShieldCheckIcon className="w-3 h-3" />
        مدرب
      </span>
    );
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="hidden lg:grid grid-cols-12 gap-4 bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200">
        <div className="col-span-1 text-center font-bold text-gray-700">#</div>
        <div className="col-span-3 text-center font-bold text-gray-700">المستخدم</div>
        <div className="col-span-3 text-center font-bold text-gray-700">البريد الإلكتروني</div>
        <div className="col-span-2 text-center font-bold text-gray-700">الصلاحية</div>
        <div className="col-span-3 text-center font-bold text-gray-700">الإجراءات</div>
      </div>

      {/* Data Rows */}
      {data?.map((user, idx) => (
        <div
          key={idx}
          className="group bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-2xl p-6 shadow-sm hover:shadow-xl border border-gray-100 hover:border-blue-200 transition-all duration-300"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            {/* رقم التسلسل */}
            <div className="lg:col-span-1 text-center lg:text-right">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {idx + 1}
              </div>
            </div>

            {/* بيانات المستخدم */}
            <div className="lg:col-span-3">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                  <UserIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{user.name}</h3>
                  <p className="text-sm text-gray-500">مستخدم نشط</p>
                </div>
              </div>
            </div>

            {/* البريد الإلكتروني */}
            <div className="lg:col-span-3">
              <div className="flex items-center space-x-2">
                <EnvelopeIcon className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700 font-medium">{user.email}</span>
              </div>
            </div>

            {/* نوع الحساب */}
            <div className="lg:col-span-2 text-center">
              {getRoleBadge(user.accountType)}
            </div>

            {/* الإجراءات */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-center space-x-2">
                {/* عرض التفاصيل */}
                <button 
                  onClick={() => handleViewDetails(user.id)}
                  className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors group"
                >
                  <EyeIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>

                {/* تعديل */}
                <button 
                  onClick={() => handleEditUser(user.id)}
                  className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors group"
                >
                  <PencilIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>

                {/* حذف */}
                <DeleteConfirmationEnhanced
                  userId={user.id}
                  userName={user.name}
                  userEmail={user.email}
                  userPhone={user.phone}
                  userAccountType={user.accountType}
                  onDeleteSuccess={() => {
                    // يمكن إضافة أي منطق إضافي هنا بعد الحذف
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Empty State */}
      {data?.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserIcon className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">لا يوجد مستخدمين</h3>
          <p className="text-gray-500 mb-6">لم يتم العثور على أي مستخدمين في النظام</p>
        </div>
      )}

      {/* Edit Modal */}
      {selectedUserId && (
        <EditEmployeeModal
          userId={selectedUserId}
          isOpen={editModalOpen}
          onClose={handleCloseEditModal}
        />
      )}

      {/* Details Modal */}
      {selectedUserId && (
        <UserDetailsModal
          userId={selectedUserId}
          isOpen={detailsModalOpen}
          onClose={handleCloseDetailsModal}
        />
      )}
    </div>
  );
};

export default EmployeeTable;
