import { 
  TraineePlatformStatsResponse, 
  LoginActivity, 
  ProgramStats, 
  RecentActivity, 
  TopActivity, 
  DeviceStats,
  StatsOverviewUI,
  LoginActivityUI,
  ProgramStatsUI,
  RecentActivityUI,
  TopActivityUI,
  DeviceStatsUI
} from '@/types/traineePlatformStats';

// Single Responsibility Principle - Mapper responsible only for data transformation
export class TraineeStatsMapper {
  // Transform overview data to UI format
  static toOverviewUI(overview: TraineePlatformStatsResponse['overview']): StatsOverviewUI {
    return {
      totalAccounts: overview.totalAccounts,
      activeAccounts: overview.activeAccounts,
      inactiveAccounts: overview.inactiveAccounts,
      registeredTrainees: overview.registeredTrainees,
      unregisteredTrainees: overview.unregisteredTrainees,
      totalSessions: overview.totalSessions,
      totalTimeSpent: this.formatTime(overview.totalTimeSpent),
      averageSessionTime: this.formatTime(overview.averageSessionTime),
      activeToday: overview.activeToday,
      activeThisWeek: overview.activeThisWeek,
      activeThisMonth: overview.activeThisMonth,
    };
  }

  // Transform login activity data to UI format
  static toLoginActivityUI(activities: LoginActivity[]): LoginActivityUI[] {
    return activities.map(activity => ({
      date: this.formatDate(activity.date),
      count: activity.count,
      uniqueUsers: activity.uniqueUsers,
      totalTime: this.formatTime(activity.totalTime),
      averageTime: this.formatTime(activity.averageTime),
    }));
  }

  // Transform programs stats data to UI format
  static toProgramStatsUI(programs: ProgramStats[]): ProgramStatsUI[] {
    const totalTrainees = programs.reduce((sum, program) => sum + program.traineeCount, 0);
    
    return programs.map(program => ({
      id: program.id,
      name: program.nameAr,
      traineeCount: program.traineeCount,
      percentage: totalTrainees > 0 ? Math.round((program.traineeCount / totalTrainees) * 100) : 0,
    }));
  }

  // Transform recent activity data to UI format
  static toRecentActivityUI(activities: RecentActivity[]): RecentActivityUI[] {
    return activities.map(activity => ({
      id: activity.id,
      loginAt: this.formatDateTime(activity.loginAt),
      logoutAt: activity.logoutAt ? this.formatDateTime(activity.logoutAt) : null,
      duration: activity.duration ? this.formatTime(activity.duration) : null,
      device: activity.device,
      traineeName: activity.trainee.nameAr,
      programName: activity.trainee.program.nameAr,
    }));
  }

  // Transform top activities data to UI format
  static toTopActivityUI(activities: TopActivity[]): TopActivityUI[] {
    const totalCount = activities.reduce((sum, activity) => sum + activity.count, 0);
    
    return activities.map(activity => ({
      type: this.getActivityTypeName(activity.type),
      count: activity.count,
      percentage: totalCount > 0 ? Math.round((activity.count / totalCount) * 100) : 0,
      icon: this.getActivityIcon(activity.type),
      color: this.getActivityColor(activity.type),
    }));
  }

  // Transform device stats data to UI format
  static toDeviceStatsUI(devices: DeviceStats[]): DeviceStatsUI[] {
    const totalCount = devices.reduce((sum, device) => sum + device.count, 0);
    
    return devices.map(device => ({
      device: device.device,
      count: device.count,
      percentage: totalCount > 0 ? Math.round((device.count / totalCount) * 100) : 0,
      icon: this.getDeviceIcon(device.device),
      color: this.getDeviceColor(device.device),
    }));
  }

  // Format time in seconds to readable format
  private static formatTime(seconds: number): string {
    if (seconds < 60) {
      return `${seconds} ثانية`;
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes} دقيقة`;
    } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      return `${hours} ساعة ${minutes} دقيقة`;
    } else {
      const days = Math.floor(seconds / 86400);
      const hours = Math.floor((seconds % 86400) / 3600);
      return `${days} يوم ${hours} ساعة`;
    }
  }

  // Format date to readable format
  private static formatDate(date: string): string {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  // Format datetime to readable format
  private static formatDateTime(date: Date | string): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  // Get activity type name in Arabic
  private static getActivityTypeName(type: string): string {
    const typeMap: Record<string, string> = {
      'PAGE_VIEW': 'عرض الصفحة',
      'DOWNLOAD': 'تحميل',
      'VIDEO_WATCH': 'مشاهدة الفيديو',
      'QUIZ_ATTEMPT': 'محاولة الاختبار',
      'ASSIGNMENT_SUBMIT': 'تسليم الواجب',
      'DISCUSSION_POST': 'منشور النقاش',
      'OTHER': 'أخرى'
    };
    return typeMap[type] || type;
  }

  // Get activity icon
  private static getActivityIcon(type: string): string {
    const iconMap: Record<string, string> = {
      'PAGE_VIEW': '👁️',
      'DOWNLOAD': '⬇️',
      'VIDEO_WATCH': '🎥',
      'QUIZ_ATTEMPT': '📝',
      'ASSIGNMENT_SUBMIT': '📄',
      'DISCUSSION_POST': '💬',
      'OTHER': '📊'
    };
    return iconMap[type] || '📊';
  }

  // Get activity color
  private static getActivityColor(type: string): string {
    const colorMap: Record<string, string> = {
      'PAGE_VIEW': 'bg-blue-100 text-blue-800',
      'DOWNLOAD': 'bg-green-100 text-green-800',
      'VIDEO_WATCH': 'bg-purple-100 text-purple-800',
      'QUIZ_ATTEMPT': 'bg-yellow-100 text-yellow-800',
      'ASSIGNMENT_SUBMIT': 'bg-orange-100 text-orange-800',
      'DISCUSSION_POST': 'bg-pink-100 text-pink-800',
      'OTHER': 'bg-gray-100 text-gray-800'
    };
    return colorMap[type] || 'bg-gray-100 text-gray-800';
  }

  // Get device icon
  private static getDeviceIcon(device: string): string {
    const iconMap: Record<string, string> = {
      'Desktop': '🖥️',
      'Mobile': '📱',
      'Tablet': '📱',
      'Laptop': '💻',
      'Other': '📱'
    };
    return iconMap[device] || '📱';
  }

  // Get device color
  private static getDeviceColor(device: string): string {
    const colorMap: Record<string, string> = {
      'Desktop': 'bg-blue-100 text-blue-800',
      'Mobile': 'bg-green-100 text-green-800',
      'Tablet': 'bg-purple-100 text-purple-800',
      'Laptop': 'bg-orange-100 text-orange-800',
      'Other': 'bg-gray-100 text-gray-800'
    };
    return colorMap[device] || 'bg-gray-100 text-gray-800';
  }
}
