/**
 * Utility functions for formatting data
 * Following Single Responsibility Principle
 */

/**
 * Format date to Arabic locale
 */
export function formatDate(date: Date | string | null): string {
  if (!date) return '-';
  
  try {
    return new Date(date).toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch {
    return '-';
  }
}

/**
 * Format date to long Arabic format
 */
export function formatDateLong(date: Date | string | null): string {
  if (!date) return '-';
  
  try {
    return new Date(date).toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch {
    return '-';
  }
}

/**
 * Format time string
 */
export function formatTime(time: string | null): string {
  if (!time) return '-';
  return time;
}

/**
 * Calculate percentage
 */
export function calculatePercentage(value: number, total: number): string {
  if (total === 0) return '0';
  return ((value / total) * 100).toFixed(1);
}

/**
 * Format phone number
 */
export function formatPhoneNumber(phone: string | null): string {
  if (!phone) return '-';
  return phone;
}

/**
 * Format national ID
 */
export function formatNationalId(nationalId: string | null): string {
  if (!nationalId) return '-';
  return nationalId;
}