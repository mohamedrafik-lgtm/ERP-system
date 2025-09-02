export const pageMetadata = {
  '/': {
    title: 'الرئيسية - نظام إدارة التدريب المتقدم',
    description: 'الصفحة الرئيسية لنظام إدارة التدريب المتقدم'
  },
  '/login': {
    title: 'تسجيل الدخول - نظام إدارة التدريب المتقدم',
    description: 'تسجيل الدخول إلى نظام إدارة التدريب المتقدم'
  },
  '/AllStudent': {
    title: 'جميع الطلاب - نظام إدارة التدريب المتقدم',
    description: 'إدارة وعرض جميع الطلاب المسجلين في النظام'
  },
  '/AddStudent': {
    title: 'إضافة طالب جديد - نظام إدارة التدريب المتقدم',
    description: 'إضافة طالب جديد إلى النظام'
  },
  '/EmployeeManagement': {
    title: 'إدارة الموظفين - نظام إدارة التدريب المتقدم',
    description: 'إدارة وعرض جميع الموظفين في النظام'
  },
  '/TraineeFees': {
    title: 'رسوم المتدربين - نظام إدارة التدريب المتقدم',
    description: 'إدارة وعرض رسوم المتدربين'
  },
  '/FinancialStatements': {
    title: 'البيانات المالية - نظام إدارة التدريب المتقدم',
    description: 'عرض وإدارة البيانات المالية للنظام'
  },
  '/FinancialConstraintsTree': {
    title: 'شجرة القيود المالية - نظام إدارة التدريب المتقدم',
    description: 'عرض وإدارة شجرة القيود المالية'
  },
  '/Lockers': {
    title: 'الخزائن - نظام إدارة التدريب المتقدم',
    description: 'إدارة وعرض الخزائن في النظام'
  },
  '/ExchangeAndPaymentRequests': {
    title: 'طلبات الصرف والدفع - نظام إدارة التدريب المتقدم',
    description: 'إدارة طلبات الصرف والدفع'
  },
  '/StudentFinancialReportsid': {
    title: 'التقارير المالية للطلاب - نظام إدارة التدريب المتقدم',
    description: 'عرض التقارير المالية للطلاب'
  },
  '/StudentSections': {
    title: 'أقسام الطلاب - نظام إدارة التدريب المتقدم',
    description: 'إدارة أقسام الطلاب'
  },
  '/Roles': {
    title: 'الأدوار - نظام إدارة التدريب المتقدم',
    description: 'إدارة أدوار المستخدمين في النظام'
  },
  '/TrainingContentManagement': {
    title: 'إدارة المحتوى التدريبي - نظام إدارة التدريب المتقدم',
    description: 'إدارة المحتوى التدريبي والبرامج التعليمية'
  },
  '/TrainingContentManagement/Programs': {
    title: 'البرامج التدريبية - نظام إدارة التدريب المتقدم',
    description: 'إدارة وعرض البرامج التدريبية'
  },
  '/TrainingContentManagement/TrainingContent': {
    title: 'المحتوى التدريبي - نظام إدارة التدريب المتقدم',
    description: 'إدارة وعرض المحتوى التدريبي'
  },
  '/TrainingContentManagement/QuestionBank': {
    title: 'بنك الأسئلة - نظام إدارة التدريب المتقدم',
    description: 'إدارة وعرض بنك الأسئلة'
  },
  '/TrainingContentManagement/AddTriningContent': {
    title: 'إضافة محتوى تدريبي - نظام إدارة التدريب المتقدم',
    description: 'إضافة محتوى تدريبي جديد'
  },
  '/TraineePayments': {
    title: 'مدفوعات المتدربين - نظام إدارة التدريب المتقدم',
    description: 'إدارة ومتابعة مدفوعات المتدربين والرسوم المالية'
  }
};

export const getPageMetadata = (pathname: string) => {
  return pageMetadata[pathname as keyof typeof pageMetadata] || {
    title: 'نظام إدارة التدريب المتقدم',
    description: 'منصة شاملة لإدارة البرامج التدريبية والمحتوى التعليمي والاختبارات الإلكترونية'
  };
};
