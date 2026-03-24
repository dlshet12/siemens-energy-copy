import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

/** @type {import('style-dictionary').Config} */
export default {
  source: [path.join(__dirname, 'src', 'categorical.light.tokens.json')],
  platforms: {
    css: {
      transformGroup: 'css',
      prefix: '',
      buildPath: 'dist/css/',
      files: [
        {
          destination: 'categorical-light.css',
          format: 'css/variables',
          options: { outputReferences: true, selector: [':root'] }
        }
      ]
    }
  }
};

