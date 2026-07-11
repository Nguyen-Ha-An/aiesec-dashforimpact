import { describe, it, expect } from 'vitest';
import { withBase } from '../../src/lib/base';

describe('withBase', () => {
  it('prefixes a root-relative path with the configured base', () => {
    expect(withBase('/he-sinh-thai/')).toBe('/aiesec-dashforimpact/he-sinh-thai/');
  });

  it('collapses a double slash when path already starts with the base', () => {
    expect(withBase('/')).toBe('/aiesec-dashforimpact/');
  });

  it('handles nested paths without a leading slash', () => {
    expect(withBase('san-pham/tui-tote/')).toBe('/aiesec-dashforimpact/san-pham/tui-tote/');
  });
});
