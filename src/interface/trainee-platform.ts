// Trainee Platform Interfaces

export interface TraineeAccount {
  id: string;
  nationalId: string;
  birthDate: Date;
  password: string | null;
  isActive: boolean;
  lastLoginAt: Date | null;
  resetCode: string | null;
  resetCodeExpiresAt: Date | null;
  resetCodeGeneratedAt: Date | null;
  traineeId: number;
  createdAt: Date;
  updatedAt: Date;
  trainee: {
    id: number;
    nameAr: string;
    nameEn: string;
    nationalId: string;
    email: string | null;
    phone: string;
    photoUrl: string | null;
    traineeStatus: string;
    classLevel: string;
    academicYear: string;
    program: {
      id: number;
      nameAr: string;
      nameEn: string;
    };
  };
}

export interface TraineeAccountResponse {
  data: TraineeAccount[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface TraineeAccountFilters {
  search?: string;
  isActive?: boolean;
  programId?: number;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface TraineeAccountStats {
  totalAccounts: number;
  activeAccounts: number;
  inactiveAccounts: number;
  averageAccountAgeInDays: number;
}

export interface UpdateTraineeAccountStatusRequest {
  isActive: boolean;
}

export interface ResetTraineePasswordRequest {
  accountId: string;
}

export interface TraineeAccountDetailsResponse {
  data: TraineeAccount;
}

// Platform Statistics Interfaces
export interface PlatformOverview {
  totalAccounts: number;           // إجمالي الحسابات
  activeAccounts: number;          // الحسابات النشطة
  inactiveAccounts: number;        // الحسابات غير النشطة
  registeredTrainees: number;      // المتدربين المسجلين
  unregisteredTrainees: number;    // المتدربين غير المسجلين
  totalSessions: number;           // إجمالي الجلسات
  totalTimeSpent: number;          // إجمالي الوقت المستغرق
  averageSessionTime: number;      // متوسط وقت الجلسة
  activeToday: number;             // النشط اليوم
  activeThisWeek: number;          // النشط هذا الأسبوع
  activeThisMonth: number;         // النشط هذا الشهر
}

export interface LoginActivity {
  date: string;                    // التاريخ (YYYY-MM-DD)
  count: number;                   // عدد الجلسات
  uniqueUsers: number;             // عدد المستخدمين الفريدين
  totalTime: number;               // إجمالي الوقت
  averageTime: number;             // متوسط الوقت
}

export interface ProgramStats {
  id: number;                      // معرف البرنامج
  nameAr: string;                  // اسم البرنامج بالعربية
  traineeCount: number;            // عدد المتدربين
}

export interface RecentActivity {
  id: string;                      // معرف الجلسة
  loginAt: Date;                   // وقت تسجيل الدخول
  logoutAt: Date | null;          // وقت تسجيل الخروج
  duration: number | null;         // مدة الجلسة
  device: string | null;           // نوع الجهاز
  trainee: {
    nameAr: string;                // اسم المتدرب بالعربية
    program: {
      nameAr: string;              // اسم البرنامج بالعربية
    };
  };
}

export interface TopActivity {
  type: string;                    // نوع النشاط
  count: number;                   // عدد مرات النشاط
}

export interface DeviceStats {
  device: string;                  // نوع الجهاز
  count: number;                   // عدد الاستخدامات
}

export interface PlatformStats {
  overview: PlatformOverview;
  loginActivity: LoginActivity[];
  programsStats: ProgramStats[];
  recentActivity: RecentActivity[];
  topActivities: TopActivity[];
  deviceStats: DeviceStats[];
}

export interface PlatformStatsFilters {
  startDate?: string;              // تاريخ البداية (ISO date string)
  endDate?: string;                // تاريخ النهاية (ISO date string)
  programId?: number;              // معرف البرنامج التدريبي
}
