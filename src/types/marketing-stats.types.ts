// src/types/marketing-stats.types.ts

// Marketing Stats Overview Interface
export interface MarketingStatsOverview {
  totalEmployees: number;                    // إجمالي الموظفين
  totalTrainees: number;                     // إجمالي المتدربين
  assignedTrainees: number;                  // المتدربين المُعيَّنين
  unassignedTrainees: number;                // المتدربين غير المُعيَّنين
  assignmentRate: number;                    // نسبة التخصيص
  firstContactTrainees: number;              // متدربين التواصل الأول
  unassignedFirstContact: number;            // متدربين غير مُعيَّن لهم تواصل أول
  firstContactRate: number;                  // نسبة التواصل الأول
}

// Marketing Monthly Stats Interface
export interface MarketingMonthlyStats {
  newTrainees: number;                       // متدربين جدد للشهر
  assignedTrainees: number;                  // متدربين مُعيَّنين للشهر
  firstContactTrainees: number;              // متدربين تواصل أول للشهر
  assignmentRate: number;                    // نسبة التخصيص للشهر
  firstContactRate: number;                  // نسبة التواصل الأول للشهر
}

// Marketing Employee Stats Interface
export interface MarketingEmployeeStats {
  id: number;
  name: string;
  monthlyTarget: number;                     // الهدف الشهري
  totalAssigned: number;                     // إجمالي المُعيَّنين
  monthlyAssigned: number;                   // المُعيَّنين للشهر
  monthlyFirstContact: number;               // تواصل أول للشهر
  achievementRate: number;                   // نسبة تحقيق الهدف
}

// Marketing Program Stats Interface
export interface MarketingProgramStats {
  programId: number;
  programName: string;
  count: number;
}

// Marketing Top Performer Interface
export interface MarketingTopPerformer {
  id: number;
  name: string;
  monthlyTarget: number;
  totalAssigned: number;
  monthlyAssigned: number;
  monthlyFirstContact: number;
  achievementRate: number;
  rank: number;
}

// Marketing Status Distribution Interface
export interface MarketingStatusDistribution {
  status: string;
  count: number;
  percentage: number;
}

// Marketing Detailed Stats Interface
export interface MarketingDetailedStats {
  statusDistribution: MarketingStatusDistribution[];
  averagePerEmployee: number;                // متوسط المتدربين لكل موظف
  activeEmployeesRate: number;               // نسبة الموظفين النشطين
}

// Marketing Period Interface
export interface MarketingPeriod {
  month: number;
  year: number;
  startDate: string;                         // تاريخ بداية الشهر
  endDate: string;                           // تاريخ نهاية الشهر
}

// Marketing Stats Response Interface
export interface MarketingStatsResponse {
  overview: MarketingStatsOverview;
  monthly: MarketingMonthlyStats;
  employees: MarketingEmployeeStats[];
  topPerformers: MarketingTopPerformer[];
  programs: MarketingProgramStats[];
  detailed: MarketingDetailedStats;
  period: MarketingPeriod;
}

// Marketing Stats Filters Interface
export interface MarketingStatsFilters {
  month?: number;
  year?: number;
}

// Marketing Stats Summary Interface
export interface MarketingStatsSummary {
  totalEmployees: number;
  totalTrainees: number;
  totalTargets: number;
  totalAchieved: number;
  overallAchievementRate: number;
  topPerformer: {
    name: string;
    achievementRate: number;
  };
  mostPopularProgram: {
    name: string;
    count: number;
  };
}

// Error Response Interface
export interface MarketingStatsErrorResponse {
  statusCode: number;
  message: string;
  error: string;
}

// Success Response Interface
export interface MarketingStatsSuccessResponse {
  success: boolean;
  message: string;
  data: MarketingStatsResponse;
}
