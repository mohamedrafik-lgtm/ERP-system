"use client";
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import AddProgramForm from './AddProgramContent';

export default function AddProgramContetModel() {
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
        className="text-white px-7 py-2 bg-orange-600 hover:bg-orange-700 rounded-xl focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white"
      >
        اضاهف برنامج     
     </Button>

      <Dialog open={isOpen} as="form" className="relative z-10 focus:outline-none" onClose={close} __demoMode>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-2xl space-y-7 rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <DialogTitle as="h3" className="text-3xl font-medium text-white">
                  اضافه برنامج تدريبي
              </DialogTitle>
                
              <AddProgramForm onSubmit={(data) => {
                  console.log("Program submitted:", data)
              }}/>

              <div className="mt-4 space-x-5">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-red-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-red-600 data-open:bg-red-700"
                  onClick={close}
                >
                  اغلاق
                </Button>
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-white/20 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-green-500 data-open:bg-white/40"
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
