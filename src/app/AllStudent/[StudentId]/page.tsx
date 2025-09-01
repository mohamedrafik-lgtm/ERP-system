'use client';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IStudentRequest } from '@/interface';
import { studentSchema } from '@/Schema/AddStudent';
import {
  enrollmentType,
  maritalStatus,
  programType,
  Gender,
  Religion,
  IEducationType,
  ITraineeStatus,
  IClassLevel,
} from '@/interface';
import FormField from '@/components/AddStudent/FormField';
import SelectWithTransition from '@/components/AddStudent/Menu';
import ImageUpload from '@/components/AddStudent/TraineeImage';
import { enumOptions } from '@/data';
import { Card } from '@/components/AddStudent/Card';
import InputField from '@/components/AddStudent/RenderInputs/inputFild';
import InputDate from '@/components/AddStudent/RenderInputs/InputDate';
import { useGetTraineeQuery, useUpdateTraineeMutation } from '@/lip/features/trainees/traineesApi';
import toast from 'react-hot-toast';
const Grid = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
);
export default function EditTraineePage() {
  const { StudentId } = useParams<{ StudentId: string }>();
  const { data, isLoading } = useGetTraineeQuery(Number(StudentId));
  const [updateTrainee, { isLoading: isUpdating }] = useUpdateTraineeMutation();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<IStudentRequest>({
    resolver: yupResolver(studentSchema),
  });
  const mapEnumToOptions = (enumObj: Record<string, string>) => {
  return Object.entries(enumObj).map(([key, label]) => ({
    label,
    value: key,
  }));
};

  useEffect(() => {
    if (data) {
      // تحويل التواريخ إلى تنسيق YYYY-MM-DD للـ input type="date"
      const formattedData = {
        ...data,
        birthDate: data.birthDate ? new Date(data.birthDate).toISOString().split('T')[0] : '',
        idIssueDate: data.idIssueDate ? new Date(data.idIssueDate).toISOString().split('T')[0] : '',
        idExpiryDate: data.idExpiryDate ? new Date(data.idExpiryDate).toISOString().split('T')[0] : '',
        graduationDate: data.graduationDate ? new Date(data.graduationDate).toISOString().split('T')[0] : '',
      };
      reset(formattedData);
    }
  }, [data, reset]);

  const onSubmit = async (formData: IStudentRequest) => {
    try {
      const updated: IStudentRequest = {
        ...formData,
        programId: Number(formData.programId),
        totalGrade: Number(formData.totalGrade),
        gradePercentage: Number(formData.gradePercentage),
      };
      
      await updateTrainee({ id: Number(StudentId), data: updated }).unwrap();
      toast.success('تم تحديث بيانات الطالب بنجاح');
    } catch (error) {
      console.error('Error updating trainee:', error);
      toast.error('حدث خطأ أثناء تحديث بيانات الطالب');
    }
  };
  

  if (isLoading) return <p className="text-center py-10">جاري تحميل بيانات الطالب...</p>;

  return (
   <div className="min-h-screen bg-gray-100 py-10 px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-5xl mx-auto space-y-6">
        <Card title="البيانات الأساسية">
          <Grid>
            <InputField label="الاسم بالعربية" name="nameAr" register={register} error={errors.nameAr?.message} />
            <InputField label="الاسم بالإنجليزية" name="nameEn" register={register} error={errors.nameEn?.message} />
            <SelectWithTransition
              label="النوع"
              value={watch("gender")}
              onChange={(val) => setValue("gender", val as Gender)}
              options={mapEnumToOptions(enumOptions.Gender)}
              error={errors.gender?.message}
            />
            <SelectWithTransition
              label="الحالة الاجتماعية"
              value={watch("maritalStatus")}
              onChange={(val) => setValue("maritalStatus", val as maritalStatus)}
              options={mapEnumToOptions(enumOptions.maritalStatus)}
              error={errors.maritalStatus?.message}
            />
            <SelectWithTransition
              label="نوع القيد"
              value={watch("enrollmentType")}
              onChange={(val) => setValue("enrollmentType", val as enrollmentType)}
              options={mapEnumToOptions(enumOptions.enrollmentType)}
              error={errors.enrollmentType?.message}
            />
            <SelectWithTransition
              label="نوع البرنامج"
              value={watch("programType")}
              onChange={(val) => setValue("programType", val as programType)}
              options={mapEnumToOptions(enumOptions.programType)}
              error={errors.programType?.message}
            />
            <InputField label="الجنسية" name="nationality" register={register} error={errors.nationality?.message} />
            <InputDate label="تاريخ الميلاد" name="birthDate" register={register} error={errors.birthDate?.message} />
            <InputField label="الرقم القومي" name="nationalId" register={register} error={errors.nationalId?.message} />
            <InputDate label="تاريخ إصدار البطاقة" name="idIssueDate" register={register} error={errors.idIssueDate?.message} />
            <InputDate label="تاريخ انتهاء البطاقة" name="idExpiryDate" register={register} error={errors.idExpiryDate?.message} />
            <SelectWithTransition
              label="الديانة"
              value={watch("religion")}
              onChange={(val) => setValue("religion", val as Religion)}
              options={mapEnumToOptions(enumOptions.Religion)}
              error={errors.religion?.message}
            />
          </Grid>
        </Card>

        <Card title="بيانات التواصل">
          <Grid>
            <InputField label="الهاتف" name="phone" register={register} error={errors.phone?.message} />
            <InputField label="البريد الإلكتروني" name="email" register={register} error={errors.email?.message} />
            <InputField label="الهاتف الأرضي" name="landline" register={register} error={errors.landline?.message} />
            <InputField label="واتساب" name="whatsapp" register={register} error={errors.whatsapp?.message} />
            <InputField label="فيسبوك" name="facebook" register={register} error={errors.facebook?.message} />
            <InputField label="الدولة" name="country" register={register} error={errors.country?.message} />
            <InputField label="المحافظة" name="governorate" register={register} error={errors.governorate?.message} />
            <InputField label="المدينة" name="city" register={register} error={errors.city?.message} />
            <InputField label="عنوان الإقامة" name="residenceAddress" register={register} error={errors.residenceAddress?.message} />
            <InputField label="العنوان التفصيلي" name="address" register={register} error={errors.address?.message} />
          </Grid>
        </Card>

        <Card title="بيانات ولي الأمر">
          <Grid>
            <InputField label="هاتف ولي الأمر" name="guardianPhone" register={register} error={errors.guardianPhone?.message} />
            <InputField label="إيميل ولي الأمر" name="guardianEmail" register={register} error={errors.guardianEmail?.message} />
            <InputField label="وظيفة ولي الأمر" name="guardianJob" register={register} error={errors.guardianJob?.message} />
            <InputField label="صلة القرابة" name="guardianRelation" register={register} error={errors.guardianRelation?.message} />
            <InputField label="الرقم القومي لولي الأمر" name="guardianNationalId" register={register} error={errors.guardianNationalId?.message} />
          </Grid>
        </Card>

        <Card title="البيانات التعليمية">
          <Grid>
            <SelectWithTransition
              label="نوع التعليم"
              value={watch("educationType")}
              onChange={(val) => setValue("educationType", val as IEducationType)}
              options={mapEnumToOptions(enumOptions.IEducationType)}
              error={errors.educationType?.message}
            />
            <InputField label="اسم المدرسة" name="schoolName" register={register} error={errors.schoolName?.message} />
            <InputDate label="تاريخ التخرج" name="graduationDate" register={register} error={errors.graduationDate?.message} />
            <InputField label="المجموع الكلي" name="totalGrade" register={register} type="number" error={errors.totalGrade?.message} />
            <InputField label="النسبة المئوية" name="gradePercentage" register={register} type="number" error={errors.gradePercentage?.message} />
            <SelectWithTransition
              label="حالة المتدرب"
              value={watch("traineeStatus")}
              onChange={(val) => setValue("traineeStatus", val as ITraineeStatus)}
              options={mapEnumToOptions(enumOptions.ITraineeStatus)}
              error={errors.traineeStatus?.message}
            />
            <SelectWithTransition
              label="الصف الدراسي"
              value={watch("classLevel")}
              onChange={(val) => setValue("classLevel", val as IClassLevel)}
              options={mapEnumToOptions(enumOptions.IClassLevel)}
              error={errors.classLevel?.message}
            />
            <InputField label="رقم البرنامج" name="programId" register={register} type="number" error={errors.programId?.message} />
          </Grid>
        </Card>

        <Card title="الأنشطة والملاحظات">
          <Grid>
            <InputField label="نشاط رياضي" name="sportsActivity" register={register} />
            <InputField label="نشاط ثقافي" name="culturalActivity" register={register} />
            <InputField label="نشاط تعليمي" name="educationalActivity" register={register} />
            <ImageUpload label="صورة الطالب" name="photoUrl" register={register} setValue={setValue} watch={watch} />
          </Grid>
          <FormField label="ملاحظات">
            <textarea
              {...register("notes")}
              rows={4}
              className="w-full border rounded-md px-3 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
              placeholder="أدخل أي ملاحظات إضافية..."
            />
          </FormField>
        </Card>

        <div className="text-end">
          <button
            type="submit"
            disabled={isUpdating}
            className={`bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-8 rounded-lg shadow-sm transition-all duration-200 ${
              isUpdating ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg hover:scale-105'
            }`}
          >
            {isUpdating ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                جاري تحديث البيانات...
              </div>
            ) : (
              "تحديث بيانات الطالب"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}