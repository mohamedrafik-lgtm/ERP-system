// 'use client';

// import { useForm, Controller, useWatch } from 'react-hook-form';
// import { useEffect } from 'react';
// import { yupResolver } from '@hookform/resolvers/yup';
// import Menu from '@/components/ui/menu';
// import { useGetCodeQuery } from '@/lip/features/TraningContetn/Traning';
// import { IAddTrainengContent } from '@/interface';
// import { useGetUserEmployeeQuery } from '@/lip/features/users/user';

// const AddTriningContent = () => {
//   const {
//     control,
//     handleSubmit,
//     watch,
//     register,
//     setValue,
//     getValues,
//   } = useForm<IAddTrainengContent>();

//   const { data } = useGetCodeQuery();
//   const {data:user} = useGetUserEmployeeQuery()
//   console.log(user)
//   useEffect(() => {
//     if (data?.code) {
//       setValue('code', data.code);
//     }
//   }, [data, setValue]);

//   const onSubmit = (data: IAddTrainengContent) => {
//     const total =
//       Number(data.yearWorkMarks || 0) +
//       Number(data.practicalMarks || 0) +
//       Number(data.writtenMarks || 0) +
//       Number(data.attendanceMarks || 0) +
//       Number(data.quizzesMarks || 0) +
//       Number(data.finalExamMarks || 0);

//     if (total > 100) {
//       alert('إجمالي الدرجات يجب ألا يتجاوز 100');
//       return;
//     }

//     console.log('Form submitted:', data);
//   };

//   const watchedValues = useWatch({ control });

//   useEffect(() => {
//     console.log('Live form values:', watchedValues);
//   }, [watchedValues]);

//   const handleCheckValues = () => {
//     const allValues = getValues();
//     console.log('Manual check - current values:', allValues);
//   };

//   const programOptions = [
//     { value: 1, label: 'ذكاء اصطناعي' },
//     { value: 2, label: 'أمن سيبراني' },
//     { value: 3, label: 'تطوير متكامل' },
//   ];

//   return (
//     <div className="px-4 sm:px-10 py-8 max-w-6xl mx-auto bg-white rounded-md mt-14">
//       <h1 className="text-2xl font-bold mb-6">إضافة محتوى تدريبي جديد</h1>

//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="grid grid-cols-1 md:grid-cols-2 gap-6"
//       >
//         <div className="md:col-span-2">
//           <Controller
//             name="programIds"
//             control={control}
//             render={({ field }) => (
//               <Menu
//                 label="اختر البرامج التدريبية المرتبطة"
//                 placeholder="اختر برنامجًا تدريبيًا واحدًا أو أكثر"
//                 options={programOptions}
//                 field={field}
                
//               />
//             )}
//           />
//         </div>

//         <div>
//           <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
//             كود المحتوى
//           </label>
//           <input
//             id="code"
//             type="text"
//             {...register('code')}
//             readOnly
//             className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 bg-gray-100 text-gray-600 cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-orange-500"
//             placeholder="كود المحتوى سيتم تعيينه تلقائيًا"
//           />
//         </div>

//         <div>
//           <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//             اسم المحتوى التدريبي
//           </label>
//           <input
//             id="name"
//             type="text"
//             {...register('name')}
//             className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
//             placeholder="أدخل اسم المحتوى التدريبي"
//           />
//         </div>

//         <Controller
//           name="semester"
//           control={control}
//           render={({ field }) => (
//             <Menu
//               label="الفصل الدراسي"
//               placeholder="اختر الفصل الدراسي"
//               options={[
//                 { value: 'FIRST', label: 'الأول' },
//                 { value: 'SECOND', label: 'الثاني' },
//               ]}
//               field={field}
//             />
//           )}
//         />

//         <Controller
//           name="year"
//           control={control}
//           render={({ field }) => (
//             <Menu
//               label="السنة الدراسية"
//               placeholder="اختر السنة"
//               options={[
//                 { value: 'FIRST', label: 'الأولى' },
//                 { value: 'SECOND', label: 'الثانية' },
//                 { value: 'THIRD', label: 'الثالثة' },
//                 { value: 'FOURTH', label: 'الرابعة' },
//               ]}
//               field={field}
//             />
//           )}
//         />

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">عدد الفصول</label>
//           <input
//             type="number"
//             {...register('chaptersCount')}
//             className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">مدة البرنامج بالأشهر</label>
//           <input
//             type="number"
//             {...register('durationMonths')}
//             className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">عدد محاضرات النظري أسبوعياً</label>
//           <input
//             type="number"
//             {...register('theorySessionsPerWeek')}
//             className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">عدد محاضرات العملي أسبوعياً</label>
//           <input
//             type="number"
//             {...register('practicalSessionsPerWeek')}
//             className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">المحاضر</label>
//           <input
//             type="text"
//             {...register('instructorId')}
//             className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">مسجل النظري</label>
//           <input
//             type="text"
//             {...register('theoryAttendanceRecorderId')}
//             className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">مسجل العملي</label>
//           <input
//             type="text"
//             {...register('practicalAttendanceRecorderId')}
//             className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
//           />
//         </div>

