import { IAddStudent, IAttendanceAndDeparture } from "@/interface";
import { Account } from "@/interface";


export const BasicDataInput: IAddStudent[] = [
  { name: "nameAr", type: "text", placeholder: "ضع الاسم بالعربيه", label: "الاسم عربي", id: "arabicName" },
  { name: "nameEn", type: "text", placeholder: "ضع الاسم بالأنجليزيه", label: "الاسم انجليزي", id: "EnglishName" },
  { 
    name: "enrollmentType", 
    type: "select", 
    placeholder: "اختر نظام", 
    label: "نظام الإلتحاق", 
    id: "enrollmentTypeid",
    options: [
      { value: "REGULAR", label: "منتظم" },
      { value: "DISTANCE", label: "عن بعد" },
      { value: "BOTH", label: "الاثنان معاً" }
    ]
  },
  { 
    name: "maritalStatus", 
    type: "select", 
    placeholder: "اختر", 
    label: "الحاله الاجتماعيه", 
    id: "maritalStatus",
    options: [
      { value: "SINGLE", label: "أعزب" },
      { value: "MARRIED", label: "متزوج" },
      { value: "DIVORCED", label: "مطلق" },
      { value: "WIDOWED", label: "أرمل" }
    ]
  },
  { name: "marketer", type: "text", placeholder: "ضع اسم المسوق", label: "اسم المسوق", id: "marketerId" },
  { name: "nationalId", type: "text", placeholder: "ضع الرقم القومي", label: "الرقم القومي", id: "nationalId" },
  { name: "idIssueDate", type: "date", placeholder: "", label: "تاريخ الاصدار", id: "idIssueDate" },
  { name: "idExpiryDate", type: "date", placeholder: "", label: "تاريخ الانتهاء", id: "idExpiryDate" },
  { 
    name: "programType", 
    type: "select", 
    placeholder: "اختار نوع البرنامج", 
    label: "نوع البرنامج", 
    id: "programType",
    options: [
      { value: "SUMMER", label: "صيفي" },
      { value: "WINTER", label: "شتوي" },
      { value: "ANNUAL", label: "سنوي" }
    ]
  },
  { 
    name: "gender", 
    type: "select", 
    placeholder: "ذكر ام انثي؟", 
    label: "الجنس", 
    id: "genderId",
    options: [
      { value: "MALE", label: "ذكر" },
      { value: "FEMALE", label: "أنثى" }
    ]
  },
  { name: "nationality", type: "text", placeholder: "اختر جنسيه الطالب", label: "الجنسيه", id: "nationalityId" },
  { name: "birthDate", type: "date", placeholder: "", label: "تاريخ الميلاد", id: "dateOfBirth" },
  { name: "birthDate", type: "date", placeholder: "", label: "تاريخ الميلاد", id: "dateOfBirth" },
  { name: "createdAt", type: "date", placeholder: "", label: "تاريخ الانشأ", id: "dateOfBirth" },
  { name: "updatedAt", type: "date", placeholder: "", label: "تاريخ التعديل", id: "dateOfBirth" },
  { name: "residenceAddress", type: "text", placeholder: "محل الميلاد", label: "محل الميلاد", id: "residenceAddress" },
  { name: "religion", type: "text", placeholder: "حدد ديانه الطالب", label: "الديانه", id: "religionId" },
  { name: "program", type: "select", placeholder: "اختار البرنامج", label: "البرنامج", id: "programId" ,
    options: [
      { value: 1, label: "ذكاء اصطناعي" },
      { value: 2, label: "هندسه برمجيات" }
    ]
  }
];

