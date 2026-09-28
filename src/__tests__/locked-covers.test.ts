import { describe, expect, it } from 'vitest';
import { resolve } from 'node:path';
import { LOCKED_COVERS, lockedCoverFailures } from '../../scripts/locked-covers.mjs';

const ROOT = resolve(import.meta.dirname, '../..');

describe('locked blog covers', () => {
  it('keeps the KI post on the XWEB-209 cream master bytes', () => {
    const ki = LOCKED_COVERS.find((cover) => cover.path.includes('ki-pa-gamle-vaner-holder-ikke'));
    expect(ki, 'KI cover must stay in the locked list').toBeDefined();

    const failures = lockedCoverFailures(ROOT, ki ? [ki] : [], { label: 'locked-covers test' });
    expect(failures, failures.join('\n')).toEqual([]);
  });
});
