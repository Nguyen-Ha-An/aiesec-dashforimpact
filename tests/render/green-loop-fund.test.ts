import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import GreenLoopFundPage from '../../src/pages/green-loop-fund/index.astro';
import { fundData } from '../../src/data/fund';

describe('/green-loop-fund/', () => {
  it('renders every project name, the formatted balance, and the prototype-data label', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(GreenLoopFundPage);
    for (const p of fundData.projects) {
      expect(html).toContain(p.name);
    }
    expect(html).toContain(fundData.balanceVnd.toLocaleString('vi-VN'));
    expect(html).toContain('Dữ liệu minh họa cho prototype');
  });
});
