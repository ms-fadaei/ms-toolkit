/**
 * Thousand Separator
 * @param text entry text, ex: 300000
 * @param separator separator character, ex: ,
 * @returns string formatted text, ex: 300,000
 */
export default function thousandSeparator(text: string | number, separator = ','): string {
  return text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}
