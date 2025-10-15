import { TraineeAccount, TraineeAccountUI } from '@/types/traineePlatform';

// Single Responsibility Principle - Mapper responsible only for data transformation
export class TraineeAccountMapper {
  // Transform API data to UI format
  static toUI(apiAccount: TraineeAccount): TraineeAccountUI {
    return {
      id: apiAccount.id,
      name: apiAccount.trainee.nameAr,
      email: apiAccount.trainee.email,
      phone: apiAccount.trainee.phone,
      nationalId: apiAccount.trainee.nationalId,
      program: apiAccount.trainee.program.nameAr,
      status: apiAccount.isActive ? 'active' : 'inactive',
      traineeStatus: this.mapTraineeStatus(apiAccount.trainee.traineeStatus),
      classLevel: this.mapClassLevel(apiAccount.trainee.classLevel),
      lastLogin: apiAccount.lastLoginAt ? this.formatDate(apiAccount.lastLoginAt) : null,
      createdAt: this.formatDate(apiAccount.createdAt),
      photoUrl: apiAccount.trainee.photoUrl,
    };
  }

  // Transform multiple API accounts to UI format
  static toUIList(apiAccounts: TraineeAccount[]): TraineeAccountUI[] {
    return apiAccounts.map(account => this.toUI(account));
  }

  // Map trainee status to Arabic
  private static mapTraineeStatus(status: string): string {
    const statusMap: Record<string, string> = {
      'NEW': 'جديد',
      'CURRENT': 'حالي',
      'GRADUATE': 'خريج',
      'WITHDRAWN': 'منسحب'
    };
    return statusMap[status] || status;
  }

  // Map class level to Arabic
  private static mapClassLevel(level: string): string {
    const levelMap: Record<string, string> = {
      'FIRST': 'الأول',
      'SECOND': 'الثاني',
      'THIRD': 'الثالث',
      'FOURTH': 'الرابع'
    };
    return levelMap[level] || level;
  }

  // Format date to readable string
  private static formatDate(date: Date | string): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  // Get status color for UI
  static getStatusColor(status: string): string {
    const colorMap: Record<string, string> = {
      'active': 'bg-green-100 text-green-800',
      'inactive': 'bg-red-100 text-red-800',
      'جديد': 'bg-blue-100 text-blue-800',
      'حالي': 'bg-green-100 text-green-800',
      'خريج': 'bg-purple-100 text-purple-800',
      'منسحب': 'bg-gray-100 text-gray-800'
    };
    return colorMap[status] || 'bg-gray-100 text-gray-800';
  }

  // Get status text for UI
  static getStatusText(status: string): string {
    const textMap: Record<string, string> = {
      'active': 'نشط',
      'inactive': 'معطل'
    };
    return textMap[status] || status;
  }
}
