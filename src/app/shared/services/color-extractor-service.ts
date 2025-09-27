import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorExtractorService {
  isLightColor(primaryColor: string): boolean {
  let hex = primaryColor.startsWith('#') ? primaryColor.slice(1) : primaryColor;

  if (hex.length === 3) {
    hex = hex.split('').map(char => char + char).join('');
  }

  if (hex.length !== 6) {
    console.error('Formato de cor hexadecimal inválido.');
    return false;
  }

  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  const rsRGB = r / 255;
  const gsRGB = g / 255;
  const bsRGB = b / 255;

  const rLinear = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
  const gLinear = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
  const bLinear = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);

  const luminance = 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;


  return luminance > 0.35;
}

  async extractDominantColor(imageUrl: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';

      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          if (!ctx) {
            reject('Não foi possível obter contexto do canvas');
            return;
          }

          const maxSize = 100;
          const scale = Math.min(maxSize / img.width, maxSize / img.height);
          canvas.width = img.width * scale;
          canvas.height = img.height * scale;

          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const dominantColor = this.getDominantColor(imageData.data);

          resolve(dominantColor);
        } catch (error) {
          reject(error);
        }
      };

      img.onerror = () => {
        resolve('#8b8bff');
      };

      img.src = imageUrl;
    });
  }

  private getDominantColor(data: Uint8ClampedArray): string {
    const colorCounts: { [key: string]: number } = {};

    for (let i = 0; i < data.length; i += 4) {
      const r = Math.floor(data[i] / 10) * 10;
      const g = Math.floor(data[i + 1] / 10) * 10;
      const b = Math.floor(data[i + 2] / 10) * 10;

      const brightness = (r + g + b) / 3;
      if (brightness < 30 || brightness > 200) continue;

      const colorKey = `${r},${g},${b}`;
      colorCounts[colorKey] = (colorCounts[colorKey] || 0) + 1;
    }

    let maxCount = 0;
    let dominantColor = '139,139,255';

    for (const [color, count] of Object.entries(colorCounts)) {
      if (count > maxCount) {
        maxCount = count;
        dominantColor = color;
      }
    }

    const [r, g, b] = dominantColor.split(',').map(Number);
    return this.rgbToHex(r, g, b);
  }

  private rgbToHex(r: number, g: number, b: number): string {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  }

  getDarkerVariation(hexColor: string, percentage: number = 20): string {
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    const darkerR = Math.max(0, Math.floor(r * (100 - percentage) / 100));
    const darkerG = Math.max(0, Math.floor(g * (100 - percentage) / 100));
    const darkerB = Math.max(0, Math.floor(b * (100 - percentage) / 100));

    return this.rgbToHex(darkerR, darkerG, darkerB);
  }
}
