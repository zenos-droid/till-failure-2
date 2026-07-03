/**
 * Utility functions for data representation formatting inside SaaS sheets.
 */

/**
 * Formats values in Indian Rupees (INR)
 */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Formats timestamp values to local legible spreadsheets
 */
export function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

/**
 * Strips phone inputs down to clean numeric digits
 */
export function sanitizePhone(phone: string): string {
  return phone.replace(/[^0-9+]/g, '');
}
