/**
 * Utility functions for date formatting
 */

export const formatDate = (date: Date | string) => {
  try {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('ar-SA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  } catch {
    return 'غير محدد';
  }
};

export const formatDateTime = (date: Date | string | null) => {
  if (!date) return 'لم يسجل دخول';
  try {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('ar-SA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return 'غير محدد';
  }
};

export const formatDateOnly = (date: Date | string) => {
  try {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('ar-SA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  } catch {
    return 'غير محدد';
  }
};
