import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['./src/main.ts'],
    bundle: true,
    platform: 'node',
    outDir: 'dist',
    noExternal: [/.*/],
});
