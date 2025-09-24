// Program Interface
export interface Program {
  nameAr: string;
}

// Trainee Interface
export interface Trainee {
  id: number;
  nameAr: string;
  program: Program;
  createdAt: Date;
}

// Marketing Target Interface
export interface MarketingTarget {
  id: number;
  month: number;
  year: number;
  firstContactTarget: number;
  secondContactTarget: number;
  marketingEmployeeId: number;
  createdAt: Date;
  updatedAt: Date;
}

// Marketing Employee Count Interface
export interface MarketingEmployeeCount {
  trainees: number;
}

// Marketing Employee Detail Response Interface
export interface MarketingEmployeeDetailResponse {
  id: number;
  name: string;
  phone: string;
  email?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  marketingTargets: MarketingTarget[];        // جميع الأهداف مرتبة حسب السنة والشهر
  trainees: Trainee[];                       // آخر 10 متدربين مُعيَّنين
  _count: MarketingEmployeeCount;            // عدد المتدربين الإجمالي
  totalAssignedTrainees: number;             // إجمالي المتدربين المُعيَّنين
}

// Marketing Employee Performance Interface
export interface MarketingEmployeePerformance {
  employeeId: number;
  employeeName: string;
  currentMonthStats: {
    month: number;
    year: number;
    firstContact: number;
    secondContact: number;
    firstContactTarget: number;
    secondContactTarget: number;
    achievement: number;
  };
  monthlyStats: {
    month: number;
    year: number;
    firstContact: number;
    secondContact: number;
    firstContactTarget: number;
    secondContactTarget: number;
    achievement: number;
  }[];
  quarterlyStats: {
    quarter: number;
    year: number;
    totalFirstContact: number;
    totalSecondContact: number;
    totalFirstContactTarget: number;
    totalSecondContactTarget: number;
    achievement: number;
  }[];
  yearlyStats: {
    year: number;
    totalFirstContact: number;
    totalSecondContact: number;
    totalFirstContactTarget: number;
    totalSecondContactTarget: number;
    achievement: number;
  }[];
}

// Marketing Employee Detailed Stats Interface
export interface MarketingEmployeeDetailedStats {
  id: number;
  name: string;
  phone: string;
  email?: string;
  isActive: boolean;
  totalAssignedTrainees: number;
  monthlyFirstContact: number;
  monthlySecondContact: number;
  currentMonthTargets: {
    firstContactTarget: number;
    secondContactTarget: number;
  };
  performance: {
    firstContactAchievement: number;
    secondContactAchievement: number;
    totalAchievement: number;
  };
  recentTrainees: Trainee[];
  allTargets: MarketingTarget[];
  createdAt: Date;
  updatedAt: Date;
}

// Error Response Interface
export interface MarketingEmployeeDetailErrorResponse {
  statusCode: number;
  message: string;
  error: string;
}

// Success Response Interface
export interface MarketingEmployeeDetailSuccessResponse {
  success: boolean;
  message: string;
  data: MarketingEmployeeDetailResponse;
}

// Update Marketing Employee Request Interface
export interface UpdateMarketingEmployeeRequest {
  name?: string;           // اختياري - اسم موظف التسويق
  phone?: string;          // اختياري - رقم الهاتف
  email?: string;          // اختياري - البريد الإلكتروني
  isActive?: boolean;      // اختياري - حالة نشاط الموظف
}
