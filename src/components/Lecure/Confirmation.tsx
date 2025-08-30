'use client';
import { useDeleteEmployeeMutation } from '@/lip/features/users/user';
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import toast from 'react-hot-toast';
import Spinner from '../ui/Spinner';
import { useDeleteLectureMutation } from '@/lip/features/Lecture/lecture';

interface IProps{
    name:string;
    id:number;

}
export default function ConfirmationDeleteLecture({name,id}:IProps) {
  let [isOpen, setIsOpen] = useState(false)
   const [DeleteLecture,{isLoading,isSuccess}] = useDeleteLectureMutation()
 
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

                {isLoading ? <Spinner Color="text-white"/>: 'حذف'}
      </Button>

      <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close} __demoMode>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl border border-gray-300 bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <DialogTitle as="h3" className="text-base/7 font-medium">
               تأكيد حذف محاضره: {name}
              </DialogTitle>
              <p className="mt-2 text-sm/6 ">
                هل انت متأكد من حذف المحاضره  : ({name})
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
                    DeleteLecture({id:id})
                    close()
                    if(isSuccess)return toast.success('تم حذف المحاضره بنجاح');
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
