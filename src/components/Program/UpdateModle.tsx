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
        className="text-white py-1 px-2 bg-green-500 hover:bg-green-600 rounded-md"
      >
        تعديل
      </Button>

      <Dialog open={isOpen} as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full max-w-2xl space-y-7 rounded-xl bg-white/5 p-6 backdrop-blur-2xl"
            >
              <DialogTitle as="h3" className="text-3xl font-medium">
                تعديل برنامج تدريبي
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
