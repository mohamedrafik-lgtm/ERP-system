'use client';
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import AddUserForm, { FormValues } from './EmployeeModalContent'
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCreateUserMutation } from '@/lip/features/users/user';
import toast from 'react-hot-toast';
import { PlusIcon, UserPlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { createUserSchema } from '@/Schema/user';

export default function AddEmployeeModal() {
  const [isOpen, setIsOpen] = useState(false)

  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

 
const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(createUserSchema)
  });

   const [createUser,{isLoading,isError,isSuccess}] = useCreateUserMutation()
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            await createUser({
                name: data.name,
                email: data.email,
                phone: data.phone,
                password: data.password,
                accountType: data.accountType as 'STAFF' | 'INSTRUCTOR',
                roleId: data.roleId
            }).unwrap();
            close();
            reset();
            toast.success('تم إضافة المستخدم بنجاح');
        } catch (error) {
            toast.error('حدث خطأ أثناء إضافة المستخدم');
        }
    };
  return (
    <>
      <Button
        onClick={open}
        className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
        >
        <UserPlusIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
        <span>إضافة موظف جديد</span>
      </Button>

      <Dialog open={isOpen} as="form" onSubmit={handleSubmit(onSubmit)} className="relative z-50 focus:outline-none" onClose={close} __demoMode>
        <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                      <UserPlusIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <DialogTitle as="h3" className="text-2xl font-bold">
                        إضافة موظف جديد
                      </DialogTitle>
                      <p className="text-blue-100 text-sm mt-1">
                        قم بإدخال بيانات الموظف الجديد
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={close}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </Button>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-6">
                <AddUserForm accountTypes={['STAFF','INSTRUCTOR']} register={register} errors={errors} />
              </div>

              {/* Footer Actions */}
              <div className="bg-gray-50 px-6 py-4 flex items-center justify-end space-x-4">
                <Button
                  type='button'
                  onClick={close}
                  className="px-6 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200 font-medium"
                >
                  إلغاء
                </Button>
                <Button
                  type='submit'
                  disabled={isLoading}
                  className={`px-6 py-2.5 text-white bg-gradient-to-r from-green-500 to-green-600 rounded-xl hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200 font-medium shadow-lg hover:shadow-xl ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>جاري الإضافة...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <PlusIcon className="w-4 h-4" />
                      <span>إضافة الموظف</span>
                    </div>
                  )}
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}
