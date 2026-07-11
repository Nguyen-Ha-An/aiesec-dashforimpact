import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import ProductPage from '../../src/pages/san-pham/[slug].astro';
import { products } from '../../src/data/products';

describe('/san-pham/[slug]/', () => {
  it('renders one page per product with correct name, price, SKU, and materials', async () => {
    const container = await AstroContainer.create();
    for (const p of products) {
      const html = await container.renderToString(ProductPage, {
        params: { slug: p.slug },
        props: { product: p },
      });
      expect(html).toContain(p.name);
      expect(html).toContain(p.sku);
      expect(html).toContain(p.materials.replace(/&/g, '&amp;'));
      expect(html).toContain(p.priceVnd.toLocaleString('vi-VN'));
    }
  });
});
