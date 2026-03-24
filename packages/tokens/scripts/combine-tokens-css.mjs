import fs from 'fs/promises';
import path from 'path';

const distCssDir = path.join(process.cwd(), 'dist', 'css');
const primitivesCssPath = path.join(distCssDir, 'tokens.css');
const categoricalLightCssPath = path.join(distCssDir, 'categorical-light.css');
const categoricalDarkCssPath = path.join(distCssDir, 'categorical-dark.css');

const [primitivesCss, categoricalLightCss, categoricalDarkCss] = await Promise.all([
  fs.readFile(primitivesCssPath, 'utf8'),
  fs.readFile(categoricalLightCssPath, 'utf8'),
  fs.readFile(categoricalDarkCssPath, 'utf8')
]);

const combinedCss =
  primitivesCss.trimEnd() +
  '\n' +
  categoricalLightCss.trimEnd() +
  '\n' +
  categoricalDarkCss.trimEnd() +
  '\n';

await fs.writeFile(primitivesCssPath, combinedCss, 'utf8');

