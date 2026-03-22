import { build } from 'esbuild';

build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  outdir: 'dist',
  platform: 'node',
  target: 'node22',
  format: 'esm',
  outExtension: { '.js': '.js' },
  external: ['@hono/node-server', '@supabase/supabase-js', 'hono', 'jose'],
}).catch(() => process.exit(1));
