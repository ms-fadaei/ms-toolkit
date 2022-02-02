export default function thousandSeparator(text: string | number, separator = ','): string {
  return text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}
