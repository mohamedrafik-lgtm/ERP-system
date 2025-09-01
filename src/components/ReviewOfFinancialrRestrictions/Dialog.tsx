"use client";
import { Button, Dialog, DialogPanel } from '@headlessui/react'
import { useState } from 'react'
import NewEntryForm from './DialogContent'

export default function FinancialModel() {
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
        className="inline-flex items-center gap-2 px-6 py-3 text-white bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 focus:outline-none focus:ring-4 focus:ring-orange-300 transition-all duration-200 rounded-xl shadow-lg hover:shadow-xl hover:scale-105">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        إضافة قيد جديد
      </Button>

      <Dialog open={isOpen} as="div" className="relative z-50 focus:outline-none" onClose={close} __demoMode>
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-4xl transform overflow-hidden rounded-3xl bg-gradient-to-br from-white to-gray-50 p-8 text-right align-middle shadow-2xl transition-all border border-gray-100"
            >
              <div className="flex items-center justify-between mb-6">
                <Dialog.Title as="h3" className="text-2xl font-bold leading-6 text-gray-900">
                  إضافة قيد مالي جديد
                </Dialog.Title>
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              
              <NewEntryForm/>
              
              <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
                <Button
                  className="px-6 py-3 text-sm font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-gray-300 transition-all duration-200 hover:scale-105"
                  onClick={close}
                >
                  إغلاق
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}
