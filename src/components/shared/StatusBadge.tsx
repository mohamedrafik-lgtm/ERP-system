/**
 * Reusable Status Badge Component
 * Single Responsibility: Display status badges
 * Open/Closed Principle: Extensible for different status types
 */

import { LucideIcon, CheckCircle, Clock, XCircle, AlertCircle, RefreshCw } from "lucide-react";

type DeliveryStatus = 'PENDING' | 'DELIVERED' | 'RETURNED' | 'LOST';
type AttendanceStatus = 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED';

interface StatusConfig {
  bg: string;
  text: string;
  icon: LucideIcon;
  label: string;
}

const deliveryStatusConfig: Record<DeliveryStatus, StatusConfig> = {
  PENDING: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    icon: Clock,
    label: 'قيد الانتظار'
  },
  DELIVERED: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    icon: CheckCircle,
    label: 'تم التسليم'
  },
  RETURNED: {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    icon: RefreshCw,
    label: 'تم الإرجاع'
  },
  LOST: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    icon: AlertCircle,
    label: 'مفقود'
  }
};

const attendanceStatusConfig: Record<AttendanceStatus, StatusConfig> = {
  PRESENT: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    icon: CheckCircle,
    label: 'حاضر'
  },
  ABSENT: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    icon: XCircle,
    label: 'غائب'
  },
  LATE: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    icon: Clock,
    label: 'متأخر'
  },
  EXCUSED: {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    icon: AlertCircle,
    label: 'غياب بعذر'
  }
};

interface StatusBadgeProps {
  status: DeliveryStatus | AttendanceStatus;
  type: 'delivery' | 'attendance';
  className?: string;
}

export function StatusBadge({ status, type, className = '' }: StatusBadgeProps) {
  const config = type === 'delivery' 
    ? deliveryStatusConfig[status as DeliveryStatus]
    : attendanceStatusConfig[status as AttendanceStatus];
  
  if (!config) return null;
  
  const Icon = config.icon;
  
  return (
    <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold ${config.bg} ${config.text} ${className}`}>
      <Icon className="w-4 h-4" />
      {config.label}
    </span>
  );
}