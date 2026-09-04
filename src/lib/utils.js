/**
 * Utility function to merge class names
 * Combines multiple class strings and removes duplicates
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
