/**
 * Convert English and Arabic digits to Persian digits
 * @param text entry text, ex: 123456
 * @returns formatted text, ex: ۱۲۳۴۵۶
 */
export default function toPersianDigits(text: string | number): string {
  if (!text) return '';

  text = text.toString();

  // English to Persian
  text = text.replace(/[0-9]/g, function (c) {
    return String.fromCharCode(c.charCodeAt(0) + 1728);
  });

  // Arabic to Persian
  return text.replace(/[٠-٩]/g, function (c) {
    return String.fromCharCode(c.charCodeAt(0) + 144);
  });
}
