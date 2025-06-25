'use client';

import { useForm, Controller, useWatch } from 'react-hook-form';
import { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import Menu from '@/components/ui/menu';
import { useGetCodeQuery } from '@/lip/features/TraningContetn/Traning';
import { ITrainingContentRequest } from '@/interface';
import { trainingContentSchema } from '@/Schema/program/AddTraningContent';
import { useGetUserEmployeeQuery } from '@/lip/features/users/user';

const AddTriningContent = () => {
  const {
    control,
    handleSubmit,
    watch,
    register,
    setValue,
    getValues,
  } = useForm<ITrainingContentRequest>({
     resolver: yupResolver(trainingContentSchema),
  });

  const { data } = useGetCodeQuery();
  const {data:user} = useGetUserEmployeeQuery()
  console.log(user)
  useEffect(() => {
    if (data?.code) {
      setValue('code', data.code);
    }
  }, [data, setValue]);

  const onSubmit = (data: ITrainingContentRequest) => {
    const total =
      Number(data.yearWorkMarks || 0) +
      Number(data.practicalMarks || 0) +
      Number(data.writtenMarks || 0) +
      Number(data.attendanceMarks || 0) +
      Number(data.quizzesMarks || 0) +
      Number(data.finalExamMarks || 0);

    if (total > 100) {
      alert('إجمالي الدرجات يجب ألا يتجاوز 100');
      return;
    }

    console.log('Form submitted:', data);
  };

  const watchedValues = useWatch({ control });

  useEffect(() => {
    console.log('Live form values:', watchedValues);
  }, [watchedValues]);

  const handleCheckValues = () => {
    const allValues = getValues();
    console.log('Manual check - current values:', allValues);
  };

  const programOptions = [
    { value: 1, label: 'ذكاء اصطناعي' },
    { value: 2, label: 'أمن سيبراني' },
    { value: 3, label: 'تطوير متكامل' },
  ];

  return (
    <div className="px-4 sm:px-10 py-8 max-w-6xl mx-auto bg-white rounded-md mt-14">
      <h1 className="text-2xl font-bold mb-6">إضافة محتوى تدريبي جديد</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="md:col-span-2">
          <Controller
            name="programIds"
            control={control}
            render={({ field }) => (
              <Menu
                label="اختر البرامج التدريبية المرتبطة"
                placeholder="اختر برنامجًا تدريبيًا واحدًا أو أكثر"
                options={programOptions}
                field={field}
                
              />
            )}
          />
        </div>

        <div>
          <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
            كود المحتوى
          </label>
          <input
            id="code"
            type="text"
            {...register('code')}
            readOnly
            className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 bg-gray-100 text-gray-600 cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="كود المحتوى سيتم تعيينه تلقائيًا"
          />
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            اسم المحتوى التدريبي
          </label>
          <input
            id="name"
            type="text"
            {...register('name')}
            className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="أدخل اسم المحتوى التدريبي"
          />
        </div>

        <Controller
          name="semester"
          control={control}
          render={({ field }) => (
            <Menu
              label="الفصل الدراسي"
              placeholder="اختر الفصل الدراسي"
              options={[
                { value: 'FIRST', label: 'الأول' },
                { value: 'SECOND', label: 'الثاني' },
              ]}
              field={field}
            />
          )}
        />

        <Controller
          name="year"
          control={control}
          render={({ field }) => (
            <Menu
              label="السنة الدراسية"
              placeholder="اختر السنة"
              options={[
                { value: 'FIRST', label: 'الأولى' },
                { value: 'SECOND', label: 'الثانية' },
                { value: 'THIRD', label: 'الثالثة' },
                { value: 'FOURTH', label: 'الرابعة' },
              ]}
              field={field}
            />
          )}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">عدد الفصول</label>
          <input
            type="number"
            {...register('chaptersCount')}
            className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">مدة البرنامج بالأشهر</label>
          <input
            type="number"
            {...register('durationMonths')}
            className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">عدد محاضرات النظري أسبوعياً</label>
          <input
            type="number"
            {...register('theorySessionsPerWeek')}
            className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">عدد محاضرات العملي أسبوعياً</label>
          <input
            type="number"
            {...register('practicalSessionsPerWeek')}
            className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">المحاضر</label>
          <input
            type="text"
            {...register('instructorId')}
            className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">مسجل النظري</label>
          <input
            type="text"
            {...register('theoryAttendanceRecorderId')}
            className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">مسجل العملي</label>
          <input
            type="text"
            {...register('practicalAttendanceRecorderId')}
            className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="md:col-span-2">
          <h2 className="text-xl font-bold mt-6 mb-2">درجات التقييم (المجموع 100)</h2>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">أعمال السنة</label>
          <input
            type="number"
            {...register('yearWorkMarks')}
            className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">درجات العملي</label>
          <input
            type="number"
            {...register('practicalMarks')}
            className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">درجات التحريري</label>
          <input
            type="number"
            {...register('writtenMarks')}
            className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">درجات الحضور</label>
          <input
            type="number"
            {...register('attendanceMarks')}
            className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">درجات الاختبارات القصيرة</label>
          <input
            type="number"
            {...register('quizzesMarks')}
            className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">درجات الامتحان النهائي</label>
          <input
            type="number"
            {...register('finalExamMarks')}
            className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="md:col-span-2 flex justify-between mt-4">
          <button
            type="button"
            onClick={handleCheckValues}
            className="text-white bg-gray-500 px-6 py-2 rounded-xl"
          >
            طباعة القيم الحالية
          </button>

          <button
            type="submit"
            className="text-lg text-white bg-blue-600 px-6 py-2 rounded-xl"
          >
            إنشاء المحتوى التدريبي
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTriningContent;
