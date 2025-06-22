'use client';

import { useForm, Controller, useWatch } from 'react-hook-form';
import Menu from '@/components/ui/menu';
import { yupResolver } from '@hookform/resolvers/yup';
import { trainingContentSchema } from '@/Schema/program/AddTraningContent';

const AddTriningContent = () => {
  const { control, handleSubmit, watch, register, setValue } = useForm({
  resolver: yupResolver(trainingContentSchema),
});

  const onSubmit = (data: any) => {
    const total =
      Number(data.yearWork || 0) +
      Number(data.practical || 0) +
      Number(data.written || 0) +
      Number(data.platformLecture || 0) +
      Number(data.platformExam || 0) +
      Number(data.finalGrades || 0);

    if (total > 100) {
      alert('إجمالي الدرجات يجب ألا يتجاوز 100');
      return;
    }
    console.log('Form data:', data);
  };

  const programOptions = [
    { value: 'ai', label: 'ذكاء اصطناعي' },
    { value: 'cyber', label: 'أمن سيبراني' },
    { value: 'fullstack', label: 'تطوير متكامل' },
  ];

  const totalGrades = useWatch({
    control,
    name: ['yearWork', 'practical', 'written', 'platformLecture', 'platformExam', 'finalGrades'],
  });

  const total = totalGrades.reduce((acc, val) => acc + Number(val || 0), 0);

  return (
    <div>

        <div className="px-4 sm:px-10 py-8 max-w-6xl mx-auto bg-white rounded-md mt-14">
      <h1 dir="ltr" className="text-2xl font-bold mb-6">إضافة محتوى تدريبي جديد</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="md:col-span-2">
          <Controller
            name="linkedPrograms"
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
          <label className="block text-sm font-medium mb-2">كود المحتوى</label>
          <input type="text" className="w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600" placeholder="أدخل كود المحتوى" {...register('code')} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">اسم المحتوى التدريبي</label>
          <input type="text" className="w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600" placeholder="أدخل اسم المحتوى التدريبي" {...register('contentName')} />
        </div>

        <Controller name="semester" control={control} render={({ field }) => (
          <Menu label="الفصل الدراسي" placeholder="اختر الفصل الدراسي" options={programOptions} field={field} />)}
        />

        <Controller name="year" control={control} render={({ field }) => (
          <Menu label="الفرقة" placeholder="اختر الفرقة" options={programOptions} field={field} />)}
        />

        <div>
          <label className="block text-sm font-medium mb-2">البرنامج الدراسي</label>
          <input type="text" className="w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600" placeholder="أدخل البرنامج الدراسي" {...register('studyProgram')} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">اسم الأستاذ</label>
          <input type="text" className="w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600" placeholder="أدخل اسم الأستاذ" {...register('teacherName')} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">عدد الأبواب</label>
          <input type="number" className="w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600" placeholder="عدد الأبواب" {...register('units')} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">مدة تدريب النظري (بالأسبوع)</label>
          <input type="number" className="w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600" placeholder="أدخل المدة" {...register('theoryDuration')} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">مرات حضور النظري في الأسبوع</label>
          <input type="number" className="w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600" placeholder="أدخل العدد" {...register('theoryAttendance')} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">مرات حضور العملي في الأسبوع</label>
          <input type="number" className="w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600" placeholder="أدخل العدد" {...register('practicalAttendance')} />
        </div>

        <div className="col-span-2">
          <h2 dir="ltr" className="text-xl font-bold mt-6">درجات المقرر (المجموع 100)</h2>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">أعمال السنة</label>
          <input type="number" className="w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600" {...register('yearWork')} placeholder="أدخل درجة أعمال السنة" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">العملي</label>
          <input type="number" className="w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600" {...register('practical')} placeholder="أدخل درجة العملي" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">التحريري</label>
          <input type="number" className="w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600" {...register('written')} placeholder="أدخل درجة التحريري" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">محاضرة على المنصة</label>
          <input type="number" className="w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600" {...register('platformLecture')} placeholder="درجة محاضرة المنصة" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">امتحان نهائي على المنصة</label>
          <input type="number" className="w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600" {...register('platformExam')} placeholder="درجة الامتحان النهائي" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">تقديرات نهائية</label>
          <input type="number" className="w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600" {...register('finalGrades')} placeholder="تقديرات نهائية" />
        </div>

        <div className="md:col-span-2">
          <p className="text-sm text-gray-600">مجموع الدرجات: {total} من 100</p>
        </div>

        <div className="col-span-2">
          <h2 dir="ltr" className="text-xl font-bold mt-6">مسؤولية تسجيل الحضور</h2>
        </div>

        <Controller name="theoryManager" control={control} render={({ field }) => (
          <Menu label="مسؤول تسجيل حضور النظري" placeholder="اختر المسؤول" options={programOptions} field={field} />)}
        />

        <Controller name="practicalManager" control={control} render={({ field }) => (
          <Menu label="مسؤول تسجيل حضور العملي" placeholder="اختر المسؤول" options={programOptions} field={field} />)}
        />

        <div className="col-span-2 flex justify-end">
          <button type="submit" className="text-lg text-white bg-blue-600 px-6 py-2 rounded-xl mt-4">
            إنشاء المحتوى التدريبي
          </button>
        </div>
      </form>
    </div>
    </div>
    
  );
};

export default AddTriningContent;
