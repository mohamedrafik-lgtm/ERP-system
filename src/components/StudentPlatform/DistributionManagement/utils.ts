// Utility functions for Distribution Management System

import { Student, Distribution, FilterOptions } from './types';
import { STATUS_COLORS, LEVEL_COLORS, STATUS_TEXTS, DISTRIBUTION_STATUS_TEXTS } from './constants';

export class StudentUtils {
  static getStatusColor(status: string): string {
    return STATUS_COLORS[status as keyof typeof STATUS_COLORS] || 'bg-gray-100 text-gray-800 border-gray-200';
  }

  static getStatusText(status: string): string {
    return STATUS_TEXTS[status as keyof typeof STATUS_TEXTS] || 'غير محدد';
  }

  static getLevelColor(level: string): string {
    return LEVEL_COLORS[level as keyof typeof LEVEL_COLORS] || 'bg-gray-100 text-gray-800';
  }
}

export class DistributionUtils {
  static getStatusColor(status: string): string {
    return STATUS_COLORS[status as keyof typeof STATUS_COLORS] || 'bg-gray-100 text-gray-800 border-gray-200';
  }

  static getStatusText(status: string): string {
    return DISTRIBUTION_STATUS_TEXTS[status as keyof typeof DISTRIBUTION_STATUS_TEXTS] || 'غير محدد';
  }

  static calculateProgress(current: number, max: number): number {
    return Math.round((current / max) * 100);
  }
}

export class FilterUtils {
  static filterStudents(students: Student[], filters: FilterOptions): Student[] {
    return students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                           student.studentId.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                           student.program.toLowerCase().includes(filters.searchTerm.toLowerCase());
      
      const matchesStatus = filters.statusFilter === "all" || student.status === filters.statusFilter;
      const matchesLevel = filters.levelFilter === "all" || student.level === filters.levelFilter;
      
      return matchesSearch && matchesStatus && matchesLevel;
    });
  }

  static filterDistributions(distributions: Distribution[], filters: FilterOptions): Distribution[] {
    return distributions.filter(distribution => {
      const matchesSearch = distribution.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                           distribution.program.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                           distribution.instructor.toLowerCase().includes(filters.searchTerm.toLowerCase());
      
      const matchesStatus = filters.statusFilter === "all" || distribution.status === filters.statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }
}

export class StatsUtils {
  static calculateDistributionStats(distributions: Distribution[]): {
    totalDistributions: number;
    activeDistributions: number;
    totalStudents: number;
  } {
    return {
      totalDistributions: distributions.length,
      activeDistributions: distributions.filter(d => d.status === 'active').length,
      totalStudents: distributions.reduce((sum, d) => sum + d.currentStudents, 0)
    };
  }

  static calculateStudentStats(students: Student[]): {
    totalStudents: number;
    waitingStudents: number;
    newStudents: number;
    averageWaitingDays: number;
  } {
    return {
      totalStudents: students.length,
      waitingStudents: students.filter(s => s.status === 'waiting').length,
      newStudents: students.filter(s => s.status === 'new').length,
      averageWaitingDays: students.length > 0 
        ? Math.round(students.reduce((sum, s) => sum + (s.waitingDays || 0), 0) / students.length)
        : 0
    };
  }
}

