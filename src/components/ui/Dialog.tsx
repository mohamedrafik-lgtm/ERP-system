import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { ReactNode, useState } from 'react'
import EditTypeDialog from '../TraineeFees/EditData'

interface DialogReportsProps {
    name?: string | ReactNode
}

export default function DialogReports({name}: DialogReportsProps) {
  let [isOpen, setIsOpen] = useState(false)

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
        className="bg-white/20 hover:bg-white/50 text-white py-1 px-2 rounded-md cursor-pointer"
      >
        {name}
      </Button>

      <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close} __demoMode>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
  transition
  className="w-full max-w-4xl rounded-xl bg-white/20 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
>

              {/* <DialogTitle as="h3" className="text-base/7 font-medium text-white">
                Payment successful
              </DialogTitle> */}
              <EditTypeDialog/>
              <div className="mt-4 space-x-5">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-orange-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-orange-700 data-open:bg-gray-700"
                  onClick={close}
                >
                  حفظ
                </Button>
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-red-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-red-600 data-open:bg-gray-700"
                  onClick={close}
                >
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
