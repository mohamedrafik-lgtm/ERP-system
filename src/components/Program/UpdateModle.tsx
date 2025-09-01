"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  Button,
} from "@headlessui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ProgramData } from "@/interface";
import AddProgramForm from "./AddProgramContent";
import { useUpdateProgramMutation } from "@/lip/features/program/program";
import toast from "react-hot-toast";
import { Edit, X, Save, Loader2 } from "lucide-react";

interface IProps {
  id: number;
  data: {
    nameAr: string;
    nameEn: string;
    price: number;
    description: string;
  };
}

export default function UpdateProgramContentModel({ id, data }: IProps) {
  const [isOpen, setIsOpen] = useState(false);

  const [UpdateProgram, { isLoading, isError, isSuccess }] = useUpdateProgramMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProgramData>();

  // ✅ عند فتح المودال، نعمل reset بالقيم الحالية
  useEffect(() => {
    if (isOpen) {
      reset(data); // ← هنا يتم إدخال القيم الحالية كقِيَم ابتدائية
    }
  }, [isOpen, data, reset]);

  const onSubmit: SubmitHandler<ProgramData> = async (formData) => {
    try {
      await UpdateProgram({ id, data: formData }).unwrap();
      toast.success("تم تعديل البرنامج");
      setIsOpen(false);
      reset();
    } catch (err) {
      console.error("فشل في تعديل البرنامج:", err);
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors duration-200"
        title="تعديل البرنامج"
      >
        <Edit className="w-4 h-4" />
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
                    <DialogTitle as="h3" className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                      تعديل البرنامج التدريبي
                    </DialogTitle>
                    <p className="text-gray-600 text-sm mt-1">قم بتعديل تفاصيل البرنامج</p>
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
                    className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-300 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        جاري الحفظ...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        حفظ التعديلات
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
