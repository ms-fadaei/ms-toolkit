/**
 * Convert Persian and Arabic digits to English digits
 * @param text entry text, ex: ۱۲۳۴۵۶
 * @returns formatted text, ex: 123456
 */
export default function toEnglishDigits(text: string | number): string {
  if (!text) return '';

  text = text.toString();

  // Persian To English
  text = text.replace(/[۰-۹]/g, function (c) {
    return String.fromCharCode(c.charCodeAt(0) - 1728);
  });

  // Arabic to English
  return text.replace(/[٠-٩]/g, function (c) {
    return String.fromCharCode(c.charCodeAt(0) - 1584);
  });
}
