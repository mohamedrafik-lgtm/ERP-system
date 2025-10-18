import { AdvancedStatsResponse, TraineeStats, RecentSession, ActivityCount, DailyStats, ActivityType } from '@/types/advancedStats';

const mockTraineeStats: TraineeStats = {
  id: "1",
  traineeAuthId: "trainee-123",
  totalSessions: 45,
  totalTimeSpent: 125400, // in minutes
  averageSessionTime: 2787, // in minutes
  longestSession: 480, // in minutes
  totalPageViews: 156,
  totalDownloads: 23,
  totalVideoWatches: 67,
  firstLogin: new Date("2024-01-15T08:30:00Z"),
  lastLogin: new Date("2024-12-20T09:15:00Z"),
  lastActivity: new Date("2024-12-20T16:45:00Z"),
  thisWeekSessions: 8,
  thisMonthSessions: 22,
  updatedAt: new Date("2024-12-20T16:45:00Z")
};

const mockRecentSessions: RecentSession[] = [
  {
    loginAt: new Date("2024-12-20T09:15:00Z"),
    logoutAt: new Date("2024-12-20T16:45:00Z"),
    duration: 450, // 7.5 hours
    device: "Windows 10 - Chrome",
    activities: [
      { activityType: ActivityType.PAGE_VIEW, timestamp: new Date("2024-12-20T09:20:00Z") },
      { activityType: ActivityType.VIDEO_WATCH, timestamp: new Date("2024-12-20T10:30:00Z") },
      { activityType: ActivityType.QUIZ_ATTEMPT, timestamp: new Date("2024-12-20T14:15:00Z") },
      { activityType: ActivityType.DOWNLOAD, timestamp: new Date("2024-12-20T15:30:00Z") }
    ]
  },
  {
    loginAt: new Date("2024-12-19T10:00:00Z"),
    logoutAt: new Date("2024-12-19T14:30:00Z"),
    duration: 270, // 4.5 hours
    device: "Android - Chrome Mobile",
    activities: [
      { activityType: ActivityType.PAGE_VIEW, timestamp: new Date("2024-12-19T10:05:00Z") },
      { activityType: ActivityType.VIDEO_WATCH, timestamp: new Date("2024-12-19T11:00:00Z") },
      { activityType: ActivityType.ASSIGNMENT_SUBMIT, timestamp: new Date("2024-12-19T13:45:00Z") }
    ]
  },
  {
    loginAt: new Date("2024-12-18T08:45:00Z"),
    logoutAt: new Date("2024-12-18T12:15:00Z"),
    duration: 210, // 3.5 hours
    device: "Windows 10 - Firefox",
    activities: [
      { activityType: ActivityType.PAGE_VIEW, timestamp: new Date("2024-12-18T08:50:00Z") },
      { activityType: ActivityType.DISCUSSION_POST, timestamp: new Date("2024-12-18T10:30:00Z") },
      { activityType: ActivityType.QUIZ_ATTEMPT, timestamp: new Date("2024-12-18T11:45:00Z") }
    ]
  }
];

const mockActivityCounts: ActivityCount[] = [
  {
    activityType: ActivityType.PAGE_VIEW,
    _count: { activityType: 156 }
  },
  {
    activityType: ActivityType.VIDEO_WATCH,
    _count: { activityType: 67 }
  },
  {
    activityType: ActivityType.QUIZ_ATTEMPT,
    _count: { activityType: 23 }
  },
  {
    activityType: ActivityType.DOWNLOAD,
    _count: { activityType: 15 }
  },
  {
    activityType: ActivityType.ASSIGNMENT_SUBMIT,
    _count: { activityType: 12 }
  },
  {
    activityType: ActivityType.DISCUSSION_POST,
    _count: { activityType: 8 }
  }
];

const mockDailyStats: { [date: string]: DailyStats } = {
  "2024-12-20": { sessions: 3, totalTime: 450 },
  "2024-12-19": { sessions: 2, totalTime: 270 },
  "2024-12-18": { sessions: 1, totalTime: 210 },
  "2024-12-17": { sessions: 2, totalTime: 180 },
  "2024-12-16": { sessions: 1, totalTime: 120 },
  "2024-12-15": { sessions: 0, totalTime: 0 },
  "2024-12-14": { sessions: 1, totalTime: 90 }
};

export const mockAdvancedStats: AdvancedStatsResponse = {
  stats: mockTraineeStats,
  recentSessions: mockRecentSessions,
  activityCounts: mockActivityCounts,
  dailyStats: mockDailyStats
};
