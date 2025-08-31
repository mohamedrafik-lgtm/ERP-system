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
      religion: Religion.ISLAM,
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
  const {data}= useGetProgramsQuery()
  const [addTrainee,{isLoading,isSuccess,isError}] = useAddTraineeMutation();
  
  const birthDateFromNationalId =  getBirthDateFromNationalId('30409011223052');
  console.log(birthDateFromNationalId);

  const onSubmit = async (data: IStudentRequest) => {
    try {
      const finalData: IStudentRequest = {
        ...data,
        programId: Number(data.programId),
        totalGrade: Number(data.totalGrade),
        gradePercentage: Number(data.gradePercentage),
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
    <div className="min-h-screen bg-white py-8 px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 rounded-2xl p-8 shadow-xl transform transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]">
          <div className="flex items-center justify-between">
            <div className="transform transition-all duration-300 hover:translate-x-2">
              <h1 className="text-4xl font-bold text-white mb-3 flex items-center gap-3">
                <span>إضافة طالب جديد</span>
                <div className="w-2 h-2 rounded-full bg-blue-300 animate-pulse"></div>
              </h1>
              <p className="text-blue-100 text-lg font-medium">قم بإدخال بيانات الطالب بدقة للتسجيل في النظام</p>
            </div>
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-400 rounded-full blur-lg opacity-50 animate-pulse"></div>
                <div className="relative bg-white/20 backdrop-blur-sm w-32 h-32 rounded-full flex items-center justify-center transform transition-all duration-500 hover:rotate-12 hover:scale-110">
                  <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
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
          className="transform transition-all duration-300 hover:shadow-xl"
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
            <ImageUpload label="صورة الطالب" name="photoUrl" register={register} setValue={setValue} />
          </Grid>
          
        </Card>

        {/* Footer Actions */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium flex items-center gap-2 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              رجوع
            </button>
            
            <div className="flex gap-4">
              <button
                type="button"
                className="px-6 py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-medium rounded-lg transition-all duration-200"
              >
                حفظ كمسودة
              </button>
              <button
                type="submit"
                className={`
                  px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-medium rounded-lg
                  transform transition-all duration-200 hover:scale-105 hover:shadow-xl
                  flex items-center gap-2
                  ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:translate-y-[-1px]'}
                `}
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
