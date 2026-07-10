import { describe, it, expect } from 'vitest';
import { generateQrPattern } from '../../src/lib/qrPattern';

describe('generateQrPattern', () => {
  it('returns a square grid of the requested size', () => {
    const grid = generateQrPattern('tui-tote', 21);
    expect(grid).toHaveLength(21);
    expect(grid.every((row) => row.length === 21)).toBe(true);
  });

  it('is deterministic for the same seed', () => {
    expect(generateQrPattern('tui-tote')).toEqual(generateQrPattern('tui-tote'));
  });

  it('differs across seeds', () => {
    expect(generateQrPattern('tui-tote')).not.toEqual(generateQrPattern('mu-luoi-trai'));
  });
});
