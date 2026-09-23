// Every CMS image upload (property photos, banner ads, page images, media
// library) goes through this before it is stored anywhere. Raw phone-camera
// photos are routinely 3-8MB — base64-encoded and saved as-is, a handful of
// those blow past both the server's request-size limit and the browser's
// localStorage quota, which is why uploads used to silently fail to save.
// Downscaling to a sane max dimension and re-encoding as compressed JPEG
// (keeping PNG only when transparency is actually used) cuts typical photos
// down to well under 300KB with no visible quality loss for web display.

const MAX_DIMENSION = 1600; // px, longest side
const JPEG_QUALITY = 0.72;

export function compressImageFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Not an image file'));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Could not read the file'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Could not decode the image'));
      img.onload = () => {
        let { width, height } = img;

        if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
          if (width >= height) {
            height = Math.round((height * MAX_DIMENSION) / width);
            width = MAX_DIMENSION;
          } else {
            width = Math.round((width * MAX_DIMENSION) / height);
            height = MAX_DIMENSION;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas not supported on this device'));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);

        // Keep PNG only for images that actually need transparency (e.g.
        // logos/watermarks); everything else becomes a compressed JPEG,
        // which is dramatically smaller for real estate photos.
        const keepPng = file.type === 'image/png' && file.name.toLowerCase().includes('logo');
        const mime = keepPng ? 'image/png' : 'image/jpeg';
        const dataUrl = canvas.toDataURL(mime, keepPng ? undefined : JPEG_QUALITY);
        resolve(dataUrl);
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

// Rough size of a base64 data URL in KB, used to warn the admin before they
// try to save something that still won't fit after compression (e.g. a
// non-image file, or a video accidentally picked from the file dialog).
export function estimateDataUrlSizeKb(dataUrl: string): number {
  const base64 = dataUrl.split(',')[1] || '';
  return Math.round((base64.length * 3) / 4 / 1024);
}
