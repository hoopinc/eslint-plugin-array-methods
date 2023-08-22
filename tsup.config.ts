import { defineConfig } from 'tsup';

const tsupConfig = defineConfig({
  entry: ['rule.ts'],
  splitting: false,
  minify: true,
  clean: true,
  tsconfig: 'tsconfig.json',
});

// eslint-disable-next-line
export default tsupConfig;