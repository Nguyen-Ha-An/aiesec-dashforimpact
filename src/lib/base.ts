const BASE = '/aiesec-dashforimpact/';

export function withBase(path: string): string {
  const trimmed = path.replace(/^\/+/, '');
  if (trimmed === '') return BASE;
  return `${BASE}${trimmed}`.replace(/([^:])\/{2,}/g, '$1/');
}
