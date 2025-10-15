// Interfaces for Trainee Platform Statistics API

export interface TraineePlatformStatsResponse {
  overview: {
    totalAccounts: number;
    activeAccounts: number;
    inactiveAccounts: number;
    registeredTrainees: number;
    unregisteredTrainees: number;
    totalSessions: number;
    totalTimeSpent: number;
    averageSessionTime: number;
    activeToday: number;
    activeThisWeek: number;
    activeThisMonth: number;
  };
  loginActivity: LoginActivity[];
  programsStats: ProgramStats[];
  recentActivity: RecentActivity[];
  topActivities: TopActivity[];
  deviceStats: DeviceStats[];
}

export interface LoginActivity {
  date: string;
  count: number;
  uniqueUsers: number;
  totalTime: number;
  averageTime: number;
}

export interface ProgramStats {
  id: number;
  nameAr: string;
  traineeCount: number;
}

export interface RecentActivity {
  id: string;
  loginAt: Date;
  logoutAt: Date | null;
  duration: number | null;
  device: string | null;
  trainee: {
    nameAr: string;
    program: {
      nameAr: string;
    };
  };
}

export interface TopActivity {
  type: 'PAGE_VIEW' | 'DOWNLOAD' | 'VIDEO_WATCH' | 'QUIZ_ATTEMPT' | 'ASSIGNMENT_SUBMIT' | 'DISCUSSION_POST' | 'OTHER';
  count: number;
}

export interface DeviceStats {
  device: string;
  count: number;
}

// UI State interfaces
export interface StatsOverviewUI {
  totalAccounts: number;
  activeAccounts: number;
  inactiveAccounts: number;
  registeredTrainees: number;
  unregisteredTrainees: number;
  totalSessions: number;
  totalTimeSpent: string; // formatted time
  averageSessionTime: string; // formatted time
  activeToday: number;
  activeThisWeek: number;
  activeThisMonth: number;
}

export interface LoginActivityUI {
  date: string;
  count: number;
  uniqueUsers: number;
  totalTime: string; // formatted time
  averageTime: string; // formatted time
}

export interface ProgramStatsUI {
  id: number;
  name: string;
  traineeCount: number;
  percentage: number;
}

export interface RecentActivityUI {
  id: string;
  loginAt: string; // formatted date
  logoutAt: string | null; // formatted date
  duration: string | null; // formatted time
  device: string | null;
  traineeName: string;
  programName: string;
}

export interface TopActivityUI {
  type: string;
  count: number;
  percentage: number;
  icon: string;
  color: string;
}

export interface DeviceStatsUI {
  device: string;
  count: number;
  percentage: number;
  icon: string;
  color: string;
}
