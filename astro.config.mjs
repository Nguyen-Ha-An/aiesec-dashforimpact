import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

export default defineConfig({
  site: 'https://nguyen-ha-an.github.io',
  base: '/aiesec-dashforimpact/',
  output: 'static',
  trailingSlash: 'always',
  integrations: [icon()],
});
