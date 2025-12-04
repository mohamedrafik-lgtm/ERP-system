// Study Materials Types
export interface StudyMaterial {
  id: string;
  name: string;
  nameEn: string | null;
  description: string | null;
  quantity: number;
  isActive: boolean;
  programId: number;
  linkedFeeId: string | null;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  program: {
    id: number;
    nameAr: string;
    nameEn: string | null;
  };
  linkedFee: {
    id: string;
    name: string;
    amount: number;
  } | null;
  responsibleUsers: Array<{
    id: string;
    studyMaterialId: string;
    userId: string;
    assignedBy: string;
    assignedAt: Date;
    user: {
      id: string;
      name: string;
      email: string;
    };
  }>;
  _count: {
    deliveries: number;
  };
}

export interface StudyMaterialsResponse {
  data: StudyMaterial[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface StudyMaterialsFilters {
  search?: string;
  programId?: number;
  isActive?: boolean;
  page?: number;
  limit?: number;
}

export interface CreateStudyMaterialRequest {
  // Required
  name: string;
  programId: number;
  quantity: number;
  
  // Optional
  nameEn?: string;
  description?: string;
  linkedFeeId?: number | null;
  isActive?: boolean;
  responsibleUserIds?: string[];
}

export interface UpdateStudyMaterialRequest extends Partial<CreateStudyMaterialRequest> {
  id: string;
  isActive?: boolean;
}

export interface StudyMaterialStats {
  totalMaterials: number;
  activeMaterials: number;
  inactiveMaterials: number;
  totalQuantity: number;
  totalDeliveries: number;
  programsCount: number;
}

// Delivery Tracking Types
export interface DeliveryTracking {
  id: number;
  traineeId: number;
  studyToolId: number;
  quantity: number;
  deliveryDate: Date;
  returnDate?: Date;
  status: 'delivered' | 'returned' | 'overdue';
  notes?: string;
  deliveredBy: string;
  trainee: {
    id: number;
    nameAr: string;
    nameEn: string;
    phone: string;
    program: {
      id: number;
      nameAr: string;
    };
  };
  studyTool: {
    id: number;
    name: string;
    category: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface DeliveryTrackingResponse {
  data: DeliveryTracking[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface DeliveryTrackingFilters {
  search?: string;
  traineeId?: number;
  studyToolId?: number;
  status?: 'delivered' | 'returned' | 'overdue';
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface CreateDeliveryRequest {
  traineeId: number;
  studyToolId: number;
  quantity: number;
  deliveryDate: Date;
  notes?: string;
}

export interface UpdateDeliveryRequest {
  id: number;
  returnDate?: Date;
  status?: 'delivered' | 'returned' | 'overdue';
  notes?: string;
}

export interface DeliveryStats {
  totalDeliveries: number;
  activeDeliveries: number;
  returnedDeliveries: number;
  overdueDeliveries: number;
  totalToolsDelivered: number;
}

// ==================== New Delivery Types ====================

export type DeliveryStatus = 'PENDING' | 'DELIVERED' | 'RETURNED' | 'LOST';

export interface QueryDeliveriesDto {
  studyMaterialId?: string;
  traineeId?: number;
  programId?: number;
  status?: DeliveryStatus;
  search?: string;
  page?: number;
  limit?: number;
}

export interface Delivery {
  id: string;
  studyMaterialId: string;
  traineeId: number;
  quantity: number;
  status: DeliveryStatus;
  deliveryDate: Date | null;
  returnDate: Date | null;
  notes: string | null;
  returnNotes: string | null;
  deliveredBy: string | null;
  returnedBy: string | null;
  createdAt: Date;
  updatedAt: Date;
  
  // Relations
  studyMaterial: {
    id: string;
    name: string;
    nameEn: string | null;
    program: {
      id: number;
      nameAr: string;
      nameEn: string | null;
    };
  };
  
  trainee: {
    id: number;
    nameAr: string;
    nameEn: string | null;
    nationalId: string;
    phone: string;
    photoUrl: string | null;
  };
}

export interface DeliveriesListResponse {
  deliveries: Delivery[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}