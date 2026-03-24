import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

/** @type {import('style-dictionary').Config} */
export default {
  // Value tokens = primitives (spacing, color, font, radius, grid). Single source for CSS vars.
  source: [path.join(__dirname, 'src', 'value.tokens.json')],
  platforms: {
    css: {
      transformGroup: 'css',
      prefix: '',
      buildPath: 'dist/css/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: { outputReferences: true }
        }
      ]
    }
  }
};
