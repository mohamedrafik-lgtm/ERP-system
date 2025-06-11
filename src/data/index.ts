import { IAddStudent } from "@/interface";

export const BasicDataInput:IAddStudent[] = [
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
export const ContactInformationInput:IAddStudent[] = [
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
export const EducationData:IAddStudent[] = [
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
export const AdditionalData:IAddStudent[] = [
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

export const students = [
    {
      photo: "/avatar1.png",
      name: "سوفيا ميتشل",
      fileNumber: "12345",
      landline: "555-1234",
      phone: "555-5678",
      specialization: "علوم البيانات",
      dues: "$500",
    },
    {
      photo: "/avatar2.png",
      name: "إيثان هاربر",
      fileNumber: "67890",
      landline: "555-2468",
      phone: "555-9012",
      specialization: "تطوير الويب",
      dues: "$300",
    },
    {
      photo: "/avatar3.png",
      name: "أوليفيا بينيت",
      fileNumber: "11223",
      landline: "555-3690",
      phone: "555-3456",
      specialization: "تصميم واجهات المستخدم",
      dues: "$200",
    },
    {
      photo: "/avatar4.png",
      name: "كاليب فوستر",
      fileNumber: "44556",
      landline: "555-4812",
      phone: "555-7890",
      specialization: "تطوير تطبيقات الجوال",
      dues: "$400",
    },
    {
      photo: "/avatar5.png",
      name: "آفا غرين",
      fileNumber: "77889",
      landline: "555-5034",
      phone: "555-1234",
      specialization: "التسويق الرقمي",
      dues: "$100",
    },
    {
      photo: "/avatar6.png",
      name: "ليام هايز",
      fileNumber: "99001",
      landline: "555-6266",
      phone: "555-5678",
      specialization: "الأمن السيبراني",
      dues: "$600",
    },
    {
      photo: "/avatar7.png",
      name: "إيزابيلا إنغرام",
      fileNumber: "22354",
      landline: "555-7478",
      phone: "555-9012",
      specialization: "الحوسبة السحابية",
      dues: "$250",
    },
    {
      photo: "/avatar8.png",
      name: "جاكسون جنكينز",
      fileNumber: "55667",
      landline: "555-8690",
      phone: "555-3456",
      specialization: "إدارة المشاريع",
      dues: "$350",
    },
    {
      photo: "/avatar9.png",
      name: "ميا كلارك",
      fileNumber: "88990",
      landline: "555-9812",
      phone: "555-7890",
      specialization: "تحليل الأعمال",
      dues: "$450",
    },
    {
      photo: "/avatar10.png",
      name: "لوكاس إيفانز",
      fileNumber: "11225",
      landline: "555-1034",
      phone: "555-1234",
      specialization: "الذكاء الاصطناعي وتعلم الآلة",
      dues: "$550",
    },
  ];

  interface IProgram {
    program_name: string;
    description: string;
    duration: string;
    fees: string;       
    }
export  const programs : IProgram[]= [
    {
      program_name: "Software Engineering Bootcamp",
      description: "Intensive program covering software development fundamentals.",
      duration: "12 weeks",
      fees: "$8,000"
    },
    {
      program_name: "Data Science Fundamentals",
      description: "Introduction to data analysis, machine learning, and data visualization.",
      duration: "8 weeks",
      fees: "$6,000"
    },
    {
      program_name: "Digital Marketing Mastery",
      description: "Comprehensive course on digital marketing strategies and tools.",
      duration: "10 weeks",
      fees: "$7,500"
    },
    {
      program_name: "UX/UI Design Essentials",
      description: "Learn the principles of user experience and user interface design.",
      duration: "6 weeks",
      fees: "$5,000"
    },
    {
      program_name: "Cybersecurity Professional",
      description: "Training on cybersecurity threats, prevention, and response.",
      duration: "14 weeks",
      fees: "$9,000"
    }
  ]
  