//         <div className="md:col-span-2">
//           <h2 className="text-xl font-bold mt-6 mb-2">درجات التقييم (المجموع 100)</h2>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">أعمال السنة</label>
//           <input
//             type="number"
//             {...register('yearWorkMarks')}
//             className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">درجات العملي</label>
//           <input
//             type="number"
//             {...register('practicalMarks')}
//             className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">درجات التحريري</label>
//           <input
//             type="number"
//             {...register('writtenMarks')}
//             className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">درجات الحضور</label>
//           <input
//             type="number"
//             {...register('attendanceMarks')}
//             className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">درجات الاختبارات القصيرة</label>
//           <input
//             type="number"
//             {...register('quizzesMarks')}
//             className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">درجات الامتحان النهائي</label>
//           <input
//             type="number"
//             {...register('finalExamMarks')}
//             className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
//           />
//         </div>

//         <div className="md:col-span-2 flex justify-between mt-4">
//           <button
//             type="button"
//             onClick={handleCheckValues}
//             className="text-white bg-gray-500 px-6 py-2 rounded-xl"
//           >
//             طباعة القيم الحالية
//           </button>

//           <button
//             type="submit"
//             className="text-lg text-white bg-blue-600 px-6 py-2 rounded-xl"
//           >
//             إنشاء المحتوى التدريبي
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddTriningContent;
"use client";
import { useEffect, useState, Fragment } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Listbox, Transition } from '@headlessui/react';
import { Check, ChevronDown, RefreshCw } from 'lucide-react';
import { IAddTrainengContent, ISemester, Year } from '@/interface';
import { useGetProgramsQuery } from '@/lip/features/program/program';
import { useGetUserEmployeeQuery } from '@/lip/features/users/user';
import { useAddTrainingContentMutation, useGetCodeQuery } from '@/lip/features/TraningContetn/Traning';
import toast from 'react-hot-toast';
import { trainingContentSchema } from '@/Schema/program/AddTraningContent';

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

