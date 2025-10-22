'use client';
import React from 'react';
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { ShieldExclamationIcon, TrashIcon } from '@heroicons/react/24/outline';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  accountName: string;
  nationalId: string;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  accountName,
  nationalId
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel
          transition
          className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
        >
          <DialogTitle as="h3" className="text-lg font-bold text-red-600 flex items-center space-x-2">
            <ShieldExclamationIcon className="w-6 h-6" />
            <span>تأكيد حذف الحساب</span>
          </DialogTitle>
          <p className="mt-2 text-sm text-gray-700">
            هل أنت متأكد أنك تريد حذف حساب المتدرب{' '}
            <span className="font-semibold">{accountName}</span> (الرقم القومي:{' '}
            <span className="font-semibold">{nationalId}</span>)؟
            هذا الإجراء لا يمكن التراجع عنه.
          </p>

          <div className="mt-6 flex justify-end space-x-3">
            <Button
              className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={onClose}
            >
              إلغاء
            </Button>
            <Button
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              onClick={onConfirm}
            >
              <TrashIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
              حذف
            </Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
