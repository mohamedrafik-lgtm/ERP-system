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
              <DialogPanel className="w-full max-w-4xl max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 rounded-3xl bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/30 p-10 shadow-2xl border border-white/20 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/25">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-2">
                        إضافة رسم للمتدرب
                      </DialogTitle>
                      <p className="text-lg text-gray-600 font-medium">أدخل تفاصيل الرسم الجديد</p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>نموذج تفاعلي</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>حفظ آمن</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* اسم الرسم */}
                    <div className="space-y-3">
                      <label className="block text-sm font-bold text-gray-800 flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        اسم الرسم
                      </label>
                      <div className="relative group">
                        <input
                          {...register("name", { required: "الاسم مطلوب" })}
                          className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-gray-700 placeholder-gray-500 group-hover:shadow-lg"
                          placeholder="مثلاً رسوم تسجيل"
                        />
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                          <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                      </div>
                      {errors.name && (
                        <span className="text-red-500 text-sm font-medium flex items-center gap-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {errors.name.message}
                        </span>
                      )}
                    </div>

                    {/* المبلغ */}
                    <div className="space-y-3">
                      <label className="block text-sm font-bold text-gray-800 flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        المبلغ
                      </label>
                      <div className="relative group">
                        <input
                          type="number"
                          {...register("amount", {
                            required: "المبلغ مطلوب",
                            valueAsNumber: true,
                          })}
                          className="w-full px-6 py-4 pl-16 rounded-2xl border-2 border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 shadow-sm focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 text-gray-700 placeholder-gray-500 group-hover:shadow-lg"
                          placeholder="0.00"
                        />
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold text-lg">
                          ر.س
                        </div>
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                          <svg className="w-5 h-5 text-gray-400 group-hover:text-green-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                          </svg>
                        </div>
                      </div>
                      {errors.amount && (
                        <span className="text-red-500 text-sm font-medium flex items-center gap-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {errors.amount.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* نوع الرسم */}
                    <div className="space-y-3">
                      <label className="block text-sm font-bold text-gray-800 flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        نوع الرسم
                      </label>
                      <div className="relative group">
                        <select
                          {...register("type", { required: "نوع الرسم مطلوب" })}
                          className="w-full appearance-none rounded-2xl border-2 border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 pr-12 shadow-sm focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 text-gray-700 group-hover:shadow-lg"
                        >
                          {Object.values(IFeesType).map((type) => (
                            <option key={type} value={type}>
                              {FeesTypeArMap[type]}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                          <ChevronUpDownIcon className="h-6 w-6 group-hover:text-purple-500 transition-colors duration-200" />
                        </div>
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                          <svg className="w-5 h-5 text-gray-400 group-hover:text-purple-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                        </div>
                      </div>
                      {errors.type && (
                        <span className="text-red-500 text-sm font-medium flex items-center gap-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {errors.type.message}
                        </span>
                      )}
                    </div>

                    {/* السنة الأكاديمية */}
                    <div className="space-y-3">
                      <label className="block text-sm font-bold text-gray-800 flex items-center gap-2">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                        السنة الأكاديمية
                      </label>
                      <div className="relative group">
                        <input
                          {...register("academicYear", {
                            required: "السنة الأكاديمية مطلوبة",
                          })}
                          className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 text-gray-700 placeholder-gray-500 group-hover:shadow-lg"
                          placeholder="مثلاً 2024/2025"
                        />
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                          <svg className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      </div>
                      {errors.academicYear && (
                        <span className="text-red-500 text-sm font-medium flex items-center gap-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {errors.academicYear.message}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* البرنامج */}
                  <div className="space-y-3">
                    <label className="block text-sm font-bold text-gray-800 flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      البرنامج التدريبي
                    </label>
                    <Listbox
                      value={selectedProgram}
                      onChange={(value) => {
                        setSelectedProgram(value);
                        setValue("programId", value?.id || 0);
                      }}
                    >
                      <div className="relative group">
                        <Listbox.Button className="relative w-full cursor-pointer rounded-2xl border-2 border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 py-4 pl-3 pr-12 text-right shadow-sm hover:border-emerald-400 focus:outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all duration-300 group-hover:shadow-lg">
                          <span className="block truncate text-gray-900 font-medium">
                            {selectedProgram?.nameAr || "اختر برنامجاً"}
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                            <ChevronUpDownIcon className="h-6 w-6 text-gray-400 group-hover:text-emerald-500 transition-colors duration-200" />
                          </span>
                          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                            <svg className="w-5 h-5 text-gray-400 group-hover:text-emerald-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                          </div>
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-2xl border border-gray-200 bg-white/95 backdrop-blur-sm py-2 text-base shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {programs?.length > 0 ? (
                              programs.map((program) => (
                                <Listbox.Option
                                  key={program.id}
                                  value={program}
                                  className={({ active }) =>
                                    `relative cursor-pointer select-none py-4 pl-12 pr-4 mx-3 rounded-xl transition-all duration-200 ${
                                      active
                                        ? "bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-900 shadow-md"
                                        : "text-gray-900 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100"
                                    }`
                                  }
                                >
                                  {({ selected }) => (
                                    <>
                                      <span
                                        className={`block truncate font-medium ${
                                          selected ? "font-bold" : "font-normal"
                                        }`}
                                      >
                                        {program.nameAr}
                                      </span>
                                      {selected && (
                                        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-emerald-600">
                                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                          </svg>
                                        </span>
                                      )}
                                    </>
                                  )}
                                </Listbox.Option>
                              ))
                            ) : (
                              <div className="px-6 py-4 text-gray-500 text-center bg-gray-50 rounded-xl mx-3">
                                <div className="flex items-center justify-center gap-2">
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  لا توجد برامج متاحة
                                </div>
                              </div>
                            )}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                  </div>

                  {/* الخزنة */}
                  <div className="space-y-3">
                    <label className="block text-sm font-bold text-gray-800 flex items-center gap-2">
                      <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                      الخزنة
                    </label>
                    <Listbox
                      value={selectedSafe}
                      onChange={(value) => {
                        setSelectedSafe(value);
                        setValue("safeId", value?.id || "");
                      }}
                    >
                      <div className="relative group">
                        <Listbox.Button className="relative w-full cursor-pointer rounded-2xl border-2 border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 py-4 pl-3 pr-12 text-right shadow-sm hover:border-amber-400 focus:outline-none focus:ring-4 focus:ring-amber-100 focus:border-amber-500 transition-all duration-300 group-hover:shadow-lg">
                          <span className="block truncate text-gray-900 font-medium">
                            {selectedSafe?.name || "اختر خزنة"}
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                            <ChevronUpDownIcon className="h-6 w-6 text-gray-400 group-hover:text-amber-500 transition-colors duration-200" />
                          </span>
                          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                            <svg className="w-5 h-5 text-gray-400 group-hover:text-amber-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                          </div>
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-2xl border border-gray-200 bg-white/95 backdrop-blur-sm py-2 text-base shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {safes?.length > 0 ? (
                              safes.map((safe) => (
                                <Listbox.Option
                                  key={safe.id}
                                  value={safe}
                                  className={({ active }) =>
                                    `relative cursor-pointer select-none py-4 pl-12 pr-4 mx-3 rounded-xl transition-all duration-200 ${
                                      active
                                        ? "bg-gradient-to-r from-amber-50 to-amber-100 text-amber-900 shadow-md"
                                        : "text-gray-900 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100"
                                    }`
                                  }
                                >
                                  {({ selected }) => (
                                    <>
                                      <span
                                        className={`block truncate font-medium ${
                                          selected ? "font-bold" : "font-normal"
                                        }`}
                                      >
                                        {safe.name}
                                      </span>
                                      {selected && (
                                        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-amber-600">
                                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                          </svg>
                                        </span>
                                      )}
                                    </>
                                  )}
                                </Listbox.Option>
                              ))
                            ) : (
                              <div className="px-6 py-4 text-gray-500 text-center bg-gray-50 rounded-xl mx-3">
                                <div className="flex items-center justify-center gap-2">
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  لا توجد خزائن متاحة
                                </div>
                              </div>
                            )}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                  </div>

                  {/* السماح بالتكرار */}
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <input
                          type="checkbox"
                          {...register("allowMultipleApply")}
                          className="h-6 w-6 text-blue-600 bg-white border-2 border-gray-300 rounded-lg focus:ring-blue-500 focus:ring-2 transition-all duration-200"
                        />
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 transition-opacity duration-200 peer-checked:opacity-10"></div>
                      </div>
                      <div>
                        <label className="text-sm font-bold text-gray-800 cursor-pointer">السماح بالتكرار</label>
                        <p className="text-xs text-gray-500 mt-1">تمكين تطبيق الرسم أكثر من مرة</p>
                      </div>
                    </div>
                  </div>

                  {/* الأزرار */}
                  <div className="flex justify-end gap-6 pt-8 border-t-2 border-gray-200">
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        reset();
                        setSelectedProgram(null);
                        setSelectedSafe(null);
                      }}
                      className="px-8 py-4 text-sm font-bold text-gray-700 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl hover:from-gray-200 hover:to-gray-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-gray-300 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-3"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      إلغاء
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`px-10 py-4 text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-2xl hover:from-blue-700 hover:via-purple-700 hover:to-indigo-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl flex items-center gap-3 ${
                        isLoading ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-3">
                          <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>جاري الحفظ...</span>
                        </div>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>حفظ الرسم</span>
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
