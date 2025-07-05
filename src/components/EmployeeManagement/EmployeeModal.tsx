'use client';
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import AddUserForm, { FormValues } from './EmployeeModalContent'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAddEmployeeMutation } from '@/lip/features/users/user';
import toast from 'react-hot-toast';

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
  } = useForm<FormValues>();

   const [AddEmployee,{isLoading,isError,isSuccess}] = useAddEmployeeMutation()
    const onSubmit: SubmitHandler<FormValues> = (data) => {
        AddEmployee(data);
        close()
        reset()
        if(isSuccess) return toast.success('تم اضافه الموظف بنجاح');
    };
  return (
    <>
      <Button
        onClick={open}
        className="text-white px-7 py-2 bg-orange-600 hover:bg-orange-700 rounded-xl focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-black/30"
        >اضافه موظف +
        
      </Button>

      <Dialog open={isOpen} as="form" onSubmit={handleSubmit(onSubmit)} className="relative z-10 focus:outline-none" onClose={close} __demoMode>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full space-y-5 border border-gray-300 max-w-3xl rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <DialogTitle as="h3" className="text-3xl font-medium ">
                اضافه مستخدم
              </DialogTitle>
                

                <AddUserForm groups={['ADMIN','USER']}register={register} errors={errors} />
              <div className="mt-4 flex space-x-6">
                <Button
                  type='button'
                  className="inline-flex items-center gap-2 rounded-md bg-red-500 px-5 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                  onClick={close}
                >
                  اغلاق
                </Button>
                <Button
                  type='submit'
                  className={`inline-flex items-center ${isLoading ? "cursor-not-allowed":''} gap-2 rounded-md bg-green-500 px-5 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-green-600 data-open:bg-green-700`}
                >
                  اضافه
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}
