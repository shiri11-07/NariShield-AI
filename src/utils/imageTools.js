export function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Image failed to load'));
    img.src = src;
  });
}

export function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Could not read file'));
    reader.readAsDataURL(file);
  });
}

/**
 * Downscale an image (data URL / URL) to at most `maxWidth` and re-encode as JPEG.
 * Keeps localStorage usage small for saved evidence thumbnails.
 */
export async function compressImage(src, maxWidth = 900, quality = 0.72) {
  const img = await loadImage(src);
  const ratio = img.width > maxWidth ? maxWidth / img.width : 1;
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(img.width * ratio));
  canvas.height = Math.max(1, Math.round(img.height * ratio));
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL('image/jpeg', quality);
}

export function assetUrl(path) {
  const base = import.meta.env.BASE_URL || './';
  return `${base}${path.replace(/^\//, '')}`;
}
