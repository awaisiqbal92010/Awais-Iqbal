/**
 * Security & Sanitization Utilities for Awais Iqbal Portfolio
 * Prevents XSS, input injection, malicious URLs, and provides secure hashing.
 */

// Basic HTML Sanitizer to prevent Stored & DOM-based Cross-Site Scripting (XSS)
export function sanitizeInput(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// URL Validator to prevent javascript: pseudo-protocol execution in href attributes
export function sanitizeUrl(url) {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();
  if (
    trimmed.startsWith('https://') ||
    trimmed.startsWith('http://') ||
    trimmed.startsWith('mailto:') ||
    trimmed.startsWith('tel:') ||
    trimmed.startsWith('#') ||
    trimmed.startsWith('/')
  ) {
    return trimmed;
  }
  return '#';
}

// Client-side SHA-256 Hashing using Web Crypto API
export async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

// SHA-256 Hash of "VibeCodeWith@w@i$"
// Prevents exposing plaintext passwords in client bundles
export const AUTH_PASSWORD_HASH = '900b90426f8b9e68b3c3c39bb725a3d76e036e6c1e54911d511874b3353e8d91'; // sha256 generated
export const AUTH_EMAIL = 'vcwithawais@gmail.com';

// Contact Form Rate Limiter (Cooldown prevention for spam bots)
const SUBMISSION_TIMESTAMPS = [];
export function checkRateLimit(maxPerMinute = 3) {
  const now = Date.now();
  const oneMinuteAgo = now - 60000;
  // filter recent
  const recent = SUBMISSION_TIMESTAMPS.filter(t => t > oneMinuteAgo);
  if (recent.length >= maxPerMinute) {
    return false;
  }
  SUBMISSION_TIMESTAMPS.push(now);
  return true;
}
