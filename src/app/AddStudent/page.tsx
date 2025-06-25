'use client';
import { useForm } from 'react-hook-form';
import { IStudentRequest } from '@/interface/index';
import { enumOptions } from '@/data/index';
import {
  enrollmentType,
  maritalStatus,
  programType,
  Gender,
  Religion,
  IEducationType,
  ITraineeStatus,
  IClassLevel,
} from '@/interface/index';
import FormField from '@/components/AddStudent/FormField';
import ImageUpload from '@/components/AddStudent/TraineeImage';
import { useAddTraineeMutation } from '@/lip/features/trainees/traineesApi';
import { yupResolver } from '@hookform/resolvers/yup';
import { studentSchema } from '@/Schema/AddStudent';
import SelectWithTransition from '@/components/AddStudent/Menu';
import toast from 'react-hot-toast';
import { Card } from '@/components/AddStudent/Card';
import InputField from '@/components/AddStudent/RenderInputs/inputFild';
import InputDate from '@/components/AddStudent/RenderInputs/InputDate';


const Grid = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
);

export default function AddStudent() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<IStudentRequest>({
    defaultValues: {
      enrollmentType: enrollmentType.REGULAR,
      maritalStatus: maritalStatus.SINGLE,
      programType: programType.SUMMER,
      gender: Gender.MALE,
      religion: Religion.ISLAM,
      educationType: IEducationType.PREPARATORY,
      traineeStatus: ITraineeStatus.NEW,
      classLevel: IClassLevel.FIRST,
      photoUrl: '',
    },
    resolver: yupResolver(studentSchema),
  });
    
  const mapEnumToOptions = (enumObj: Record<string, string>) => {
  return Object.entries(enumObj).map(([key, label]) => ({
    label,
    value: key,
  }));
};
  const [addTrainee,{isLoading,isSuccess,isError}] = useAddTraineeMutation();

  const onSubmit = (data: IStudentRequest) => {
    const finalData: IStudentRequest = {
      ...data,
      programId: Number(data.programId),
      totalGrade: Number(data.totalGrade),
      gradePercentage: Number(data.gradePercentage),
    };
    addTrainee(finalData);
      if(isSuccess){
        toast.success('تم اضافه المتدرب بنجاح');
      }  else if (isError){
        toast.error('حدث خطأ في ارسال البيانات');
      }    
    reset()
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-5xl mx-auto space-y-6"> 
        <h1 className='text-3xl font-semibold'>اضافه طالب</h1>
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
            <InputField label="نشاط رياضي" name="sportsActivity" register={register} error={errors.sportsActivity?.message} />
            <InputField label="نشاط ثقافي" name="culturalActivity" register={register} error={errors.culturalActivity?.message} />
            <InputField label="نشاط تعليمي" name="educationalActivity" register={register} error={errors.educationalActivity?.message} />
            <ImageUpload label="صورة الطالب" name="photoUrl" register={register} setValue={setValue} />
          </Grid>
          <FormField label="ملاحظات">
            <textarea
              {...register("notes")}
              rows={4}
              className={`w-full border rounded-md px-3 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.notes ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.notes && <p className="text-red-500 text-sm mt-1">{errors.notes.message}</p>}
          </FormField>
        </Card>

        <div className="text-end">
          <button
            type="submit"
            className={`bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-6 rounded-lg shadow-sm ${isLoading ? 'opacity-50 cursor-not-allowed':''}`}
          >
            {isLoading ? 'جاري حفظ البيانات' : "حفظ الطالب"}
            
          </button>
        </div>
      </form>
    </div>
  );
}





