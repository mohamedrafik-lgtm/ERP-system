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
import ImageUpload from '@/components/AddStudent/TraineeImage';
import { useAddTraineeMutation } from '@/lip/features/trainees/traineesApi';
import { yupResolver } from '@hookform/resolvers/yup';
import { studentSchema } from '@/Schema/AddStudent';
import SelectWithTransition from '@/components/AddStudent/Menu';
import toast from 'react-hot-toast';
import { Card } from '@/components/AddStudent/Card';
import InputField from '@/components/AddStudent/RenderInputs/inputFild';
import InputDate from '@/components/AddStudent/RenderInputs/InputDate';
import { useGetProgramsQuery } from '@/lip/features/program/program';
import ProgramSelect from '@/components/Program/SelectProgram';
import { getBirthDateFromNationalId } from '@/components/AddStudent/getBirthDateFromNationaltyId';


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
  const {data}= useGetProgramsQuery()
  const [addTrainee,{isLoading,isSuccess,isError}] = useAddTraineeMutation();
  
  const birthDateFromNationalId =  getBirthDateFromNationalId('30409011223052');
  console.log(birthDateFromNationalId);

  const onSubmit = async (data: IStudentRequest) => {
    try {
      const finalData: IStudentRequest = {
        ...data,
        programId: Number(data.programId),
        totalGrade: data.totalGrade !== undefined && data.totalGrade !== null ? Number(data.totalGrade) : undefined,
        gradePercentage: data.gradePercentage !== undefined && data.gradePercentage !== null ? Number(data.gradePercentage) : undefined,
      };
      
      const result = await addTrainee(finalData).unwrap();
      toast.success('تم إضافة المتدرب بنجاح');
      reset();
    } catch (error) {
      toast.error('حدث خطأ أثناء إضافة الطالب');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">إضافة طالب جديد</h1>
              <p className="text-sm text-gray-600">قم بإدخال بيانات الطالب بدقة للتسجيل في النظام</p>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">1</div>
              <div className="mr-3">
                <p className="font-semibold">البيانات الأساسية</p>
                <p className="text-sm text-gray-500">المعلومات الشخصية للطالب</p>
              </div>
            </div>
            <div className="hidden md:flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-semibold">2</div>
              <div className="mx-3">
                <p className="font-semibold">بيانات التواصل</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-semibold">3</div>
              <div className="mx-3">
                <p className="font-semibold">البيانات التعليمية</p>
              </div>
            </div>
          </div>
        </div>

        <Card title="البيانات الأساسية"
        >
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
              value={String(watch("religion") || '')}
              onChange={(val) => setValue("religion", (val as unknown) as IStudentRequest['religion'])}
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
            <InputField label="اسم ولي الأمر" name="guardianName" register={register} error={errors.guardianName?.message} />
            <InputField label="هاتف ولي الأمر" name="guardianPhone" register={register} error={errors.guardianPhone?.message} />
            <InputField label="إيميل ولي الأمر" name="guardianEmail" register={register} error={errors.guardianEmail?.message} />
            <InputField label="وظيفة ولي الأمر" name="guardianJob" register={register} error={errors.guardianJob?.message} />
            <InputField label="صلة القرابة" name="guardianRelation" register={register} error={errors.guardianRelation?.message} />
          </Grid>
        </Card>

        <Card title="البيانات التعليمية">
          <Grid>
            <SelectWithTransition
              label="نوع التعليم"
              value={String(watch("educationType") || '')}
              onChange={(val) => setValue("educationType", (val as unknown) as IStudentRequest['educationType'])}
              options={mapEnumToOptions(enumOptions.IEducationType)}
              error={errors.educationType?.message}
            />
            <InputField label="اسم المدرسة" name="schoolName" register={register} error={errors.schoolName?.message} />
            <InputDate label="تاريخ التخرج" name="graduationDate" register={register} error={errors.graduationDate?.message} />
            <InputField label="المجموع الكلي" name="totalGrade" register={register} type="number" error={errors.totalGrade?.message} />
            <InputField label="النسبة المئوية" name="gradePercentage" register={register} type="number" error={errors.gradePercentage?.message} />
            <SelectWithTransition
              label="حالة المتدرب"
              value={String(watch("traineeStatus") || '')}
              onChange={(val) => setValue("traineeStatus", (val as unknown) as IStudentRequest['traineeStatus'])}
              options={mapEnumToOptions(enumOptions.ITraineeStatus)}
              error={errors.traineeStatus?.message}
            />
            <SelectWithTransition
              label="الصف الدراسي"
              value={String(watch("classLevel") || '')}
              onChange={(val) => setValue("classLevel", (val as unknown) as IStudentRequest['classLevel'])}
              options={mapEnumToOptions(enumOptions.IClassLevel)}
              error={errors.classLevel?.message}
            />
            <ProgramSelect
              label="اختر البرنامج"
              value={watch("programId")}
              onChange={(val) => setValue("programId", val)}
              programs={data || []} // جاي من الريدوكس أو الفetch
              error={errors.programId?.message}
            />
          </Grid>
        </Card>

        <Card title="الأنشطة والملاحظات">
          <Grid>
            <ImageUpload label="صورة الطالب" name="photoUrl" register={register} setValue={setValue} watch={watch} />
          </Grid>
          
        </Card>

        {/* Footer Actions */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="px-5 py-2.5 text-gray-700 hover:text-gray-900 font-medium flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              رجوع
            </button>
            
            <div className="flex gap-4">
              <button
                type="button"
                className="px-5 py-2.5 border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium rounded-lg"
              >
                حفظ كمسودة
              </button>
              <button
                type="submit"
                className={`px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg flex items-center gap-2 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>جاري الحفظ...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>حفظ الطالب</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