export const ContactInformationInput:IAddStudent[] = [
    {
        name: "country",
        type: "text",
        placeholder: "الدوله",
        label: "الدوله",
        id: "TheState"
    },
    {
        name: "governorate",
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
        name: "phone",
        type: "text",
        placeholder: "رقم الهاتف",
        label: "رقم الهاتف",
        id: "phoneId"
    },
    {
        name: "email",
        type: "text",
        placeholder: "الايميل",
        label: "الايميل",
        id: "emailId"
    },
    {
        name: "guardianPhone",
        type: "text",
        placeholder: "رقم ولي الامر",
        label: "رقم ولي الامر",
        id: "Parent's_mobileId"
    },
    {
        name: "guardianEmail",
        type: "text",
        placeholder: "ايميل ولي الامر",
        label: "ايميل ولي الامر",
        id: "Parent's_emailId"
    },
    {
        name: "guardianJob",
        type: "text",
        placeholder: " وظيفه ولي الامر",
        label: "وظيفه ولي الامر",
        id: "Guardian's_jobId"
    },
    {
        name: "guardianRelation",
        type: "text",
        placeholder: "صله القرابه مع ولي الامر",
        label: "صله القرابه مع ولي الامر",
        id: "guardianRelationId"
    },
    {
        name: "guardianNationalId",
        type: "text",
        placeholder: "الرقم القومي لولي الامر",
        label: "الرقم القومي لولي الامر",
        id: "National-ID-of-the-guardianId"
    },
    {
        name: "landline",
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
        name: "educationType",
        type: "select",
        placeholder: "اختر نوع التعليم",
        label: "نوع التعليم",
        id: "educationTypeId",
        options: [
            { value: "PREPARATORY", label: "إعدادي" },
            { value: "INDUSTRIAL_SECONDARY", label: "ثانوي صناعي" },
            { value: "COMMERCIAL_SECONDARY", label: "ثانوي تجاري" },
            { value: "AGRICULTURAL_SECONDARY", label: "ثانوي زراعي" },
            { value: "AZHAR_SECONDARY", label: "ثانوي أزهري" },
            { value: "GENERAL_SECONDARY", label: "ثانوية عامة" },
            { value: "UNIVERSITY", label: "جامعي" },
            { value: "INDUSTRIAL_APPRENTICESHIP", label: "تلمذة صناعية" }
        ]
    },
    {
        name: "schoolName",
        type: "text",
        placeholder: "إسم المدرسة/المركز:",
        label: "إسم المدرسة/المركز:",
        id: "School/Center Name:Id"
    },
    {
        name: "graduationDate",
        type: "date",
        placeholder: "تاريخ الحصول على المؤهل",
        label: "تاريخ الحصول على المؤهل",
        id: "Date-of-obtaining-the-qualificationId"
    },{
        name: "totalGrade",
        type: "text",
        placeholder: "مجموع الثانوية ",
        label: "مجموع الثانوية ",
        id: "High-school-totalId"
    },
    {
        name: "gradePercentage",
        type: "text",
        placeholder: "نسبة الثانوية",
        label: "نسبة الثانوية",
        id: "High-school-percentageId"
    }
]
export const AdditionalData:IAddStudent[] = [
    {
        name: "sportsActivity",
        type: "text",
        placeholder: "النشاط الرياضي",
        label: "النشاط الرياضي",
        id: "Sports-activityId"
    },{
        name: "culturalActivity",
        type: "text",
        placeholder: " النشاط الثقافي والفني",
        label: "النشاط الثقافي والفني",
        id: "Cultural-and-artistic-activityId"
    }, {
        name: "educationalActivity",
        type: "text",
        placeholder: "النشاط العلمي",
        label: "النشاط العلمي",
        id: "Scientific-activityId"
    },{
        name: "notes",
        type: "text",
        placeholder: "الملاحظات",
        label: "الملاحظات",
        id: "notesId"
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
      id: "1",
    },
    {
      photo: "/avatar2.png",
      name: "إيثان هاربر",
      fileNumber: "67890",
      landline: "555-2468",
      phone: "555-9012",
      specialization: "تطوير الويب",
      dues: "$300",
        id: "2",
    },
    {
      photo: "/avatar3.png",
      name: "أوليفيا بينيت",
      fileNumber: "11223",
      landline: "555-3690",
      phone: "555-3456",
      specialization: "تصميم واجهات المستخدم",
      dues: "$200",
        id: "3",
    },
    {
      photo: "/avatar4.png",
      name: "كاليب فوستر",
      fileNumber: "44556",
      landline: "555-4812",
      phone: "555-7890",
      specialization: "تطوير تطبيقات الجوال",
      dues: "$400",
        id: "4",
    },
    {
      photo: "/avatar5.png",
      name: "آفا غرين",
      fileNumber: "77889",
      landline: "555-5034",
      phone: "555-1234",
      specialization: "التسويق الرقمي",
      dues: "$100",
        id: "5",
    },
    {
      photo: "/avatar6.png",
      name: "ليام هايز",
      fileNumber: "99001",
      landline: "555-6266",
      phone: "555-5678",
      specialization: "الأمن السيبراني",
      dues: "$600",
        id: "6",
    },
    {
      photo: "/avatar7.png",
      name: "إيزابيلا إنغرام",
      fileNumber: "22354",
      landline: "555-7478",
      phone: "555-9012",
      specialization: "الحوسبة السحابية",
      dues: "$250",
        id: "7",
    },
    {
      photo: "/avatar8.png",
      name: "جاكسون جنكينز",
      fileNumber: "55667",
      landline: "555-8690",
      phone: "555-3456",
      specialization: "إدارة المشاريع",
      dues: "$350",
        id: "8",
    },
    {
      photo: "/avatar9.png",
      name: "ميا كلارك",
      fileNumber: "88990",
      landline: "555-9812",
      phone: "555-7890",
      specialization: "تحليل الأعمال",
      dues: "$450",
        id: "9",
    },
    {
      photo: "/avatar10.png",
      name: "لوكاس إيفانز",
      fileNumber: "11225",
      landline: "555-1034",
      phone: "555-1234",
      specialization: "الذكاء الاصطناعي وتعلم الآلة",
      dues: "$550",
        id: "10",
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
  export const transactions = [
    { date: '2023-08-15', description: 'رسوم التسجيل', type: 'إضافة', amount: 5000, status: 'قيد الانتظار' },
    { date: '2023-08-20', description: 'الدفعة الأولى', type: 'دفع', amount: 2000, status: 'مكتمل' },
    { date: '2023-09-15', description: 'قسط شهري', type: 'دفع', amount: 1000, status: 'مكتمل' },
    { date: '2023-10-15', description: 'قسط شهري', type: 'دفع', amount: 500, status: 'مكتمل' },
    { date: '2023-11-15', description: 'رسوم تأخير', type: 'إضافة', amount: 100, status: 'قيد الانتظار' },
  ];

  export const  payments = [
  {
    id: 1,
    name: "رسوم مقدم برنامج الذكاء الاصطناعى (مبتدئ+متقدم)",
    amount: 2400,
    total: 0,
    paid: 0,
    by: "Raed osman",
  },
  {
    id: 2,
    name: "رسوم القسط الأول برنامج الذكاء الاصطناعى (مبتدئ+متقدم)",
    amount: 800,
    total: 0,
    paid: 0,
    by: "Raed osman",
  },
  {
    id: 3,
    name: "رسوم القسط الثانى برنامج الذكاء الاصطناعى (مبتدئ+متقدم)",
    amount: 800,
    total: 0,
    paid: 0,
    by: "Raed osman",
  },
  {
    id: 4,
    name: "رسوم القسط الثالث برنامج الذكاء الاصطناعى (مبتدئ+متقدم)",
    amount: 800,
    total: 0,
    paid: 0,
    by: "Raed osman",
  },
  {
    id: 5,
    name: "رسوم القسط الرابع برنامج الذكاء الاصطناعى (مبتدئ+متقدم)",
    amount: 800,
    total: 0,
    paid: 0,
    by: "Raed osman",
  },
  {
    id: 6,
    name: "رسوم القسط الخامس برنامج الذكاء الاصطناعى (مبتدئ+متقدم)",
    amount: 800,
    total: 0,
    paid: 0,
    by: "Raed osman",
  },
  {
    id: 7,
    name: "رسوم القسط السادس برنامج الذكاء الاصطناعى (مبتدئ+متقدم)",
    amount: 800,
    total: 0,
    paid: 0,
    by: "Raed osman",
  },
  {
    id: 8,
    name: "رسوم القسط السابع برنامج الذكاء الاصطناعى (مبتدئ+متقدم)",
    amount: 800,
    total: 0,
    paid: 0,
    by: "Raed osman",
  },
  {
    id: 9,
    name: "رسوم القسط الثامن برنامج الذكاء الاصطناعى (مبتدئ+متقدم)",
    amount: 800,
    total: 0,
    paid: 0,
    by: "Raed osman",
  },
  {
    id: 10,
    name: "رسوم القسط التاسع برنامج الذكاء الاصطناعى (مبتدئ+متقدم)",
    amount: 800,
    total: 0,
    paid: 0,
    by: "Raed osman",
  },
];

export const users = [
  { id: 1, name: "Ahmed Gad", group: "5", report: "تقارير", program: "مشرف أقسام" },
  { id: 2, name: "Ahmed Qasem", group: "4", report: "تقارير", program: "مشرف أقسام" },
  { id: 3, name: "Raed osman", group: "2", report: "تقارير", program: "مشرف أقسام" },
  { id: 4, name: "احمد بدران", group: "3", report: "تقارير", program: "مشرف أقسام" },
  { id: 5, name: "احمد عثمان", group: "1", report: "تقارير", program: "مشرف أقسام" },
  { id: 6, name: "محمد اشرف", group: "5", report: "تقارير", program: "مشرف أقسام" },
  { id: 7, name: "سعيد عبد الله", group: "6", report: "تقارير", program: "مشرف أقسام" },
  { id: 8, name: "محمود كمال", group: "5", report: "تقارير", program: "مشرف أقسام" },
  { id: 9, name: "Ali Omar", group: "4", report: "تقارير", program: "مشرف أقسام" },
  { id: 10, name: "Nora Ahmed", group: "3", report: "تقارير", program: "مشرف أقسام" }
];

export const studentActions = [
  "الحضور والغياب",
  "الرسوم و المديونية",
  "حجب نتيجة المتدرب",
  "حذف البيانات المالية كاملة",
  "مدفوعات المتدرب",
  "تغيير سكشن عملي",
  "تغيير سكشن نظري",
  "اثبات قيد",
  "طلبات إدارية",
  "إفادة للمتدرب",
  "شهادة فصل",
  "كارنيه المتدرب",
  "كارنيه التأمين",
  "ارشيف المتدرب",
  "ارشيف المتدرب",
  "سحب ملف",
  "الإجراءات العقابية"
];
export const stats = [
  { title: 'Total Students', value: '250' },
  { title: 'Active Courses', value: '15' },
  { title: 'Payments Received', value: '$12,500', color: 'text-green-600' },
];

export const activities = [
  {
    date: '2024-03-15',
    activity: 'New Student Enrollment',
    details: "Liam Carter enrolled in 'Introduction to Programming'",
  },
  {
    date: '2024-03-14',
    activity: 'Payment Received',
    details: "$500 payment received from Olivia Bennett for 'Advanced Calculus'",
  },
  {
    date: '2024-03-12',
    activity: 'Course Created',
    details: "New course 'Digital Marketing Fundamentals' created by Professor Harper",
  },
  {
    date: '2024-03-10',
    activity: 'Student Updated',
    details: "Sophia Clark's profile updated with new contact information",
  },
  {
    date: '2024-03-08',
    activity: 'Report Generated',
    details: 'Monthly financial report generated and downloaded',
  },
];

export const ReviewOfFinancialRestrictionsData = [
  {
    id: 330,
    image: "--",
    date: "2025-05-13",
    createdBy: "Raed osman",
    toAccount: "حساب ( FULL STACK ) رسوم القسط السادس [3-1648]",
    fromAccount: "خزينة عمومية [348-132]",
    amount: 800,
    details: "تفاصيل"
  },
  {
    id: 329,
    image: "--",
    date: "2025-05-13",
    createdBy: "Raed osman",
    toAccount: "حساب ( FULL STACK ) رسوم القسط الخامس [3-1647]",
    fromAccount: "خزينة عمومية [348-132]",
    amount: 800,
    details: "تفاصيل"
  },
  {
    id: 328,
    image: "--",
    date: "2025-05-13",
    createdBy: "Raed osman",
    toAccount: "حساب ( FULL STACK ) رسوم القسط الرابع [3-1646]",
    fromAccount: "خزينة عمومية [348-132]",
    amount: 800,
    details: "تفاصيل"
  },
  {
    id: 327,
    image: "--",
    date: "2025-05-13",
    createdBy: "Raed osman",
    toAccount: "حساب ( FULL STACK ) رسوم القسط الثالث [3-1645]",
    fromAccount: "خزينة عمومية [348-132]",
    amount: 800,
    details: "تفاصيل"
  },
  {
    id: 325,
    image: "--",
    date: "2025-05-13",
    createdBy: "Raed osman",
    toAccount: "حساب ( FULL STACK ) رسوم القسط الأول [3-1643]",
    fromAccount: "خزينة عمومية [348-132]",
    amount: 800,
    details: "تفاصيل"
  }
  // ويمكنك متابعة إدخال باقي الصفوف بنفس النمط...
];

export const ExchangeAndPaymentRequestsTransactions = [
  {
    id: 337,
    BeneficiaryName: "ابراهيم عمرو ابراهيم محمد احمد",
    by: "Raed osman",
    fromAccount: "[]",
    toAccount: "حساب رسوم القسط السادس ( FULL STACK ) [3-1648]",
    date: "2025-05-13",
    amount: 800,
    paid: "---",
    status: "مرفوض"
  },
  {
    id: 336,
    BeneficiaryName: "محمد اسامه طه سيد بهنس",
    by: "Raed osman",
    fromAccount: "خزنة عمومية [348-132]",
    toAccount: "حساب رسوم القسط السادس ( FULL STACK ) [3-1648]",
    date: "2025-05-13",
    amount: 800,
    paid: 800,
    status: "مفعل"
  },
  {
    id: 335,
    BeneficiaryName: "محمد اسامه طه سيد بهنس",
    by: "Raed osman",
    fromAccount: "خزنة عمومية [348-132]",
    toAccount: "حساب رسوم القسط الخامس ( FULL STACK ) [3-1647]",
    date: "2025-05-13",
    amount: 800,
    paid: 800,
    status: "مفعل"
  },
  {
    id: 334,
    BeneficiaryName: "محمد اسامه طه سيد بهنس",
    by: "Raed osman",
    fromAccount: "خزنة عمومية [348-132]",
    toAccount: "حساب رسوم القسط الرابع ( FULL STACK ) [3-1646]",
    date: "2025-05-13",
    amount: 800,
    paid: 800,
    status: "مفعل"
  },
  {
    id: 333,
    BeneficiaryName: "محمد اسامه طه سيد بهنس",
    by: "Raed osman",
    fromAccount: "خزنة عمومية [348-132]",
    toAccount: "حساب رسوم القسط الثالث ( FULL STACK ) [3-1645]",
    date: "2025-05-13",
    amount: 800,
    paid: 800,
    status: "مفعل"
  },
  {
    id: 332,
    BeneficiaryName: "محمد اسامه طه سيد بهنس",
    by: "Raed osman",
    fromAccount: "خزنة عمومية [348-132]",
    toAccount: "حساب رسوم القسط الثاني ( FULL STACK ) [3-1644]",
    date: "2025-05-13",
    amount: 800,
    paid: 800,
    status: "مفعل"
  },
  {
    id: 331,
    BeneficiaryName: "محمد اسامه طه سيد بهنس",
    by: "Raed osman",
    fromAccount: "خزنة عمومية [348-132]",
    toAccount: "حساب رسوم القسط الأول ( FULL STACK ) [3-1643]",
    date: "2025-05-13",
    amount: 800,
    paid: 800,
    status: "مفعل"
  },
  {
    id: 330,
    BeneficiaryName: "محمد اسامه طه سيد بهنس",
    by: "Raed osman",
    fromAccount: "خزنة عمومية [348-132]",
    toAccount: "حساب رسوم مقدم ( FULL STACK ) [3-1642]",
    date: "2025-05-13",
    amount: 1900,
    paid: 1900,
    status: "مفعل"
  },
  {
    id: 329,
    BeneficiaryName: "محمد اسامه طه سيد بهنس",
    by: "Raed osman",
    fromAccount: "خزنة عمومية [348-132]",
    toAccount: "حساب رسوم ملف تقديم [3-1641]",
    date: "2025-05-13",
    amount: 500,
    paid: 500,
    status: "مفعل"
  },
  {
    id: 328,
    BeneficiaryName: "فاطمه عطيه محمد محمد بركات",
    by: "Raed osman",
    fromAccount: "خزنة عمومية [348-132]",
    toAccount: "حساب رسوم ملف تقديم [3-1641]",
    date: "2025-05-13",
    amount: 500,
    paid: 500,
    status: "مفعل"
  }
];
export const Bank = [
    { 
        id:1,
        name: "هندسه البرمجيات",
        QustionsCount: 12,
    },
    {
        id:2,
        name: "هندسه البرمجيات",
        QustionsCount: 12,
    },
    {
        id:3,
        name: "هندسه البرمجيات",
        QustionsCount: 12,
    },
    {
        id:4,
        name: "هندسه البرمجيات",
        QustionsCount: 12,
    },
    {
        id:5,
        name: "هندسه البرمجيات",
        QustionsCount: 12,
    }
]




export const accounts: Account[] = [
  {
    id: 1, name: "الأصول", code: "100", debit: 10000, credit: 2000, parentId: null,
    balance: 0,
    type: ""
  },
  {
    id: 2, name: "الأصول المتداولة", code: "110", debit: 5000, credit: 1000, parentId: 1,
    balance: 0,
    type: ""
  },
  {
    id: 3, name: "الصندوق", code: "111", debit: 2000, credit: 0, parentId: 2,
    balance: 0,
    type: ""
  },
  {
    id: 4, name: "البنك", code: "112", debit: 3000, credit: 1000, parentId: 2,
    balance: 0,
    type: ""
  },
  {
    id: 5, name: "المصروفات", code: "200", debit: 8000, credit: 4000, parentId: null,
    balance: 0,
    type: ""
  },
  {
    id: 6, name: "رواتب", code: "210", debit: 5000, credit: 2000, parentId: 5,
    balance: 0,
    type: ""
  },
  {
    id: 7, name: "إيجار", code: "220", debit: 3000, credit: 2000, parentId: 5,
    balance: 0,
    type: ""
  },
];

export const AttendanceAndDepartureData :IAttendanceAndDeparture[] = [
  {
    id: 1,
    DateOfAttendance: "2025-06-19",
    DepartureTime: "04:28:30",
    day: "الاحد"
  },
  {
    id:2,
    DateOfAttendance: "2025-06-18",
    DepartureTime: "04:28:30",
    day: "السبت"
  },
  {
    id: 3,
    DateOfAttendance: "2025-06-17",
    DepartureTime: "04:28:30",
    day: "الاربع"
  },
  {
    id: 4,
    DateOfAttendance: "2025-06-16",
    DepartureTime: "04:28:30",
    day: "الثلاث"
  },
  {
    id: 5,
    DateOfAttendance: "2025-06-15",
    DepartureTime: "04:28:30",
    day: "الاثنان"
  },
  {
    id: 6,
    DateOfAttendance: "2025-06-14",
    DepartureTime: "04:28:30",
    day: "الخميس"
  },
]

export const enumOptions = {
  enrollmentType: {
    REGULAR: 'منتظم',
    DISTANCE: 'عن بعد',
    BOTH: 'كلاهما'
  },
  maritalStatus: {
    SINGLE: 'أعزب',
    MARRIED: 'متزوج',
    DIVORCED: 'مطلق',
    WIDOWED: 'أرمل'
  },
  programType: {
    SUMMER: 'صيفي',
    WINTER: 'شتوي',
    ANNUAL: 'سنوي'
  },
  Gender: {
    MALE: 'ذكر',
    FEMALE: 'أنثى'
  },
  Religion: {
    ISLAM: 'الإسلام',
    CHRISTIANITY: 'المسيحية',
    JUDAISM: 'اليهودية'
  },
  IEducationType: {
    PREPARATORY: 'إعدادي',
    INDUSTRIAL_SECONDARY: 'ثانوي صناعي',
    COMMERCIAL_SECONDARY: 'ثانوي تجاري',
    AGRICULTURAL_SECONDARY: 'ثانوي زراعي',
    AZHAR_SECONDARY: 'ثانوي أزهري',
    GENERAL_SECONDARY: 'ثانوي عام',
    UNIVERSITY: 'جامعي',
    INDUSTRIAL_APPRENTICESHIP: 'تدريب صناعي'
  },
  ITraineeStatus: {
    NEW: 'جديد',
    CURRENT: 'حالي',
    GRADUATE: 'خريج',
    WITHDRAWN: 'منسحب'
  },
  IClassLevel: {
    FIRST: 'الأول',
    SECOND: 'الثاني',
    THIRD: 'الثالث',
    FOURTH: 'الرابع'
  }
};
