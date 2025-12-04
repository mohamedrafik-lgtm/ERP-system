/**
 * Image handling utilities
 * Solves the [object File] problem and provides consistent image URL handling
 */

const API_BASE_URL = 'http://localhost:4000';

/**
 * Validates and returns a proper image URL or null
 * Handles various edge cases including [object File]
 */
export function getValidImageUrl(photoUrl: unknown): string | null {
  // Check if photoUrl exists
  if (!photoUrl) return null;
  
  // Must be a string
  if (typeof photoUrl !== 'string') return null;
  
  // Check for [object File] or any [object ...] pattern
  if (photoUrl.includes('[object')) return null;
  
  // Check for empty string
  if (photoUrl.trim() === '') return null;
  
  // Handle absolute URLs (already complete)
  if (photoUrl.startsWith('http://') || photoUrl.startsWith('https://')) {
    return photoUrl;
  }
  
  // Handle relative URLs starting with /uploads
  if (photoUrl.startsWith('/uploads')) {
    return `${API_BASE_URL}${photoUrl}`;
  }
  
  // Invalid format
  return null;
}

/**
 * Check if image URL is valid
 */
export function isValidImageUrl(photoUrl: unknown): boolean {
  return getValidImageUrl(photoUrl) !== null;
}

/**
 * Get image URL with fallback
 */
export function getImageUrlWithFallback(
  photoUrl: unknown,
  fallback: string = '/placeholder-avatar.png'
): string {
  return getValidImageUrl(photoUrl) || fallback;
}