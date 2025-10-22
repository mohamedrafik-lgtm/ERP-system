// Interfaces for Distribution Management System

import { Student, Distribution, FilterOptions, BulkAssignData } from './types';

export interface IStudentService {
  getStudents(): Promise<Student[]>;
  getStudentById(id: number): Promise<Student | null>;
  updateStudent(student: Student): Promise<Student>;
  deleteStudent(id: number): Promise<boolean>;
  assignStudents(data: BulkAssignData): Promise<boolean>;
}

export interface IDistributionService {
  getDistributions(): Promise<Distribution[]>;
  getDistributionById(id: number): Promise<Distribution | null>;
  createDistribution(distribution: Omit<Distribution, 'id'>): Promise<Distribution>;
  updateDistribution(distribution: Distribution): Promise<Distribution>;
  deleteDistribution(id: number): Promise<boolean>;
}

export interface IFilterService {
  filterStudents(students: Student[], filters: FilterOptions): Student[];
  filterDistributions(distributions: Distribution[], filters: FilterOptions): Distribution[];
}

export interface IStatsService {
  calculateStudentStats(students: Student[]): {
    totalStudents: number;
    waitingStudents: number;
    newStudents: number;
    averageWaitingDays: number;
  };
  calculateDistributionStats(distributions: Distribution[]): {
    totalDistributions: number;
    activeDistributions: number;
    totalStudents: number;
  };
}

export interface IStudentComponent {
  students: Student[];
  onStudentSelect: (studentId: number) => void;
  onStudentAssign: (studentId: number, distributionId: number) => void;
  selectedStudents: number[];
}

export interface IDistributionComponent {
  distributions: Distribution[];
  onDistributionSelect: (distributionId: number) => void;
  onDistributionEdit: (distribution: Distribution) => void;
  onDistributionDelete: (distributionId: number) => void;
}

export interface IFilterComponent {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  onReset: () => void;
}

export interface IStatsComponent {
  stats: {
    totalStudents: number;
    waitingStudents: number;
    newStudents: number;
    averageWaitingDays: number;
  };
  isLoading: boolean;
}

