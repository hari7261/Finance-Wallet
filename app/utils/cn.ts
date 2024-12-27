// lib/cn.ts

/**
 * Utility function to conditionally join class names.
 * @param classes - A list of class names or conditional class names.
 * @returns A string of joined class names.
 */
export function cn(...classes: (string | undefined | false)[]): string {
    return classes.filter(Boolean).join(' ');
}