"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Listbox, Transition } from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";
import toast from "react-hot-toast";
import {
  IUpdateTrainingContentRequest,
  Semester,
  Year,
} from "@/interface";
import {
  useGetContentQuery,
  useUpdateTrainingContentMutation,
} from "@/lip/features/TraningContetn/Traning";
import { useGetProgramsQuery } from "@/lip/features/program/program";
import { useGetUserEmployeeQuery } from "@/lip/features/users/user";
import { Fragment } from "react";
import { useParams, useRouter } from "next/navigation";

interface IUserOption {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface Option {
  label: string;
  value: string;
  key?: string;
}

export default function EditTrainingContent() {
  const params = useParams();
  const contentId = Number(params.id);
   const router = useRouter();

  // ✅ Get content data
  const { data: contentData, isLoading: isLoadingContent } =
    useGetContentQuery({ id: contentId });
    console.log(contentData)
  const [updateTrainingContent, { isLoading }] =
    useUpdateTrainingContentMutation();

  const { data: programs = [] } = useGetProgramsQuery();
  const { data: users = [] } = useGetUserEmployeeQuery();

  const instructorOptions: Option[] = users?.map(
    (user: IUserOption, index) => ({
      label: user.email,
      value: user.id,
      key: `${user.id}-${index}`,
    })
  );

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<IUpdateTrainingContentRequest>();

  // ✅ Clean & transform API data before setting default values
  useEffect(() => {
    if (contentData) {
      const cleanedData: IUpdateTrainingContentRequest = {
        code: contentData.code,
        name: contentData.name,
        semester: contentData.semester,
        year: contentData.year,
        programIds: [contentData.programIds[0]], // حولها لـ array
        instructorId: contentData.instructorId,
        theoryAttendanceRecorderId: contentData.theoryAttendanceRecorderId,
        practicalAttendanceRecorderId:
        contentData.practicalAttendanceRecorderId,
        durationMonths: contentData.durationMonths,
        theorySessionsPerWeek: contentData.theorySessionsPerWeek,
        practicalSessionsPerWeek: contentData.practicalSessionsPerWeek,
        chaptersCount: contentData.chaptersCount,
        yearWorkMarks: contentData.yearWorkMarks,
        practicalMarks: contentData.practicalMarks,
        writtenMarks: contentData.writtenMarks,
        attendanceMarks: contentData.attendanceMarks,
        quizzesMarks: contentData.quizzesMarks,
        finalExamMarks: contentData.finalExamMarks,
      };

      reset(cleanedData);
    }
  }, [contentData, reset]);

  // ✅ Submit
  const onSubmit = async (data: IUpdateTrainingContentRequest) => {
    console.log(data)
    try {
      await updateTrainingContent({ id: contentId, data:data }).unwrap();
      toast.success("✅ تم تعديل المحتوى التدريبي بنجاح");
      router.back()
    } catch (err) {
      toast.error("❌ حدث خطأ أثناء التعديل");
      console.error(err);
    }
  };

  if (isLoadingContent) {
    return <div className="text-center py-10">جاري تحميل البيانات...</div>;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-5xl pt-10 mx-auto space-y-6 p-4"
    >
      <h1 className="text-3xl mb-14">تعديل المحتوى التدريبي</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextInput
          name="code"
          label="كود المادة"
          register={register}
          error={errors.code?.message}
          readOnly
        />

        <TextInput
          name="name"
          label="اسم المادة"
          register={register}
          error={errors.name?.message}
        />

        <SelectField
          label="الفصل الدراسي"
          name="semester"
          value={watch("semester")}
          onChange={(val: Semester) => setValue("semester", val)}
          options={Object.values(Semester).map((v) => ({
            label: v,
            value: v,
          }))}
          error={errors.semester?.message}
        />

        <SelectField
          label="السنة الدراسية"
          name="year"
          value={watch("year")}
          onChange={(val: Year) => setValue("year", val)}
          options={Object.values(Year).map((v) => ({
            label: v,
            value: v,
          }))}
          error={errors.year?.message}
        />

        <SelectField
          label="البرامج"
          name="programIds"
          value={watch("programIds")?.[0]?.toString() || ""}
          onChange={(val: string) => setValue("programIds", [Number(val)])}
          options={programs.map((p, index) => ({
            label: p.nameAr,
            value: p.id.toString(),
            key: `${p.id}-${index}`,
          }))}
          error={errors.programIds?.message}
        />

        <Controller
          control={control}
          name="instructorId"
          render={({ field }) => (
            <SelectField
              label="رقم المحاضر"
              value={field.value || ""}
              onChange={field.onChange}
              options={instructorOptions}
              error={errors.instructorId?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="theoryAttendanceRecorderId"
          render={({ field }) => (
            <SelectField
              label="مسجل الحضور النظري"
              value={field.value || ""}
              onChange={field.onChange}
              options={instructorOptions}
              error={errors.theoryAttendanceRecorderId?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="practicalAttendanceRecorderId"
          render={({ field }) => (
            <SelectField
              label="مسجل الحضور العملي"
              value={field.value || ""}
              onChange={field.onChange}
              options={instructorOptions}
              error={errors.practicalAttendanceRecorderId?.message}
            />
          )}
        />

        <TextInput
          name="durationMonths"
          label="عدد الأشهر"
          register={register}
          type="number"
          error={errors.durationMonths?.message}
        />

        <TextInput
          name="theorySessionsPerWeek"
          label="عدد الحصص النظرية"
          register={register}
          type="number"
          error={errors.theorySessionsPerWeek?.message}
        />

        <TextInput
          name="practicalSessionsPerWeek"
          label="عدد الحصص العملية"
          register={register}
          type="number"
          error={errors.practicalSessionsPerWeek?.message}
        />

        <TextInput
          name="chaptersCount"
          label="عدد الفصول"
          register={register}
          type="number"
          error={errors.chaptersCount?.message}
        />

        <TextInput
          name="yearWorkMarks"
          label="أعمال السنة"
          register={register}
          type="number"
          error={errors.yearWorkMarks?.message}
        />

        <TextInput
          name="practicalMarks"
          label="الدرجات العملية"
          register={register}
          type="number"
          error={errors.practicalMarks?.message}
        />

        <TextInput
          name="writtenMarks"
          label="الدرجات التحريرية"
          register={register}
          type="number"
          error={errors.writtenMarks?.message}
        />

        <TextInput
          name="attendanceMarks"
          label="درجات الحضور"
          register={register}
          type="number"
          error={errors.attendanceMarks?.message}
        />

        <TextInput
          name="quizzesMarks"
          label="الاختبارات القصيرة"
          register={register}
          type="number"
          error={errors.quizzesMarks?.message}
        />

        <TextInput
          name="finalExamMarks"
          label="امتحان النهائي"
          register={register}
          type="number"
          error={errors.finalExamMarks?.message}
        />
      </div>

      <div className="text-end">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700"
          disabled={isLoading}
        >
          حفظ التعديلات
        </button>
      </div>
    </form>
  );
}

const TextInput = ({
  label,
  name,
  register,
  type = "text",
  error,
  readOnly = false,
}: any) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      {...register(name, { valueAsNumber: type === "number" })}
      max={type === "number" ? 100 : undefined}
      readOnly={readOnly}
      className={`w-full border bg-white rounded-md px-3 py-2 text-sm ${
        error ? "border-red-500" : "border-gray-300"
      } ${readOnly ? "bg-gray-100" : ""}`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const SelectField = ({ label, value, onChange, options, error }: any) => {
  const selectedOption = options.find((o: any) => o.value === value) || null;

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <Listbox value={value || ""} onChange={onChange}>
        <div className="relative">
          <Listbox.Button
            className={`relative w-full cursor-pointer rounded-md bg-white py-2 pl-3 pr-10 text-left border ${
              error ? "border-red-500" : "border-gray-300"
            }`}
          >
            <span className="block truncate">
              {selectedOption?.label || "اختر"}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition ease-in duration-75"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5">
              {options.map((opt: any, index: number) => (
                <Listbox.Option
                  key={opt.key || `${opt.value}-${index}`}
                  value={opt.value}
                  className={({ active }) =>
                    `cursor-pointer select-none relative py-2 pl-10 pr-4 ${
                      active ? "bg-blue-100 text-blue-900" : "text-gray-900"
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
                        {opt.label}
                      </span>
                      {selected && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                          <Check className="h-4 w-4" />
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};
