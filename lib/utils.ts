import type { PhotoCategory } from "./types";

const categoryHues: Record<PhotoCategory, number> = {
  "Living room 1": 32,
  "Living room 2": 215,
  "Full kitchen": 145,
  Bedroom: 275,
  "Full bathroom": 185,
  Gym: 355,
  Exterior: 95,
  Pool: 205,
  "Additional photos": 40,
};

/** Returns an inline-style background gradient for a placeholder photo. */
export function getPlaceholderGradient(
  category: PhotoCategory,
  index: number,
): string {
  const hue = categoryHues[category] ?? 200;
  const sat = 28 + (index % 3) * 8;
  const light = 74 - (index % 4) * 4;
  return `linear-gradient(135deg, hsl(${hue}, ${sat}%, ${light}%) 0%, hsl(${(hue + 25) % 360}, ${sat + 10}%, ${light - 14}%) 100%)`;
}

/** Format a number as Indian Rupees. */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Merge class names, filtering falsy values. */
export function cn(
  ...classes: (string | false | undefined | null)[]
): string {
  return classes.filter(Boolean).join(" ");
}
