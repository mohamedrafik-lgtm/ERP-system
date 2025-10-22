// Constants for Distribution Management System

export const STUDENT_STATUSES = {
  AVAILABLE: 'available',
  ASSIGNED: 'assigned',
  PENDING: 'pending',
  NEW: 'new',
  URGENT: 'urgent',
  WAITING: 'waiting'
} as const;

export const DISTRIBUTION_STATUSES = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
  PENDING: 'pending'
} as const;

export const STUDENT_LEVELS = {
  BEGINNER: 'مبتدئ',
  INTERMEDIATE: 'متوسط',
  ADVANCED: 'متقدم'
} as const;

export const STATUS_COLORS = {
  [STUDENT_STATUSES.AVAILABLE]: 'bg-green-100 text-green-800 border-green-200',
  [STUDENT_STATUSES.ASSIGNED]: 'bg-blue-100 text-blue-800 border-blue-200',
  [STUDENT_STATUSES.PENDING]: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  [STUDENT_STATUSES.NEW]: 'bg-green-100 text-green-800 border-green-200',
  [STUDENT_STATUSES.URGENT]: 'bg-red-100 text-red-800 border-red-200',
  [STUDENT_STATUSES.WAITING]: 'bg-yellow-100 text-yellow-800 border-yellow-200'
} as const;

export const LEVEL_COLORS = {
  [STUDENT_LEVELS.BEGINNER]: 'bg-green-100 text-green-800',
  [STUDENT_LEVELS.INTERMEDIATE]: 'bg-yellow-100 text-yellow-800',
  [STUDENT_LEVELS.ADVANCED]: 'bg-red-100 text-red-800'
} as const;

export const STATUS_TEXTS = {
  [STUDENT_STATUSES.AVAILABLE]: 'متاح',
  [STUDENT_STATUSES.ASSIGNED]: 'موزع',
  [STUDENT_STATUSES.PENDING]: 'معلق',
  [STUDENT_STATUSES.NEW]: 'جديد',
  [STUDENT_STATUSES.URGENT]: 'عاجل',
  [STUDENT_STATUSES.WAITING]: 'في الانتظار'
} as const;

export const DISTRIBUTION_STATUS_TEXTS = {
  [DISTRIBUTION_STATUSES.ACTIVE]: 'نشط',
  [DISTRIBUTION_STATUSES.COMPLETED]: 'مكتمل',
  [DISTRIBUTION_STATUSES.PENDING]: 'معلق'
} as const;

