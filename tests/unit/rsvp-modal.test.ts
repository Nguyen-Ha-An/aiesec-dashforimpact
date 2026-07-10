import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import { initRsvpModal } from '../../src/lib/rsvpModal';

describe('initRsvpModal', () => {
  let dom: JSDOM;

  beforeEach(() => {
    dom = new JSDOM(
      '<button class="rsvp-open" data-event-slug="a" data-event-name="Workshop A">Đăng ký</button>' +
      '<dialog id="rsvp-dialog"><p id="rsvp-event-name"></p><button id="rsvp-close">Đóng</button></dialog>'
    );
    initRsvpModal(dom.window.document);
  });

  it('sets the event name text when the open button is clicked', () => {
    const btn = dom.window.document.querySelector('.rsvp-open') as HTMLElement;
    btn.click();
    const nameEl = dom.window.document.getElementById('rsvp-event-name');
    expect(nameEl?.textContent).toBe('Workshop A');
  });
});
