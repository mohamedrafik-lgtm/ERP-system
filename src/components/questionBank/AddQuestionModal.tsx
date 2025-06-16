"use client";
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import AddQuestionForm from './AddQuestionContetn';

export default function AddQuestionModal() {
  const [isOpen, setIsOpen] = useState(false)

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
        className="bg-orange-600 text-white px-5 py-2 rounded hover:bg-orange-700 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-orange-800"
      >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
            </svg>
      </Button>

      <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close} __demoMode>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-4xl rounded-xl bg-white/20 p-6 space-y-3 backdrop-blur-xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <DialogTitle as="h3" className="text-2xl font-medium text-white">
                  اضافة سؤال جديد
              </DialogTitle>
                 <AddQuestionForm
                 onSubmit={(data) => {
                 console.log("Question:", data);
                 }}/>
              <div className="mt-4 space-x-5 mr-10">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-red-500 px-8 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-red-600 data-open:bg-red-700"
                  onClick={close}
                >
                  اغلاق
                </Button>
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-green-500 px-8 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-green-600 data-open:bg-green-700"
                  onClick={close}
                >
                  حفظ
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}
