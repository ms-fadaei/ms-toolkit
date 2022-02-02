export default function toEnglishDigits(text: string | number): string {
  text = text.toString();

  // Persian To English
  text = text.replace(/[۰-۹]/g, function (c) {
    return String.fromCharCode(c.charCodeAt(0) - 1728);
  });

  // Arabic to English
  text = text.replace(/[٠-٩]/g, function (c) {
    return String.fromCharCode(c.charCodeAt(0) - 1584);
  });

  return text;
}