export default function AddTrainingContent() {
  const { data: programs = [] } = useGetProgramsQuery();
  const { data: users = [] } = useGetUserEmployeeQuery();
  const [code, setCode] = useState('');
  const {data:ContentCode,refetch} = useGetCodeQuery()
  const [addTrainingContent, { isLoading, isSuccess }] = useAddTrainingContentMutation();
const instructorOptions: Option[] = users.map((user: IUserOption, index) => ({
  label: user.email,
  value: user.id,
  key: `${user.id}-${index}`,
}));
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<IAddTrainengContent>({
    resolver: yupResolver(trainingContentSchema),
    defaultValues: {
      programIds: [],
      durationMonths: 0,
      theorySessionsPerWeek: 0,
      practicalSessionsPerWeek: 0,
      chaptersCount: 0,
      yearWorkMarks: 0,
      practicalMarks: 0,
      writtenMarks: 0,
      attendanceMarks: 0,
      quizzesMarks: 0,
      finalExamMarks: 0,
      instructorId: '',
      theoryAttendanceRecorderId: '',
      practicalAttendanceRecorderId: '',
    },
  });
  
  const onSubmit =async (data: IAddTrainengContent) => {
    if (!data.code)return;
    const finalData = {
    ...data,
  };

  try {
    await addTrainingContent(finalData).unwrap();
     toast.success('تم اضافه المحتوي التدريبي بنجاح');
  } catch (err) {
    console.error("فشل في الإرسال", err);
  }
  };

useEffect(() => {
  if (ContentCode?.code) {
    setValue('code', ContentCode.code);
  }
}, [ContentCode, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-5xl pt-10 mx-auto space-y-6 p-4">
      <h1 className='text-3xl mb-14'>اضافه محتوي تدريبي</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">كود المادة</label>
          <div className="flex gap-2">
            <input
              type="text"
              {...register('code')}
              value={code}
              readOnly
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100"
            />
            <button
              type="button"
              onClick={refetch}
              className="px-3 py-2 bg-orange-500 text-white text-sm rounded-md hover:bg-orange-600"
            >
              <RefreshCw size={16} className="inline mr-1" /> تحديث الكود
            </button>
          </div>
        </div>

        <TextInput name="name" label="اسم المادة" register={register} error={errors.name?.message} />

        <SelectField
          label="الفصل الدراسي"
          name="semester"
          value={watch('semester')}
          onChange={(val: ISemester) => setValue('semester', val)}
          options={Object.values(ISemester).map((v) => ({ label: v, value: v }))}
          error={errors.semester?.message}
        />

        <SelectField
          label="السنة الدراسية"
          name="year"
          value={watch('year')}
          onChange={(val: Year) => setValue('year', val)}
          options={Object.values(Year).map((v) => ({ label: v, value: v }))}
          error={errors.year?.message}
        />

        <SelectField
          label="البرامج"
          name="programIds"
          value={watch('programIds')?.[0]?.toString() || ''}
          onChange={(val: string) => setValue('programIds', [Number(val)])}
          options={programs.map((p, index) => ({ label: p.nameAr, value: p.id.toString(), key: `${p.id}-${index}` }))}
          error={errors.programIds?.message}
        />

        <Controller
          control={control}
          name="instructorId"
          render={({ field }) => (
            <SelectField
              label="رقم المحاضر"
              value={field.value || ''}
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
              value={field.value || ''}
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
              value={field.value || ''}
              onChange={field.onChange}
              options={instructorOptions}
              error={errors.practicalAttendanceRecorderId?.message}
            />
          )}
        />

        <TextInput name="durationMonths" label="عدد الأشهر" register={register} type="number" error={errors.durationMonths?.message} />
        <TextInput name="theorySessionsPerWeek" label="عدد الحصص النظرية" register={register} type="number" error={errors.theorySessionsPerWeek?.message} />
        <TextInput name="practicalSessionsPerWeek" label="عدد الحصص العملية" register={register} type="number" error={errors.practicalSessionsPerWeek?.message} />
        <TextInput name="chaptersCount" label="عدد الفصول" register={register} type="number" error={errors.chaptersCount?.message} />
        <TextInput name="yearWorkMarks" label="أعمال السنة" register={register} type="number" error={errors.yearWorkMarks?.message} />
        <TextInput name="practicalMarks" label="الدرجات العملية" register={register} type="number" error={errors.practicalMarks?.message} />
        <TextInput name="writtenMarks" label="الدرجات التحريرية" register={register} type="number" error={errors.writtenMarks?.message} />
        <TextInput name="attendanceMarks" label="درجات الحضور" register={register} type="number" error={errors.attendanceMarks?.message} />
        <TextInput name="quizzesMarks" label="الاختبارات القصيرة" register={register} type="number" error={errors.quizzesMarks?.message} />
        <TextInput name="finalExamMarks" label="امتحان النهائي" register={register} type="number" error={errors.finalExamMarks?.message} />
      </div>

      <div className="text-end">
        <button type="submit" className="bg-orange-600 text-white px-6 py-2 rounded-md shadow hover:bg-orange-700">
          إضافة المحتوى التدريبي
        </button>
      </div>
    </form>
  );
}

const TextInput = ({ label, name, register, type = 'text', error }: any) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      {...register(name, { valueAsNumber: type === 'number' })}
      max={type === 'number' ? 100 : undefined}
      className={`w-full border bg-white rounded-md px-3 py-2 text-sm ${error ? 'border-red-500' : 'border-gray-300'}`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const SelectField = ({ label, value, onChange, options, error }: any) => {
  const selectedOption = options.find((o: any) => o.value === value) || null;

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <Listbox value={value || ''} onChange={onChange}>
        <div className="relative">
          <Listbox.Button className={`relative w-full cursor-pointer rounded-md bg-white py-2 pl-3 pr-10 text-left border ${error ? 'border-red-500' : 'border-gray-300'}`}>
            <span className="block truncate">{selectedOption?.label || 'اختر'}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </span>
          </Listbox.Button>
          <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="opacity-0" enterTo="opacity-100" leave="transition ease-in duration-75" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5">
              {options.map((opt: any, index: number) => (
                <Listbox.Option key={opt.key || `${opt.value}-${index}`} value={opt.value} className={({ active }) => `cursor-pointer select-none relative py-2 pl-10 pr-4 ${active ? 'bg-orange-100 text-orange-900' : 'text-gray-900'}`}>
                  {({ selected }) => (
                    <>
                      <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{opt.label}</span>
                      {selected && <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-orange-600"><Check className="h-4 w-4" /></span>}
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
