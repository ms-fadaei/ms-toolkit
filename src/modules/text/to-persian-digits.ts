export default function toPersianDigits(text: string | number): string {
  text = text.toString();

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
