import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import GioiThieuPage from '../../src/pages/gioi-thieu/index.astro';

describe('/gioi-thieu/', () => {
  it('renders the target-audience and transparency positioning plus the prototype disclosure', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(GioiThieuPage);
    expect(html).toContain('người trẻ đi làm');
    expect(html).toContain('minh bạch');
    expect(html).toContain('bản dựng thử nghiệm');
  });
});
