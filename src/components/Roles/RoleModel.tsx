"use client";
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { ReactNode, useState } from 'react'
import { Input } from '../input';

interface IProps{
  btContent:ReactNode,
  className?:string,
  title:string
}

export default function RoleModel({title,btContent,className='text-white px-7 py-2 bg-orange-600 hover:bg-orange-700 rounded-xl focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white'}:IProps) {
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
        className={className}
      >
        {btContent}     
     </Button>

      <Dialog open={isOpen} as="form" className="relative z-10 focus:outline-none" onClose={close} __demoMode>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md space-y-7 border border-gray-300 rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <DialogTitle as="h3" className="text-3xl font-medium">
                {title}
              </DialogTitle>
              <div className='flex flex-col space-y-3'>
                 <label htmlFor="RoleNameId" className=' text-xl'>الاسم</label>
                 <Input type="text"  name='RoleName' id='RoleNameId' placeholder='اكتب اسم الصلاحيه التي تريج انشائها' 
                 className='text-black/50 w-full rounded-lg border-0 bg-white'/>
              </div>
              <div className="mt-4 space-x-5">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-red-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-red-600 data-open:bg-red-700"
                  onClick={close}
                >
                  اغلاق
                </Button>
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-green-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-green-600 data-open:bg-white/40"
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
