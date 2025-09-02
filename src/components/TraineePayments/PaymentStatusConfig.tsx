import { CheckCircle, XCircle, Clock } from 'lucide-react';

export const statusConfig = {
  paid: {
    label: 'مدفوع بالكامل',
    color: 'bg-green-100 text-green-800',
    icon: CheckCircle
  },
  partial: {
    label: 'مدفوع جزئياً',
    color: 'bg-yellow-100 text-yellow-800',
    icon: Clock
  },
  unpaid: {
    label: 'غير مدفوع',
    color: 'bg-red-100 text-red-800',
    icon: XCircle
  }
};
