import { describe, expect, it } from 'vitest';

import { defineConfig } from './define-config';

describe('defineConfig', () => {
  it('disables Next.js agent rule injection', () => {
    expect(defineConfig({}).agentRules).toBe(false);
  });

  it('caches hashed SPA build artifacts without caching fixed-name root assets', async () => {
    const headers = await defineConfig({}).headers?.();
    const spaCacheRules = headers?.filter(({ source }) => source.startsWith('/_spa/'));

    expect(spaCacheRules).toEqual([
      {
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'CDN-Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
        source: '/_spa/:directory(assets|i18n|vendor)/:path*',
      },
    ]);
  });
});
