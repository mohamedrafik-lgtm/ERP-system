"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { StudentInformation } from "@/components/AddStudent/RenderInputs/StudentInformation";
import StudentImageUpload from "@/components/AddStudent/StudentImageUpload";
import {
  AdditionalData,
  BasicDataInput,
  ContactInformationInput,
  EducationData,
} from "@/data";
import { IFormValues, IStudentResponce } from "@/interface";
import {
  useGetStudentQuery,
  useUpdateStudentMutation,
} from "@/lip/features/student/student";
import { studentFormSchema } from "@/Schema/AddStudent";

const UpdateStudent = () => {
  const { StudentId } = useParams();
  const id = StudentId ? Number(StudentId) : 0;

  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [UpdateStudent, { isLoading }] = useUpdateStudentMutation();
  const { data, isLoading: loadingStudent } = useGetStudentQuery({ id });

const {
  register,
  handleSubmit,
  setValue,
  formState: { errors },
  reset,
} = useForm<IFormValues>({
  resolver: yupResolver(studentFormSchema), // مهم جدًا يكون نفس التايب
  mode: "onBlur",
});



function mapStudentToForm(data: IStudentResponce): IFormValues {
  return {
    id: data.id,
    nameArabic: data.nameAr,
    nameEnglish: data.nameEn,
    admissionSystem: data.enrollmentType,
    maritalState: data.maritalStatus,
    marketer: "", // مفيش في الريسبونس، فاضي
    nationalId: data.nationalId,
    releaseDate: data.idIssueDate,
    expirationDate: data.idExpiryDate,
    programType: data.programType,
    gender: data.gender,
    nationality: data.nationality,
    dateOfBirth: data.birthDate,
    placeOfBirth: "", // مش موجود في الريسبونس
    religion: data.religion,
    program: data.program?.name ?? "",
    photoUrl: data.photoUrl,

    The_state: data.country,
    Governorate: data.governorate,
    city: data.city,
    address: data.address,
    mobileNumber: data.phone,
    email: data.email,
    ParentMobile: data.guardianPhone,
    ParentEmail: data.guardianEmail,
    GuardianJob: data.guardianJob,
    RelationshipWithTheGuardian: data.guardianRelation,
    NationalIDOfTheGuardian: data.guardianNationalId,
    Landline: data.landline ?? "",
    whatsapp: data.whatsapp ?? "",
    facebook: data.facebook ?? "",

    TypeOfEducation: data.educationType,
    School_Center_Name: data.schoolName,
    DateOfObtainingTheQualification: data.graduationDate,
    HighSchoolTotal: data.totalGrade.toString(),
    HighSchoolPercentage: data.gradePercentage.toString(),

    SportsActivity: data.sportsActivity ?? "",
    CulturalAndArtisticActivity: data.culturalActivity ?? "",
    ScientificActivity: data.educationalActivity ?? "",
    comments: data.notes ?? "",
  };
}

useEffect(() => {
  if (data) {
    reset(mapStudentToForm(data));
  }
}, [data, reset]);



  const handleImageUpload = (file: File, preview: string) => {
    setUploadedImage(file);
    setValue("photoUrl", preview);
  };

  const onSubmit: SubmitHandler<IFormValues> = async (formData) => {
  if (!id) return;
  await UpdateStudent({ data: formData, id });
};


  return (
    <div className="pb-16">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-9/12 mx-auto space-y-5 pt-5"
      >
        <h1 className="text-3xl font-bold">تعديل بيانات الطالب</h1>

        {/* ✅ البيانات الأساسية */}
        <div className="space-y-7">
          <h2 className="text-2xl text-end">البيانات الاساسيه</h2>
          <div className="grid grid-cols-2 gap-5">
            <StudentInformation
              errors={errors}
              register={register}
              data={BasicDataInput}
              required={true}
            />
          </div>
        </div>

        {/* ✅ صورة الطالب */}
        <div>
          <h2 className="text-2xl text-end mb-4">
            صورة الطالب <span className="text-red-500">*</span>
          </h2>
          <StudentImageUpload onImageUpload={handleImageUpload} />
          <input
            type="hidden"
            {...register("photoUrl", {
              required: "صورة الطالب مطلوبة",
            })}
          />
          {errors.photoUrl?.message && (
            <p className="text-red-400 text-sm mt-2">
              {errors.photoUrl.message.toString()}
            </p>
          )}
        </div>

        {/* ✅ بيانات الاتصال */}
        <div className="space-y-7">
          <h2 className="text-2xl text-end">بيانات الاتصال</h2>
          <div className="grid grid-cols-2 gap-5">
            <StudentInformation
              errors={errors}
              register={register}
              data={ContactInformationInput}
              required={true}
            />
          </div>
        </div>

        {/* ✅ بيانات التعليم */}
        <div className="space-y-7">
          <h2 className="text-2xl text-end">بيانات التعليم</h2>
          <div className="grid grid-cols-2 gap-5">
            <StudentInformation
              errors={errors}
              register={register}
              data={EducationData}
              required={true}
            />
          </div>
        </div>

        {/* ✅ بيانات إضافية */}
        <div className="space-y-7">
          <h2 className="text-2xl text-end">بيانات اضافيه</h2>
          <div className="grid grid-cols-2 gap-5">
            <StudentInformation
              errors={errors}
              register={register}
              data={AdditionalData}
              required={false}
            />
          </div>
        </div>

        {/* ✅ زر الحفظ */}
        <div className="flex justify-end mt-8">
          <button
            type="submit"
            className="bg-orange-600 hover:bg-orange-700 text-white py-2 px-6 rounded-lg transition"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                جاري الحفظ...
              </div>
            ) : (
              "حفظ بيانات الطالب"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateStudent;
