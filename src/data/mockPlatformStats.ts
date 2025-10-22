import { PlatformStats } from '@/lip/features/trainee-platform/traineeAccountsApi';

export const mockPlatformStats: PlatformStats = {
  overview: {
    totalAccounts: 1247,
    activeAccounts: 892,
    inactiveAccounts: 355,
    registeredTrainees: 1200,
    unregisteredTrainees: 47,
    totalSessions: 15234,
    totalTimeSpent: 45678900, // in seconds (approximately 12685 hours)
    averageSessionTime: 2998, // in seconds (approximately 50 minutes)
    activeToday: 234,
    activeThisWeek: 678,
    activeThisMonth: 892,
  },
  loginActivity: [
    { date: '2024-01-15', count: 245, uniqueUsers: 198, totalTime: 735000, averageTime: 3000 },
    { date: '2024-01-16', count: 267, uniqueUsers: 215, totalTime: 801000, averageTime: 3000 },
    { date: '2024-01-17', count: 289, uniqueUsers: 232, totalTime: 867000, averageTime: 3000 },
    { date: '2024-01-18', count: 312, uniqueUsers: 251, totalTime: 936000, averageTime: 3000 },
    { date: '2024-01-19', count: 298, uniqueUsers: 239, totalTime: 894000, averageTime: 3000 },
    { date: '2024-01-20', count: 189, uniqueUsers: 152, totalTime: 567000, averageTime: 3000 },
    { date: '2024-01-21', count: 176, uniqueUsers: 141, totalTime: 528000, averageTime: 3000 },
  ],
  programsStats: [
    { id: 1, nameAr: 'برنامج الذكاء الاصطناعي', traineeCount: 345 },
    { id: 2, nameAr: 'برنامج تطوير الويب', traineeCount: 278 },
    { id: 3, nameAr: 'برنامج علم البيانات', traineeCount: 234 },
    { id: 4, nameAr: 'برنامج الأمن السيبراني', traineeCount: 198 },
    { id: 5, nameAr: 'برنامج تطبيقات الجوال', traineeCount: 192 },
  ],
  recentActivity: [
    {
      id: '1',
      loginAt: new Date('2024-01-21T10:30:00'),
      logoutAt: new Date('2024-01-21T12:15:00'),
      duration: 6300,
      device: 'Desktop',
      trainee: {
        nameAr: 'أحمد محمد علي',
        program: { nameAr: 'برنامج الذكاء الاصطناعي' },
      },
    },
    {
      id: '2',
      loginAt: new Date('2024-01-21T09:00:00'),
      logoutAt: null,
      duration: null,
      device: 'Mobile',
      trainee: {
        nameAr: 'فاطمة حسن أحمد',
        program: { nameAr: 'برنامج تطوير الويب' },
      },
    },
    {
      id: '3',
      loginAt: new Date('2024-01-21T08:45:00'),
      logoutAt: new Date('2024-01-21T11:30:00'),
      duration: 9900,
      device: 'Tablet',
      trainee: {
        nameAr: 'محمد خالد سعيد',
        program: { nameAr: 'برنامج علم البيانات' },
      },
    },
    {
      id: '4',
      loginAt: new Date('2024-01-21T07:30:00'),
      logoutAt: new Date('2024-01-21T10:00:00'),
      duration: 9000,
      device: 'Desktop',
      trainee: {
        nameAr: 'سارة عبد الله محمد',
        program: { nameAr: 'برنامج الأمن السيبراني' },
      },
    },
    {
      id: '5',
      loginAt: new Date('2024-01-21T06:00:00'),
      logoutAt: new Date('2024-01-21T08:45:00'),
      duration: 9900,
      device: 'Mobile',
      trainee: {
        nameAr: 'علي حسين عمر',
        program: { nameAr: 'برنامج تطبيقات الجوال' },
      },
    },
  ],
  topActivities: [
    { type: 'عرض المحاضرات', count: 3421 },
    { type: 'حل الواجبات', count: 2867 },
    { type: 'المشاركة في المنتدى', count: 1934 },
    { type: 'مشاهدة الفيديوهات', count: 1756 },
    { type: 'تحميل الملفات', count: 1243 },
  ],
  deviceStats: [
    { device: 'Desktop', count: 8934 },
    { device: 'Mobile', count: 4567 },
    { device: 'Tablet', count: 1733 },
  ],
};

