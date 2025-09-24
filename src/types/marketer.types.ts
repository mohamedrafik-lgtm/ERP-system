// Marketing Target interface
export interface MarketingTarget {
  id: number;
  name: string;
  description?: string;
  targetValue: number;
  currentValue: number;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// MarketingEmployeeResponse interface - يتطابق مع API
export interface MarketingEmployeeResponse {
  id: number;
  name: string;
  phone: string;
  email?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  marketingTargets: MarketingTarget[];
  _count: { trainees: number };
  totalAssignedTrainees: number;
  monthlyFirstContact: number;
  monthlySecondContact: number;
}

// CreateMarketingTargetRequest interface
export interface CreateMarketingTargetRequest {
  employeeId: number;          // مطلوب - معرف موظف التسويق
  month: number;               // مطلوب - الشهر (1-12)
  year: number;                // مطلوب - السنة
  targetAmount: number;        // مطلوب - الهدف المطلوب (عدد التقديمات)
  notes?: string;              // اختياري - ملاحظات
  setById?: string;            // اختياري - من قام بتحديد الهدف
}

// MarketingTargetResponse interface
export interface MarketingTargetResponse {
  id: number;
  employeeId: number;
  month: number;
  year: number;
  targetAmount: number;
  achievedAmount: number;        // العدد المحقق (يتم حسابه تلقائياً)
  notes?: string;
  setById?: string;
  setAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  employee: MarketingEmployee;
}

// MarketingTargetQueryParams interface
export interface MarketingTargetQueryParams {
  month: number;
  year: number;
}

// MarketingTargetEmployeeQueryParams interface
export interface MarketingTargetEmployeeQueryParams {
  employeeId: number;
  month?: number;
  year?: number;
}

// UpdateMarketingTargetRequest interface
export interface UpdateMarketingTargetRequest {
  targetAmount?: number;        // اختياري - الهدف المطلوب (عدد التقديمات)
  notes?: string;              // اختياري - ملاحظات
  setById?: string;            // اختياري - من قام بتحديد الهدف
}

// Legacy types for backward compatibility
export type MarketerStatus = 'active' | 'inactive';
export type MarketerPosition = 'مسوق' | 'مسوق أول' | 'مدير التسويق' | 'مشرف تسويق';

export interface Marketer {
  id: number;
  nameAr: string;
  nameEn: string;
  email: string;
  phone: string;
  position: MarketerPosition;
  status: MarketerStatus;
  photoUrl?: string;
  city: string;
  joinDate: Date;
  salary: number;
  commissionRate: number;
  totalCommissions: number;
  pendingCommissions: number;
  paidCommissions: number;
  totalTrainees: number;
  performance: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MarketerResponse {
  data: Marketer[];
  total: number;
  page: number;
  limit: number;
}

export interface MarketerFilters {
  status?: MarketerStatus;
  position?: MarketerPosition;
  city?: string;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface MarketerStats {
  totalMarketers: number;
  activeMarketers: number;
  inactiveMarketers: number;
  totalCommissions: number;
  pendingCommissions: number;
  paidCommissions: number;
  totalTrainees: number;
  averagePerformance: number;
  averageSalary: number;
  topPerformers: Marketer[];
}

export interface CreateMarketerRequest {
  nameAr: string;
  nameEn: string;
  email: string;
  phone: string;
  position: MarketerPosition;
  city: string;
  password: string;
  salary: number;
  commissionRate: number;
  startDate: string;
  notes?: string;
  photoUrl?: string;
}

export interface UpdateMarketerRequest {
  nameAr?: string;
  nameEn?: string;
  email?: string;
  phone?: string;
  position?: MarketerPosition;
  status?: MarketerStatus;
  city?: string;
  salary?: number;
  commissionRate?: number;
  notes?: string;
  photoUrl?: string;
}

export interface MarketerPerformance {
  marketerId: number;
  marketerName: string;
  period: string;
  totalCommissions: number;
  totalTrainees: number;
  conversionRate: number;
  performance: number;
  rank: number;
}

export interface MarketerCommission {
  id: number;
  marketerId: number;
  traineeId: number;
  amount: number;
  type: 'FIRST_CONTACT' | 'SECOND_CONTACT';
  status: 'PENDING' | 'PAID';
  description?: string;
  createdAt: Date;
  paidAt?: Date;
  paidBy?: string;
}

export interface MarketerReport {
  marketerId: number;
  marketerName: string;
  period: {
    from: Date;
    to: Date;
  };
  stats: {
    totalCommissions: number;
    paidCommissions: number;
    pendingCommissions: number;
    totalTrainees: number;
    newTrainees: number;
    conversionRate: number;
    performance: number;
  };
  commissions: MarketerCommission[];
  trainees: {
    id: number;
    name: string;
    joinDate: Date;
    status: string;
  }[];
}
