export function initRsvpModal(doc: Document): void {
  const dialog = doc.getElementById('rsvp-dialog') as HTMLDialogElement | null;
  const nameEl = doc.getElementById('rsvp-event-name');
  const closeBtn = doc.getElementById('rsvp-close');
  if (!dialog || !nameEl) return;

  doc.querySelectorAll('.rsvp-open').forEach((btn) => {
    btn.addEventListener('click', () => {
      const eventName = btn.getAttribute('data-event-name') || '';
      nameEl.textContent = eventName;
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else dialog.setAttribute('open', '');
    });
  });

  closeBtn?.addEventListener('click', () => {
    if (typeof dialog.close === 'function') dialog.close();
    else dialog.removeAttribute('open');
  });
}
