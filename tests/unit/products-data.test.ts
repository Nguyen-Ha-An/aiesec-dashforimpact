import { describe, it, expect } from 'vitest';
import { products, getProductBySlug } from '../../src/data/products';

const EXPECTED_SLUGS = [
  'ao-thun-form-rong', 'ao-so-mi-tay-ngan', 'ao-khoac-mong',
  'quan-dai-ong-suong', 'quan-short', 'tui-tote', 'mu-luoi-trai',
];

describe('products data', () => {
  it('has exactly 7 products with the expected slugs', () => {
    expect(products).toHaveLength(7);
    expect(products.map((p) => p.slug).sort()).toEqual([...EXPECTED_SLUGS].sort());
  });

  it('matches the source pricing table exactly', () => {
    expect(getProductBySlug('ao-thun-form-rong')?.priceVnd).toBe(599000);
    expect(getProductBySlug('ao-so-mi-tay-ngan')?.priceVnd).toBe(699000);
    expect(getProductBySlug('ao-khoac-mong')?.priceVnd).toBe(1190000);
    expect(getProductBySlug('quan-dai-ong-suong')?.priceVnd).toBe(990000);
    expect(getProductBySlug('quan-short')?.priceVnd).toBe(799000);
    expect(getProductBySlug('tui-tote')?.priceVnd).toBe(299000);
    expect(getProductBySlug('mu-luoi-trai')?.priceVnd).toBe(269000);
  });

  it('every product has a non-empty story with at least 3 paragraphs, a timeline with at least 4 stages, and a unique SKU', () => {
    const skus = new Set<string>();
    for (const p of products) {
      expect(p.story.paragraphs.length).toBeGreaterThanOrEqual(3);
      expect(p.timeline.length).toBeGreaterThanOrEqual(4);
      expect(p.materials.length).toBeGreaterThan(0);
      expect(p.features.length).toBeGreaterThan(0);
      expect(p.care.length).toBeGreaterThan(0);
      skus.add(p.sku);
    }
    expect(skus.size).toBe(7);
  });

  it('contains no em-dash characters anywhere in product copy', () => {
    for (const p of products) {
      const text = [p.name, p.materials, p.story.title, ...p.story.paragraphs, ...p.care, ...p.features.map((f) => f.label)].join(' ');
      expect(text).not.toMatch(/[—–]/);
    }
  });
});
