"use client";

import { Fragment, useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  Listbox,
} from "@headlessui/react";
import { useForm } from "react-hook-form";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { FinancialAccount, Program } from "@/interface";
import { useAddFeesMutation } from "@/lip/features/Fees/Fees";
import toast from "react-hot-toast";

export enum IFeesType {
  TUITION = "TUITION",
  SERVICES = "SERVICES",
  TRAIN = "TRAIN",
  ING = "ING",
  ADDITIONAL = "ADDITIONAL",
}

const FeesTypeArMap: Record<IFeesType, string> = {
  TUITION: "الرسوم الدراسية",
  SERVICES: "الخدمات",
  TRAIN: "التدريب",
  ING: "الدعم",
  ADDITIONAL: "إضافية",
};

export interface ITraineeFees {
  name: string;
  amount: number;
  type: IFeesType;
  academicYear: string;
  allowMultipleApply: boolean;
  programId: number;
  safeId: string;
}

interface FeesDialogProps {
  isOpen: boolean;
  onClose: () => void;
  programs: Program[];
  safes: FinancialAccount[];
}

export default function FeesDialog({
  isOpen,
  onClose,
  programs,
  safes,
}: FeesDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ITraineeFees>({
    defaultValues: {
      name: "",
      amount: 0,
      type: IFeesType.TUITION,
      academicYear: "",
      allowMultipleApply: false,
      programId: 0,
      safeId: "",
    },
  });

  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [selectedSafe, setSelectedSafe] = useState<FinancialAccount | null>(
    null
  );

  const [AddFees, { isLoading }] = useAddFeesMutation();

  const onSubmit = async (data: ITraineeFees) => {
    try {
      await AddFees(data).unwrap();
      toast.success("تم إضافة الرسم بنجاح!");
      onClose();
      reset();
      setSelectedProgram(null);
      setSelectedSafe(null);
    } catch (error) {
      toast.error("حدث خطأ أثناء إضافة الرسم!");
    }
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-3xl max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 rounded-3xl bg-gradient-to-br from-white to-gray-50 p-8 shadow-2xl border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                    <div>
                      <DialogTitle className="text-2xl font-bold text-gray-900">
                        إضافة رسم للمتدرب
                      </DialogTitle>
                      <p className="text-gray-600 mt-1">أدخل تفاصيل الرسم الجديد</p>
                    </div>
                  </div>
                </div>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* اسم الرسم */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-800">
                        اسم الرسم
                      </label>
                      <input
                        {...register("name", { required: "الاسم مطلوب" })}
                        className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 bg-white shadow-sm focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-200"
                        placeholder="مثلاً رسوم تسجيل"
                      />
                      {errors.name && (
                        <span className="text-red-500 text-sm font-medium">
                          {errors.name.message}
                        </span>
                      )}
                    </div>

                    {/* المبلغ */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-800">
                        المبلغ
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          {...register("amount", {
                            required: "المبلغ مطلوب",
                            valueAsNumber: true,
                          })}
                          className="w-full px-4 py-4 pl-12 rounded-xl border-2 border-gray-200 bg-white shadow-sm focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-200"
                          placeholder="0.00"
                        />
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                          ر.س
                        </div>
                      </div>
                      {errors.amount && (
                        <span className="text-red-500 text-sm font-medium">
                          {errors.amount.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* نوع الرسم */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-800">
                        نوع الرسم
                      </label>
                      <div className="relative">
                        <select
                          {...register("type", { required: "نوع الرسم مطلوب" })}
                          className="w-full appearance-none rounded-xl border-2 border-gray-200 bg-white px-4 py-4 pr-10 shadow-sm focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-200"
                        >
                          {Object.values(IFeesType).map((type) => (
                            <option key={type} value={type}>
                              {FeesTypeArMap[type]}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                          <ChevronUpDownIcon className="h-5 w-5" />
                        </div>
                      </div>
                      {errors.type && (
                        <span className="text-red-500 text-sm font-medium">
                          {errors.type.message}
                        </span>
                      )}
                    </div>

                    {/* السنة الأكاديمية */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-800">
                        السنة الأكاديمية
                      </label>
                      <input
                        {...register("academicYear", {
                          required: "السنة الأكاديمية مطلوبة",
                        })}
                        className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 bg-white shadow-sm focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-200"
                        placeholder="مثلاً 2024/2025"
                      />
                      {errors.academicYear && (
                        <span className="text-red-500 text-sm font-medium">
                          {errors.academicYear.message}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* البرنامج */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-800">
                      البرنامج التدريبي
                    </label>
                    <Listbox
                      value={selectedProgram}
                      onChange={(value) => {
                        setSelectedProgram(value);
                        setValue("programId", value?.id || 0);
                      }}
                    >
                      <div className="relative">
                        <Listbox.Button className="relative w-full cursor-pointer rounded-xl border-2 border-gray-200 bg-white py-4 pl-3 pr-10 text-right shadow-sm hover:border-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-200">
                          <span className="block truncate text-gray-900">
                            {selectedProgram?.nameAr || "اختر برنامجاً"}
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
                          </span>
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-xl border border-gray-200 bg-white py-2 text-base shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {programs?.length > 0 ? (
                              programs.map((program) => (
                                <Listbox.Option
                                  key={program.id}
                                  value={program}
                                  className={({ active }) =>
                                    `relative cursor-pointer select-none py-3 pl-10 pr-4 mx-2 rounded-lg ${
                                      active
                                        ? "bg-orange-50 text-orange-900"
                                        : "text-gray-900 hover:bg-gray-50"
                                    }`
                                  }
                                >
                                  {({ selected }) => (
                                    <>
                                      <span
                                        className={`block truncate ${
                                          selected ? "font-semibold" : "font-normal"
                                        }`}
                                      >
                                        {program.nameAr}
                                      </span>
                                      {selected && (
                                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-orange-600">
                                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                          </svg>
                                        </span>
                                      )}
                                    </>
                                  )}
                                </Listbox.Option>
                              ))
                            ) : (
                              <div className="px-4 py-3 text-gray-500 text-center">
                                لا توجد برامج متاحة
                              </div>
                            )}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                  </div>

                  {/* الخزنة */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-800">
                      الخزنة
                    </label>
                    <Listbox
                      value={selectedSafe}
                      onChange={(value) => {
                        setSelectedSafe(value);
                        setValue("safeId", value?.id || "");
                      }}
                    >
                      <div className="relative">
                        <Listbox.Button className="relative w-full cursor-pointer rounded-xl border-2 border-gray-200 bg-white py-4 pl-3 pr-10 text-right shadow-sm hover:border-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-200">
                          <span className="block truncate text-gray-900">
                            {selectedSafe?.name || "اختر خزنة"}
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
                          </span>
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-xl border border-gray-200 bg-white py-2 text-base shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {safes?.length > 0 ? (
                              safes.map((safe) => (
                                <Listbox.Option
                                  key={safe.id}
                                  value={safe}
                                  className={({ active }) =>
                                    `relative cursor-pointer select-none py-3 pl-10 pr-4 mx-2 rounded-lg ${
                                      active
                                        ? "bg-orange-50 text-orange-900"
                                        : "text-gray-900 hover:bg-gray-50"
                                    }`
                                  }
                                >
                                  {({ selected }) => (
                                    <>
                                      <span
                                        className={`block truncate ${
                                          selected ? "font-semibold" : "font-normal"
                                        }`}
                                      >
                                        {safe.name}
                                      </span>
                                      {selected && (
                                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-orange-600">
                                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                          </svg>
                                        </span>
                                      )}
                                    </>
                                  )}
                                </Listbox.Option>
                              ))
                            ) : (
                              <div className="px-4 py-3 text-gray-500 text-center">
                                لا توجد خزائن متاحة
                              </div>
                            )}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                  </div>

                  {/* السماح بالتكرار */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        {...register("allowMultipleApply")}
                        className="h-5 w-5 text-orange-600 bg-white border-2 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
                      />
                      <label className="text-sm font-medium text-gray-800">السماح بالتكرار</label>
                    </div>
                  </div>

                  {/* الأزرار */}
                  <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        reset();
                        setSelectedProgram(null);
                        setSelectedSafe(null);
                      }}
                      className="px-6 py-3 text-sm font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-gray-300 transition-all duration-200 hover:scale-105"
                    >
                      إلغاء
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`px-8 py-3 text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-red-600 rounded-xl hover:from-orange-600 hover:to-red-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-orange-300 transition-all duration-200 hover:scale-105 shadow-lg flex items-center gap-2 ${
                        isLoading ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          جاري الحفظ...
                        </div>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          حفظ الرسم
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
