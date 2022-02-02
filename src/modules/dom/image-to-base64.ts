export default function imageToBase64(
  src: string,
  format?: string,
  quality?: number,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        return reject(new Error('Canvas is not supported'));
      }

      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL(format, quality));
    };

    img.onerror = reject;
    img.src = src;
  });
}
