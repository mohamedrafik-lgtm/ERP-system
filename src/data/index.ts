import { IAddSdutind } from "@/interface";

export const BasicBataInput:IAddSdutind[] = [
    {
        name: "admission_system",
        type: "text",
        placeholder: "اختر نظام",
        label: "نظام الإلتحاق",
        id: "admissionSystem"
    },
    {
        name: "fullName",
        type: "text",
        placeholder: "ضع الاسم بالكامل",
        label: "الاسم كامل",
        id: "full_Name"
    },
    {
        name: "marital_state",
        type: "text",
        placeholder: "اختر",
        label: "الحاله الاجتماعيه",
        id: "marital_tate"
    },
    {
        name: "markter",
        type: "text",
        placeholder: "ضع اسم المسوق",
        label: "اسم المسوق",
        id: "markterid"
    },
    {
        name: "national_id",
        type: "text",
        placeholder: "ضع الرقم القومي",
        label: "الرقم القومي",
        id: "nationalid"
    },
    {
        name: "release_date",
        type: "date",
        placeholder: "",
        label: "تاريخ الاصدار",
        id: "releaseDate"
    },
    {
        name: "exprtation_date",
        type: "date",
        placeholder: "",
        label: "تاريخ الانتهاء",
        id: "exprtationDate"
    },
    {
        name: "program_type",
        type: "text",
        placeholder: "اختار نوع البرنامج",
        label: "نوع البرنامج",
        id: "programType"
    },
    {
        name: "gender",
        type: "text",
        placeholder: "ذكر ام انثي؟",
        label: "الجنس",
        id: "genderId"
    },
    {
        name: "nationalty",
        type: "text",
        placeholder: "اختر جنسيه الطالب",
        label: "الجنسيه",
        id: "nationaltyid"
    },
    {
        name: "dateOf_Birth",
        type: "date",
        placeholder: "",
        label: "تاريخ الميلاد",
        id: "date_Of_Berth"
    },
    {
        name: "placeOfBirth",
        type: "text",
        placeholder: "محل الميلاد",
        label: "محل الميلاد",
        id: "place_Of_Birth"
    },
    {
        name: "Religion",
        type: "text",
        placeholder: "حدد ديانه الطالب",
        label: "الديانه",
        id: "ReligionID"
    },
    {
        name: "program",
        type: "text",
        placeholder: "اختار البرنامج",
        label: "البرنامج",
        id: "programid"
    }
];
export const ContactInformationInput:IAddSdutind[] = [
    {
        name: "The_state",
        type: "text",
        placeholder: "الدوله",
        label: "الدوله",
        id: "TheState"
    },
    {
        name: "Governorate",
        type: "text",
        placeholder: "المحافظه",
        label: "المحافظه",
        id: "GovernorateId"
    },{
        name: "city",
        type: "text",
        placeholder: "المدينه ",
        label: "المدينه",
        id: "cityId"
    },{
        name: "address",
        type: "text",
        placeholder: "العنوان",
        label: "العنوان",
        id: "addressId"
    },{
        name: "mobileNumber",
        type: "text",
        placeholder: "رقم الهاتف",
        label: "رقم الهاتف",
        id: "mobileNumberId"
    },
    {
        name: "email",
        type: "text",
        placeholder: "الايميل",
        label: "الايميل",
        id: "emailId"
    },
    {
        name: "Parent's_mobile",
        type: "text",
        placeholder: "رقم ولي الامر",
        label: "رقم ولي الامر",
        id: "Parent's_mobileId"
    },
    {
        name: "Parent's_email",
        type: "text",
        placeholder: "ايميل ولي الامر",
        label: "ايميل ولي الامر",
        id: "Parent's_emailId"
    },
    {
        name: "Guardian's_job",
        type: "text",
        placeholder: " وظيفه ولي الامر",
        label: "وظيفه ولي الامر",
        id: "Guardian's_jobId"
    },
    {
        name: "Relationship_with_the_guardian:",
        type: "text",
        placeholder: "صله القرابه مع ولي الامر",
        label: "صله القرابه مع ولي الامر",
        id: "Relationship_with_the_guardianId"
    },
    {
        name: "National-ID-of-the-guardian",
        type: "text",
        placeholder: "الرقم القومي لولي الامر",
        label: "الرقم القومي لولي الامر",
        id: "National-ID-of-the-guardianId"
    },
    {
        name: "Landline",
        type: "text",
        placeholder: "رقم الهاتف الارضى",
        label: "رقم الهاتف الارضى",
        id: "LandlineId"
    },{
        name: "whatsapp",
        type: "text",
        placeholder: "رقم الواتس اب",
        label: "whatsapp",
        id: "whatsappId"
    },
    {
        name: "facebook",
        type: "text",
        placeholder: "حساب الفيس بوك",
        label: "facebook",
        id: "facebookId"
    }
];
export const EducationData:IAddSdutind[] = [
    {
        name: "Type-of-education",
        type: "text",
        placeholder: "اختر نوع التعليم",
        label: "نوع التعليم",
        id: "Type-of-educationId"
    },
    {
        name: "School/Center Name",
        type: "text",
        placeholder: "إسم المدرسة/المركز:",
        label: "إسم المدرسة/المركز:",
        id: "School/Center Name:Id"
    },
    {
        name: "Date-of-obtaining-the-qualification",
        type: "date",
        placeholder: "تاريخ الحصول على المؤهل",
        label: "تاريخ الحصول على المؤهل",
        id: "Date-of-obtaining-the-qualificationId"
    },{
        name: "High-school-total",
        type: "text",
        placeholder: "مجموع الثانوية ",
        label: "مجموع الثانوية ",
        id: "High-school-totalId"
    },
    {
        name: "High-school-percentage",
        type: "text",
        placeholder: "نسبة الثانوية",
        label: "نسبة الثانوية",
        id: "High-school-percentageId"
    }
]
export const AdditionalData:IAddSdutind[] = [
    {
        name: "Sports-activity",
        type: "text",
        placeholder: "النشاط الرياضي",
        label: "النشاط الرياضي",
        id: "Sports-activityId"
    },{
        name: "Cultural-and-artistic-activity",
        type: "text",
        placeholder: " النشاط الثقافي والفني",
        label: "النشاط الثقافي والفني",
        id: "Cultural-and-artistic-activityId"
    }, {
        name: "Scientific-activity",
        type: "text",
        placeholder: "النشاط العلمي",
        label: "النشاط العلمي",
        id: "Scientific-activityId"
    },{
        name: "comments",
        type: "text",
        placeholder: "الملاحظات",
        label: "الملاحظات",
        id: "commentsId"
    }
]