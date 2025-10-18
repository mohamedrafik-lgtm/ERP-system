export enum ActivityType {
  PAGE_VIEW = 'PAGE_VIEW',
  DOWNLOAD = 'DOWNLOAD',
  VIDEO_WATCH = 'VIDEO_WATCH',
  QUIZ_ATTEMPT = 'QUIZ_ATTEMPT',
  ASSIGNMENT_SUBMIT = 'ASSIGNMENT_SUBMIT',
  DISCUSSION_POST = 'DISCUSSION_POST',
  OTHER = 'OTHER'
}

export interface TraineeStats {
  id: string;
  traineeAuthId: string;
  totalSessions: number;
  totalTimeSpent: number;
  averageSessionTime: number;
  longestSession: number;
  totalPageViews: number;
  totalDownloads: number;
  totalVideoWatches: number;
  firstLogin?: Date;
  lastLogin?: Date;
  lastActivity?: Date;
  thisWeekSessions: number;
  thisMonthSessions: number;
  updatedAt: Date;
}

export interface SessionActivity {
  activityType: ActivityType;
  timestamp: Date;
}

export interface RecentSession {
  loginAt: Date;
  logoutAt?: Date;
  duration?: number;
  device?: string;
  activities: SessionActivity[];
}

export interface ActivityCount {
  activityType: ActivityType;
  _count: {
    activityType: number;
  };
}

export interface DailyStats {
  sessions: number;
  totalTime: number;
}

export interface AdvancedStatsResponse {
  stats: TraineeStats;
  recentSessions: RecentSession[];
  activityCounts: ActivityCount[];
  dailyStats: { [date: string]: DailyStats };
}
