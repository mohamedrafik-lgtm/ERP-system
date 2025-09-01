"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  Button,
} from "@headlessui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ProgramData } from "@/interface";
import AddProgramForm from "./AddProgramContent";
import { useAddProgramMutation } from "@/lip/features/program/program";
import toast from "react-hot-toast";
import { Plus, X, Save, Loader2 } from "lucide-react";

export default function AddProgramContentModel() {
  const [isOpen, setIsOpen] = useState(false);


  const [addProgram, { isLoading, isError, isSuccess }] = useAddProgramMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, 
  } = useForm<ProgramData>();

  const onSubmit: SubmitHandler<ProgramData> = async (data) => {
    try {
      await addProgram(data).unwrap();
          toast.success("تم الإضافة بنجاح");
      setIsOpen(false);
      reset(); 
    } catch (err) {
      console.error("فشل في إضافة البرنامج:", err);
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-2"
      >
        <Plus className="w-5 h-5" />
        إضافة برنامج
      </Button>

      <Dialog open={isOpen} as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-300">
              <form onSubmit={handleSubmit(onSubmit)} className="p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <DialogTitle as="h3" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      إضافة برنامج تدريبي جديد
                    </DialogTitle>
                    <p className="text-gray-600 text-sm mt-1">أدخل تفاصيل البرنامج التدريبي</p>
                  </div>
                  <Button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </Button>
                </div>

                {/* Form Content */}
                <div className="space-y-6">
                  <AddProgramForm register={register} errors={errors} />

                  {/* Status Messages */}
                  {isError && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                      <p className="text-red-600 text-sm flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                        حدث خطأ أثناء حفظ البرنامج
                      </p>
                    </div>
                  )}
                  {isSuccess && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                      <p className="text-green-600 text-sm flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        تم حفظ البرنامج بنجاح
                      </p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
                  <Button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium"
                  >
                    إلغاء
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        جاري الحفظ...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        حفظ البرنامج
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
