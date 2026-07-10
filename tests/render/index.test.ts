import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import IndexPage from '../../src/pages/index.astro';
import { products } from '../../src/data/products';

describe('/ (homepage)', () => {
  it('renders the slogan, all 7 product names, and links to the ecosystem journey', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(IndexPage);
    expect(html).toContain('Mặc lâu hơn. Chọn rõ hơn.');
    for (const p of products) {
      expect(html).toContain(p.name);
    }
    expect(html).toContain('/aiesec-dashforimpact/he-sinh-thai/');
  });
});
