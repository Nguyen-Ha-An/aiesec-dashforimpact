import fs from 'node:fs';
import path from 'node:path';
import { withBase } from './base';

const PRODUCTS_DIR = path.resolve('public/images/products');
const EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.avif'];

/**
 * Tìm ảnh thật trong `public/images/products/` theo tên file cơ sở (thường là slug
 * sản phẩm hoặc `hero-collection`). Trả về đường dẫn web đã kèm base nếu tìm thấy,
 * ngược lại trả về null để component tự dùng ảnh minh họa.
 */
export function resolveProductImage(name: string): string | null {
  for (const ext of EXTENSIONS) {
    const file = `${name}${ext}`;
    if (fs.existsSync(path.join(PRODUCTS_DIR, file))) {
      return withBase(`images/products/${file}`);
    }
  }
  return null;
}
