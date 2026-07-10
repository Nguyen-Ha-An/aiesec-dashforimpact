import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import HoChieuXanhPage from '../../src/pages/ho-chieu-xanh/index.astro';

describe('/ho-chieu-xanh/', () => {
  it('renders the sample tier, all 5 action types, and the profile disclosure', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(HoChieuXanhPage);
    expect(html).toContain('Cây Trưởng Thành');
    for (const action of ['Chăm sóc', 'Tìm hiểu', 'Sửa chữa', 'Thu hồi', 'Tham gia cộng đồng']) {
      expect(html).toContain(action);
    }
    expect(html).toContain('hồ sơ mô phỏng');
  });
});
