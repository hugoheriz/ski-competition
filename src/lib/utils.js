//src/lib/utils.js
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function generateAccessCode() {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}

export function formatDate(date) {
  return new Date(date).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });
}

export function handleApiError(error, status = 500) {
  console.error(`API Error: ${error.message}`);
  return NextResponse.json({ error: error.message }, { status });
}