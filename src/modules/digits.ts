export function toEnglishDigits(text: string | number): string {
  text = String(text);

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

export function toPersianDigits(text: string | number): string {
  text = String(text);

  // English to Persian
  text = text.replace(/[0-9]/g, function (c) {
    return String.fromCharCode(c.charCodeAt(0) + 1728);
  });

  // Arabic to Persian
  text = text.replace(/[٠-٩]/g, function (c) {
    return String.fromCharCode(c.charCodeAt(0) + 144);
  });

  return text;
}

export function thousandSeparator(text: string | number, separator = ','): string {
  return text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}
