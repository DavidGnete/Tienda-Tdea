import { CLOUDINARY_BASE_URL } from "@/lib/constants";

export function resolveImage(url: string) {
  if (!url) return '/images/no-image.png';
  if (url.startsWith('https://res.cloudinary.com') || url.startsWith('http://res.cloudinary.com')) return url;
  if (!url.startsWith('http')) return `${CLOUDINARY_BASE_URL}/${url}`;
  return '/images/no-image.png';
}