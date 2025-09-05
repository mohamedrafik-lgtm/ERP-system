import { Button, Dialog, DialogPanel,  } from '@headlessui/react'
import { ReactNode, useState } from 'react'
import EditTypeDialog from '../TraineeFees/EditData'

interface DialogReportsProps {
    name?: string | ReactNode
}

export default function DialogReports({name}: DialogReportsProps) {
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
        className="relative inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-100 to-blue-200 hover:from-blue-200 hover:to-blue-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-300 shadow-lg hover:shadow-xl group"
      >
        {name}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </Button>

      <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close} __demoMode>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-5xl rounded-2xl bg-white/95 backdrop-blur-md p-8 shadow-2xl border border-white/40 duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">تعديل بيانات الرسم</h2>
                <p className="text-gray-600 text-center">قم بتعديل تفاصيل الرسم حسب الحاجة</p>
              </div>
              
              <EditTypeDialog/>
              
              <div className="mt-8 flex justify-center gap-4">
                <Button
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-green-500 to-green-600 px-6 py-3 text-sm font-bold text-white shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-green-200 transition-all duration-300 hover:scale-105"
                  onClick={close}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  حفظ التغييرات
                </Button>
                <Button
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-gray-500 to-gray-600 px-6 py-3 text-sm font-bold text-white shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-gray-200 transition-all duration-300 hover:scale-105"
                  onClick={close}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  إلغاء
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}
