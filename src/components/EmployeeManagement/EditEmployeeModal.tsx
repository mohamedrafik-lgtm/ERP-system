'use client';
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState, useEffect } from 'react'
import EditUserForm, { EditFormValues } from './EditEmployeeModalContent'
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { usePatchUserMutation, useGetUserByIdQuery } from '@/lip/features/users/user';
import toast from 'react-hot-toast';
import { PencilIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { updateUserSchema } from '@/Schema/user';

interface EditEmployeeModalProps {
  userId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function EditEmployeeModal({ userId, isOpen, onClose }: EditEmployeeModalProps) {
  const [patchUser, { isLoading }] = usePatchUserMutation();
  const { data: userData, isLoading: isUserLoading } = useGetUserByIdQuery(userId, {
    skip: !userId || !isOpen
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditFormValues>({
    resolver: yupResolver(updateUserSchema)
  });

  // Reset form when user data is loaded
  useEffect(() => {
    if (userData) {
      reset({
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        accountType: userData.accountType,
        roleId: userData.roleId || '',
      });
    }
  }, [userData, reset]);

  const onSubmit: SubmitHandler<EditFormValues> = async (data) => {
    try {
      await patchUser({
        id: userId,
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          accountType: data.accountType as 'STAFF' | 'INSTRUCTOR',
          roleId: data.roleId || undefined,
        }
      }).unwrap();
      
      onClose();
      reset();
      toast.success('تم تحديث المستخدم بنجاح');
    } catch (error) {
      toast.error('حدث خطأ أثناء تحديث المستخدم');
    }
  };

  if (isUserLoading) {
    return (
      <Dialog open={isOpen} className="relative z-50 focus:outline-none" onClose={onClose}>
        <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
              <div className="p-8 text-center">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">جاري تحميل بيانات المستخدم...</p>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} as="form" onSubmit={handleSubmit(onSubmit)} className="relative z-50 focus:outline-none" onClose={onClose}>
      <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-600 to-red-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <PencilIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <DialogTitle as="h3" className="text-2xl font-bold">
                      تعديل بيانات المستخدم
                    </DialogTitle>
                    <p className="text-orange-100 text-sm mt-1">
                      قم بتحديث بيانات المستخدم المطلوبة
                    </p>
                  </div>
                </div>
                <Button
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <XMarkIcon className="w-6 h-6" />
                </Button>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-6">
              <EditUserForm register={register} errors={errors} />
            </div>

            {/* Footer Actions */}
            <div className="bg-gray-50 px-6 py-4 flex items-center justify-end space-x-4">
              <Button
                type='button'
                onClick={onClose}
                className="px-6 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200 font-medium"
              >
                إلغاء
              </Button>
              <Button
                type='submit'
                disabled={isLoading}
                className={`px-6 py-2.5 text-white bg-gradient-to-r from-orange-500 to-red-600 rounded-xl hover:from-orange-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-200 font-medium shadow-lg hover:shadow-xl ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>جاري التحديث...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <PencilIcon className="w-4 h-4" />
                    <span>تحديث المستخدم</span>
                  </div>
                )}
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
