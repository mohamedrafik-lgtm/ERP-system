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

  const [AddFees] = useAddFeesMutation()

  const onSubmit = (data: ITraineeFees) => {
    AddFees(data);
    onClose();
    reset();
    setSelectedProgram(null);
    setSelectedSafe(null);
  };

  return (
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
            <DialogPanel className="w-full max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 rounded-2xl bg-white p-6 shadow-2xl">
              <DialogTitle className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">
                إضافة رسم للمتدرب
              </DialogTitle>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {/* اسم الرسم */}
                <div>
                  <label className="block mb-1 font-medium text-gray-700">
                    اسم الرسم
                  </label>
                  <input
                    {...register("name", { required: "الاسم مطلوب" })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-500 transition"
                    placeholder="مثلاً رسوم تسجيل"
                  />
                  {errors.name && (
                    <span className="text-red-500 text-sm">
                      {errors.name.message}
                    </span>
                  )}
                </div>

                {/* المبلغ */}
                <div>
                  <label className="block mb-1 font-medium text-gray-700">
                    المبلغ
                  </label>
                  <input
                    type="number"
                    {...register("amount", {
                      required: "المبلغ مطلوب",
                      valueAsNumber: true,
                    })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-500 transition"
                    placeholder="مثلاً 5000"
                  />
                  {errors.amount && (
                    <span className="text-red-500 text-sm">
                      {errors.amount.message}
                    </span>
                  )}
                </div>

                {/* نوع الرسم */}
                <div>
                  <label className="block mb-1 font-medium text-gray-700">
                    نوع الرسم
                  </label>
                  <div className="relative">
                    <select
                      {...register("type", { required: "نوع الرسم مطلوب" })}
                      className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 shadow-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-500 transition"
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
                    <span className="text-red-500 text-sm">
                      {errors.type.message}
                    </span>
                  )}
                </div>

                {/* السنة الأكاديمية */}
                <div>
                  <label className="block mb-1 font-medium text-gray-700">
                    السنة الأكاديمية
                  </label>
                  <input
                    {...register("academicYear", {
                      required: "السنة الأكاديمية مطلوبة",
                    })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-500 transition"
                    placeholder="مثلاً 2024/2025"
                  />
                  {errors.academicYear && (
                    <span className="text-red-500 text-sm">
                      {errors.academicYear.message}
                    </span>
                  )}
                </div>

                {/* البرنامج */}
                <div className="col-span-2">
                  <label className="block mb-1 font-medium text-gray-700">
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
                      <Listbox.Button className="relative w-full cursor-pointer rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-10 text-right shadow-sm hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
                        <span className="block truncate">
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
                        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded border border-gray-200 bg-white py-1 text-base shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {programs?.length > 0 ? (
                            programs.map((program) => (
                              <Listbox.Option
                                key={program.id}
                                value={program}
                                className={({ active }) =>
                                  `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                                    active
                                      ? "bg-blue-50 text-blue-900"
                                      : "text-gray-900"
                                  }`
                                }
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected ? "font-medium" : "font-normal"
                                      }`}
                                    >
                                      {program.nameAr}
                                    </span>
                                    {selected && (
                                      <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-600">
                                        ✓
                                      </span>
                                    )}
                                  </>
                                )}
                              </Listbox.Option>
                            ))
                          ) : (
                            <div className="px-4 py-2 text-gray-500">
                              لا توجد برامج متاحة
                            </div>
                          )}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>
                </div>

                {/* الخزنة */}
                <div className="col-span-2">
                  <label className="block mb-1 font-medium text-gray-700">
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
                      <Listbox.Button className="relative w-full cursor-pointer rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-10 text-right shadow-sm hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
                        <span className="block truncate">
                          {selectedSafe?.name ||
                            selectedSafe?.name ||
                            "اختر خزنة"}
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
                        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded border border-gray-200 bg-white py-1 text-base shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {safes?.length > 0 ? (
                            safes.map((safe) => (
                              <Listbox.Option
                                key={safe.id}
                                value={safe}
                                className={({ active }) =>
                                  `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                                    active
                                      ? "bg-blue-50 text-blue-900"
                                      : "text-gray-900"
                                  }`
                                }
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected ? "font-medium" : "font-normal"
                                      }`}
                                    >
                                      {safe.name || safe.name}
                                    </span>
                                    {selected && (
                                      <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-600">
                                        ✓
                                      </span>
                                    )}
                                  </>
                                )}
                              </Listbox.Option>
                            ))
                          ) : (
                            <div className="px-4 py-2 text-gray-500">
                              لا توجد خزائن متاحة
                            </div>
                          )}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>
                </div>

                {/* السماح بالتكرار */}
                <div className="flex items-center gap-2 col-span-2">
                  <input
                    type="checkbox"
                    {...register("allowMultipleApply")}
                    className="h-4 w-4"
                  />
                  <label>السماح بالتكرار</label>
                </div>

                {/* الأزرار */}
                <div className="flex justify-end gap-2 col-span-2 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      reset();
                      setSelectedProgram(null);
                      setSelectedSafe(null);
                    }}
                    className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    حفظ
                  </button>
                </div>
              </form>
            </DialogPanel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
