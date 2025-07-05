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
import { useAddProgramMutation } from "@/lip/features/program/program"; // تأكد من المسار الصحيح
import toast from "react-hot-toast";

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
        className="text-white px-7 py-2 bg-orange-600 hover:bg-orange-700 rounded-xl"
      >
        اضف برنامج
      </Button>

      <Dialog open={isOpen} as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full max-w-2xl space-y-7 rounded-xl bg-white/5 p-6 backdrop-blur-2xl"
            >
              <DialogTitle as="h3" className="text-3xl font-medium">
                اضافه برنامج تدريبي
              </DialogTitle>

              <AddProgramForm register={register} errors={errors} />

              {isError && (
                <p className="text-red-500 text-sm">حدث خطأ أثناء حفظ البرنامج.</p>
              )}
              {isSuccess && (
                <p className="text-green-500 text-sm">تم حفظ البرنامج بنجاح.</p>
              )}

              <div className="mt-4 space-x-5">
                <Button
                  type="button"
                  className="bg-red-500 text-white px-3 py-1.5 rounded"
                  onClick={() => setIsOpen(false)}
                >
                  اغلاق
                </Button>
                <Button
                  type="submit"
                  className="bg-green-500 text-white px-3 py-1.5 rounded"
                  disabled={isLoading}
                >
                  {isLoading ? "جاري الحفظ..." : "حفظ"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Dialog>
    </>
  );
}
