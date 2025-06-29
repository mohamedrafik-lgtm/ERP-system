'use client';
import { useDeleteEmployeeMutation } from '@/lip/features/users/user';
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import toast from 'react-hot-toast';
import Spinner from '../ui/Spinner';

interface IProps{
    name:string;
    id:string;
    email:string
}
export default function ConfirmationModal({email,name,id}:IProps) {
  let [isOpen, setIsOpen] = useState(false)
   const [DeleteUser,{isLoading,isSuccess}] = useDeleteEmployeeMutation()
 
  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

  return (
    <>
      <Button
        onClick={open}
        className="rounded-md bg-red-500 px-2 py-1 text-sm font-medium text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-red-600"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21a48.108 48.108 0 00-3.478-.397M5.25 6.187a48.11 48.11 0 013.478-.397m7.5 0V4.874c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916M3 6.187c.34-.059.68-.114 1.022-.165M4.772 5.79L6 18a2.25 2.25 0 002.244 2.077h7.832A2.25 2.25 0 0018.16 18L19.5 7.125" />
                </svg>
      </Button>

      <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close} __demoMode>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl border border-gray-300 bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <DialogTitle as="h3" className="text-base/7 font-medium">
                تأكيد حذف : {name}
              </DialogTitle>
              <p className="mt-2 text-sm/6 ">
                هل انت متأكد من حذف المستخدم ({email})
              </p>
              <div className="mt-4 space-x-5">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-green-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-green-600 data-open:bg-green-700"
                  onClick={close}
                >
                  الغاء
                </Button>
                <Button
                  className={`inline-flex ${isLoading ? "cursor-not-allowed":''} items-center gap-2 rounded-md bg-red-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-red-600 data-open:bg-red-700`}
                  onClick={()=>{
                    DeleteUser({id:id})
                    close()
                    if(isSuccess)return toast.success('تم حذف الموظف بنجاح');
                }}
                >
                  {isLoading ? <Spinner Color={'text-white'}/> : 'حذف'}
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}
