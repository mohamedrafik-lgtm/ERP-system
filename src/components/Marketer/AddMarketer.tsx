"use client";

import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import { useAddMarketerMutation } from "@/lip/features/Marketer/Marketer";
import toast from "react-hot-toast";

interface CreateMarketerDto {
  name: string;
  primaryPhone: string;
  secondaryPhone: string;
  photo: FileList | undefined;
}

export default function AddMarketer() {
  const [isOpen, setIsOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [
    AddMarketer,
    { isLoading },
  ] = useAddMarketerMutation();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<CreateMarketerDto>();

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
    reset();
    setPreviewUrl(null);
  }

  const onSubmit = async (data: CreateMarketerDto) => {
    const marketerData = {
      name: data.name,
      primaryPhone: data.primaryPhone,
      secondaryPhone: data.secondaryPhone,
      photoUrl: data.photo?.[0]?.name,
    };
  
    try {
      await AddMarketer(marketerData).unwrap();
      toast.success("تم إضافة المسوق بنجاح!");
      close();
    } catch (error) {
      console.error("فشل الإضافة:", error);
      toast.error("حدث خطأ أثناء إضافة المسوق");
    }
  };

  const selectedFile = watch("photo");

  useEffect(() => {
    if (selectedFile && selectedFile.length > 0) {
      const file = selectedFile[0];
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  }, [selectedFile]);

  const removeImage = () => {
    setPreviewUrl(null);
    setValue("photo", undefined, { shouldValidate: true });
  };

  return (
    <>
      <Button
        onClick={open}
        className="rounded-md bg-orange-600 px-6 py-2 text-sm font-semibold text-white shadow-md hover:bg-orange-700 transition-colors"
      >
        اضافه مسوق
      </Button>

      <Dialog open={isOpen} as="div" className="relative z-50" onClose={close}>
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-4xl rounded-2xl bg-white p-8 shadow-2xl border border-gray-200">
            <DialogTitle className="text-xl font-bold text-gray-800 mb-6 text-center">
              إضافة مسوق جديد
            </DialogTitle>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">
                  اسم المسوق <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: "اسم المسوق مطلوب" })}
                  placeholder="ادخل اسم المسوق"
                  className="w-full rounded-lg border border-gray-300 p-3 focus:border-orange-500 focus:ring focus:ring-orange-200 outline-none transition"
                />
                {errors.name && (
                  <p className="text-red-600 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Primary Phone */}
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">
                  رقم الهاتف الأساسي <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  {...register("primaryPhone", {
                    required: "رقم الهاتف الأساسي مطلوب",
                  })}
                  placeholder="ادخل رقم الهاتف الأساسي"
                  className="w-full rounded-lg border border-gray-300 p-3 focus:border-orange-500 focus:ring focus:ring-orange-200 outline-none transition"
                />
                {errors.primaryPhone && (
                  <p className="text-red-600 text-xs mt-1">
                    {errors.primaryPhone.message}
                  </p>
                )}
              </div>

              {/* Secondary Phone */}
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">
                  رقم الهاتف الثانوي <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  {...register("secondaryPhone", {
                    required: "رقم الهاتف الثانوي مطلوب",
                  })}
                  placeholder="ادخل رقم الهاتف الثانوي"
                  className="w-full rounded-lg border border-gray-300 p-3 focus:border-orange-500 focus:ring focus:ring-orange-200 outline-none transition"
                />
                {errors.secondaryPhone && (
                  <p className="text-red-600 text-xs mt-1">
                    {errors.secondaryPhone.message}
                  </p>
                )}
              </div>

              {/* Photo Upload */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  صورة المسوق <span className="text-red-500">*</span>
                </label>

                {!previewUrl ? (
                  <label
                    htmlFor="photoUpload"
                    className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-orange-500 transition"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <svg
                        className="w-10 h-10 mb-2 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16V4m0 0L3 8m4-4l4 4M17 16v4m0 0l-4-4m4 4l4-4"
                        />
                      </svg>
                      <p className="text-gray-500 text-sm">
                        اسحب وأفلت الصورة هنا أو اضغط لاختيار صورة
                      </p>
                    </div>
                    <input
                      id="photoUpload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      {...register("photo", {
                        required: "صورة المسوق مطلوبة",
                      })}
                    />
                  </label>
                ) : (
                  <div className="relative w-32 h-32 mx-auto">
                    <img
                      src={previewUrl}
                      alt="معاينة الصورة"
                      className="w-32 h-32 rounded-full object-cover border border-gray-300 shadow-md"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      title="حذف الصورة"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}

                {errors.photo && (
                  <p className="text-red-600 text-xs mt-2 text-center">
                    {errors.photo.message}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={close}
                  disabled={isLoading}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition disabled:opacity-50"
                >
                  الغاء
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center gap-2 px-6 py-2 rounded-lg bg-orange-600 text-white font-semibold hover:bg-orange-700 transition shadow-sm disabled:opacity-50"
                >
                  {isLoading && (
                    <svg
                      className="w-4 h-4 animate-spin text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
                      ></path>
                    </svg>
                  )}
                  {isLoading ? "جارٍ الحفظ..." : "حفظ المسوق"}
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
