import { describe, it, expect } from 'vitest';
import { renderComponent } from './helpers';
import Layout from '../../src/components/Layout.astro';

describe('render harness smoke test', () => {
  it('renders Layout with the given title in the document title', async () => {
    const html = await renderComponent(Layout, { props: { title: 'Test', description: 'Test page' } });
    expect(html).toContain('Test · Ametia Green');
  });
});
