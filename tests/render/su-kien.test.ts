import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import SuKienPage from '../../src/pages/su-kien/index.astro';
import { events } from '../../src/data/events';

describe('/su-kien/', () => {
  it('renders every event name and the shared rsvp dialog', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(SuKienPage);
    for (const e of events) {
      expect(html).toContain(e.name);
    }
    expect(html).toContain('id="rsvp-dialog"');
  });
});
