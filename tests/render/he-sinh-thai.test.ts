import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import HeSinhThaiPage from '../../src/pages/he-sinh-thai/index.astro';

describe('/he-sinh-thai/', () => {
  it('renders the section anchors and the required disclosure phrases', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(HeSinhThaiPage);
    expect(html).toContain('id="kham-pha"');
    expect(html).toContain('id="tham-gia"');
    expect(html).toContain('id="lan-toa"');
    expect(html).toContain('giao diện mô phỏng');
    expect(html).toContain('Dữ liệu minh họa cho prototype');
  });

  it('no longer references eco-packaging (bao bì) content', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(HeSinhThaiPage);
    expect(html).not.toContain('bao bì');
    expect(html).not.toContain('rong biển');
  });
});
