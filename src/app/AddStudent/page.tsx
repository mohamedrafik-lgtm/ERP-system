"use client"
// import { RenderStudentInput } from "@/components/AddStudent/addSTinput"
import { StudentInformation } from "@/components/AddStudent/RenderInputs/StudentInformation"
import StudentImageUpload from "@/components/AddStudent/StudentImageUpload"
import {AdditionalData, BasicDataInput, ContactInformationInput, EducationData} from "@/data"
import { IFormValues } from "@/interface"
import { studentFormSchema } from "@/Schema/AddStudent"
import { yupResolver } from "@hookform/resolvers/yup"
import { SubmitHandler, useForm } from "react-hook-form"
import { useAddTraineeMutation } from "@/lip/features/trainees/traineesApi"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import { selectIsAuthenticated, selectToken } from "@/lip/features/auth/authSlice"
import Cookies from 'js-cookie'
import toast from "react-hot-toast"

const AddStudent = () => {
    const [addTrainee, { isLoading, isError }] = useAddTraineeMutation();
    const [uploadedImage, setUploadedImage] = useState<File | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const router = useRouter();
    
    // التحقق من حالة تسجيل الدخول
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const token = useSelector(selectToken);
    
    useEffect(() => {
      // التحقق من وجود التوكن
      const cookieToken = Cookies.get('auth_token');
      
      // طباعة حالة المصادقة والتوكن للتحقق
      console.log('Authentication state:', { isAuthenticated, token, cookieToken });
      
      // طباعة جميع الكوكيز للتحقق
      console.log('All cookies:', document.cookie);
      
      // طباعة قيمة التوكن من الكوكيز مباشرة
      console.log('Direct cookie value:', document.cookie
        .split('; ')
        .find(row => row.startsWith('auth_token='))
        ?.split('=')[1]);
      
      // إذا لم يكن المستخدم مسجل الدخول، قم بتوجيهه إلى صفحة تسجيل الدخول
      if (!isAuthenticated && !cookieToken) {
        console.warn('User not authenticated, redirecting to login');
        router.push('/login');
      }
    }, [isAuthenticated, token, router]);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
      } = useForm<IFormValues>({
        resolver: yupResolver(studentFormSchema),
        mode: 'onBlur', // تفعيل التحقق عند فقدان التركيز
      });
    
    console.log(errors);
    
    const onSubmit: SubmitHandler<IFormValues> = async (data) => {
      try {
        setErrorMessage(null);
        setSuccessMessage(null);
        
        // طباعة البيانات المرسلة للتحقق من القيم
        console.log('Form data being submitted:', {
          enrollmentType: data.admissionSystem,
          maritalStatus: data.maritalState,
          programType: data.programType,
          gender: data.gender,
          educationType: data.TypeOfEducation
        });
        
        // التحقق من وجود التوكن قبل إرسال الطلب
        const authToken = token || Cookies.get('auth_token');
        console.log('Token before submission:', authToken);
        
        if (!authToken) {
          setErrorMessage('لم يتم العثور على توكن المصادقة. يرجى تسجيل الدخول مرة أخرى.');
          setTimeout(() => {
            router.push('/login');
          }, 2000);
          return;
        }
        
        // إذا كان هناك صورة، قم بتحويلها إلى Base64 لإرسالها كجزء من JSON
        let photoUrlBase64 = '';
        if (uploadedImage) {
          photoUrlBase64 = await convertFileToBase64(uploadedImage);
        }
        
        // إنشاء كائن البيانات بالتنسيق المطلوب للباك إند
        const traineeData = {
          nameAr: data.nameArabic,
          nameEn: data.nameEnglish,
          enrollmentType: data.admissionSystem,
          maritalStatus: data.maritalState,
          nationalId: data.nationalId,
          idIssueDate: data.releaseDate,
          idExpiryDate: data.expirationDate,
          programType: data.programType,
          nationality: data.nationality,
          gender: data.gender,
          birthDate: data.dateOfBirth,
          residenceAddress: data.placeOfBirth,
          photoUrl: photoUrlBase64 || data.photoUrl || '',
          religion: data.religion,
          programId:  parseInt(data.program) ,
          country: data.The_state,
          governorate: data.Governorate,
          city: data.city,
          address: data.address,
          phone: data.mobileNumber,
          email: data.email,
          guardianPhone: data.ParentMobile,
          guardianEmail: data.ParentEmail,
          guardianJob: data.GuardianJob,
          guardianRelation: data.RelationshipWithTheGuardian,
          guardianNationalId: data.NationalIDOfTheGuardian,
          landline: data.Landline || undefined,
          whatsapp: data.whatsapp || undefined,
          facebook: data.facebook || undefined,
          educationType: data.TypeOfEducation,
          schoolName: data.School_Center_Name,
          graduationDate: data.DateOfObtainingTheQualification,
          totalGrade: parseInt(data.HighSchoolTotal) || 0,
          gradePercentage: parseFloat(data.HighSchoolPercentage) || 0,
          sportsActivity: data.SportsActivity || undefined,
          culturalActivity: data.CulturalAndArtisticActivity || undefined,
          educationalActivity: data.ScientificActivity || undefined,
          notes: data.comments || undefined
        };
        
        console.log('Submitting trainee data with token:', authToken);
        
        // استخدام API الجديد لإضافة الطالب
        const response = await addTrainee(traineeData).unwrap();
        console.log('API response:', response);
        
        // عرض رسالة نجاح
        setSuccessMessage('تم إضافة الطالب بنجاح');
        toast.success('تم اضافه متدرب بنجاح');
        // الانتقال إلى صفحة قائمة الطلاب بعد إضافة الطالب بنجاح
        // setTimeout(() => {
        //   router.push('/AllStudent');
        // }, 2000);
      } catch (err: unknown) {
        console.error('Failed to add student:', err);
        
        // التعامل مع أخطاء إضافة الطالب
        if (err && typeof err === 'object' && 'data' in err) {
          const errorData = err as { data?: { message?: string }, status?: number };
          
          // طباعة تفاصيل الخطأ
          console.error('Error details:', errorData);
          
          // إذا كان الخطأ 401 (Unauthorized)، قم بتوجيه المستخدم إلى صفحة تسجيل الدخول
          if (errorData.status === 401) {
            setErrorMessage('انتهت صلاحية الجلسة. يرجى تسجيل الدخول مرة أخرى.');
            setTimeout(() => {
              router.push('/login');
            }, 2000);
          } else {
            setErrorMessage(errorData.data?.message || 'حدث خطأ أثناء إضافة الطالب');
          }
        } else {
          setErrorMessage('حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.');
        }
      }
    }

    // تحويل الملف إلى Base64
    const convertFileToBase64 = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
      });
    };

    const handleImageUpload = (file: File, preview: string) => {
        // تخزين الملف لإرساله لاحقًا
        setUploadedImage(file);
        
        // تعيين قيمة photoUrl في النموذج مباشرة
        setValue('photoUrl', preview);
    }

    // إذا كان التحقق من المصادقة جارياً، اعرض شاشة التحميل
    if (!isAuthenticated && !Cookies.get('auth_token')) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">جاري التحقق من حالة تسجيل الدخول...</p>
          </div>
        </div>
      );
    }

    return (
        <div className="pb-16">
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-9/12 mx-auto space-y-5 pt-5">
                <h1 className="text-3xl font-bold">اضافه طالب</h1>
                
                {/* رسائل النجاح والخطأ */}
                {successMessage && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                    <p className="text-center">{successMessage}</p>
                  </div>
                )}
                
                {(isError || errorMessage) && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    <p className="text-center">
                      {errorMessage || "حدث خطأ أثناء إضافة الطالب. يرجى المحاولة مرة أخرى."}
                    </p>
                  </div>
                )}
                
                <div className="space-y-7">
                    <h2 className="text-2xl text-end">البيانات الاساسيه</h2>
                    <div className="grid grid-cols-2 gap-5">
                      <StudentInformation errors={errors} register={register} data={BasicDataInput} required={true} />
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl text-end mb-4">صورة الطالب <span className="text-red-500">*</span></h2>
                    <StudentImageUpload onImageUpload={handleImageUpload} />
                    {/* حقل مخفي لتخزين قيمة الصورة */}
                    <input type="hidden" {...register('photoUrl', { required: "صورة الطالب مطلوبة" })} />
                    {errors.photoUrl?.message && (
                      <p className="text-red-400 text-sm mt-2">
                        {errors.photoUrl.message.toString()}
                      </p>
                    )}
                </div>
                <div className="space-y-7">
                    <h2 className="text-2xl text-end">بيانات الاتصال</h2>
                    <div className="grid grid-cols-2 gap-5">
                    <StudentInformation errors={errors} register={register} data={ContactInformationInput} required={true} />
                    </div>
                </div>
                <div className="space-y-7">
                    <h2 className="text-2xl text-end">بيانات التعليم</h2>
                    <div className="grid grid-cols-2 gap-5">
                      <StudentInformation errors={errors} register={register} data={EducationData} required={true} />
                    </div>
                </div>
                <div className="space-y-7">
                    <h2 className="text-2xl text-end">بيانات اضافيه</h2>
                    <div className="grid grid-cols-2 gap-5">
                    <StudentInformation errors={errors} register={register} data={AdditionalData} required={false} />
                    </div>
                </div>
                
                <div className="flex justify-end mt-8">
                    <button 
                        type="submit" 
                        className="bg-orange-600 hover:bg-orange-700 text-white py-2 px-6 rounded-lg transition"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                          <div className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            جاري الحفظ...
                          </div>
                        ) : 'حفظ بيانات الطالب'}
                    </button>
                </div>
            </form>
        </div>
    )
}
export default AddStudent;