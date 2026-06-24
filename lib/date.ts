/**
 * Formats an incoming date string into a readable format.
 * @param dateString - The raw date string (e.g., "2026-06-14T10:05:51.673Z" or "2026-06-14")
 * @returns A formatted string (e.g., "June 14, 2026") or an empty string if invalid.
 */
export function formatReadableDate(
  dateString: string | undefined | null,
): string {
  if (!dateString) return "";

  const date = new Date(dateString);

  // Validate that the string actually parsed into a real date object
  if (isNaN(date.getTime())) {
    console.error(
      "Invalid date string provided to formatReadableDate:",
      dateString,
    );
    return "";
  }

  // Use the native Intl API for clean, localized formatting
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}
