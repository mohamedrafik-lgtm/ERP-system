"use client";
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { ReactNode, useState } from 'react'
import AddQuestionForm from './AddQuestionContetn';

interface IProps{
  ButtonContent  : ReactNode
}
export default function AddQuestionModal({ButtonContent}:IProps) {
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
            {ButtonContent}
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
