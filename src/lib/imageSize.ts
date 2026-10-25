import path from 'node:path';
import sharp from 'sharp';

type Size = { width?: number; height?: number };

const cache = new Map<string, Promise<Size>>();

// Lê largura/altura reais de uma imagem de /public/images no build, para que
// o navegador reserve o espaço antes de carregar (evita layout "pulando").
// Para URLs externas ou arquivos inexistentes devolve {} e o <img> fica sem dimensões.
export function imageSize(src?: string): Promise<Size> {
  if (!src || !src.startsWith('/images/')) return Promise.resolve({});
  let size = cache.get(src);
  if (!size) {
    size = (async () => {
      try {
        const file = path.join(process.cwd(), 'public', decodeURIComponent(src.split(/[?#]/)[0]));
        const { width, height } = await sharp(file).metadata();
        return width && height ? { width, height } : {};
      } catch {
        return {};
      }
    })();
    cache.set(src, size);
  }
  return size;
}
