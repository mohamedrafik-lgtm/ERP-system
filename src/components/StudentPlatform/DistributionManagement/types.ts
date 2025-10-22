// Types for Distribution Management System

export interface Student {
  id: number;
  name: string;
  studentId: string;
  program: string;
  level: 'مبتدئ' | 'متوسط' | 'متقدم';
  status: 'available' | 'assigned' | 'pending' | 'new' | 'urgent';
  preferences: string[];
  assignedTo?: string | null;
  enrollmentDate?: string;
  waitingDays?: number;
  notes?: string;
}

export interface Distribution {
  id: number;
  name: string;
  program: string;
  instructor: string;
  maxStudents: number;
  currentStudents: number;
  startDate: string;
  endDate: string;
  location: string;
  schedule: string;
  status: 'active' | 'completed' | 'pending';
}

export interface DistributionStats {
  totalDistributions: number;
  activeDistributions: number;
  totalStudents: number;
  averageWaitingDays: number;
}

export interface FilterOptions {
  searchTerm: string;
  statusFilter: string;
  levelFilter: string;
}

export interface BulkAssignData {
  studentIds: number[];
  distributionId: number;
}

