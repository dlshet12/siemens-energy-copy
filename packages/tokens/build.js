/**
 * Design tokens build: reads variables.json only ($value/$type, Dark/Light, refs).
 * Outputs CSS custom properties (Light + Dark theme), JSON, and ESM JS.
 * Single source of truth: variables.json.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = __dirname;
const BUILD = path.join(ROOT, 'build');
const REF_REGEX = /\{([^}]+)\}/g;

/** Normalize a path segment for CSS (spaces -> hyphens, dots not in path) */
function segment(key) {
  return String(key).replace(/\s+/g, '-');
}

/** Flatten object; values are $value (may be string, number, or { Dark, Light }) */
function flatten(obj, prefix = '') {
  const out = {};
  for (const [key, value] of Object.entries(obj)) {
    const seg = segment(key);
    const pathKey = prefix ? `${prefix}.${seg}` : seg;
    if (value && typeof value === 'object' && '$value' in value) {
      const v = value.$value;
      if (v !== null && typeof v === 'object' && !Array.isArray(v) && ('Dark' in v || 'Light' in v)) {
        out[pathKey] = { Dark: v.Dark, Light: v.Light };
      } else {
        out[pathKey] = v;
      }
    } else if (value && typeof value === 'object' && !('$value' in value)) {
      Object.assign(out, flatten(value, pathKey));
    }
  }
  return out;
}

/** Resolve {path.ref} in string; refs are dot paths matching our flat keys */
function resolveRefs(str, resolved) {
  if (typeof str !== 'string') return str;
  return str.replace(REF_REGEX, (_, ref) => {
    const refKey = ref.trim().replace(/\s+/g, '-');
    return resolved[refKey] != null ? String(resolved[refKey]) : ref;
  });
}

/** Resolve all references; supports Dark/Light by resolving per-mode */
function resolveReferences(flat) {
  const resolved = { ...flat };
  const keys = Object.keys(resolved);

  function resolveValue(val) {
    if (typeof val === 'string') {
      let v = val;
      let changed = true;
      while (changed) {
        changed = false;
        const match = v.match(REF_REGEX);
        if (match) {
          for (const m of match) {
            const refKey = m.slice(1, -1).trim().replace(/\s+/g, '-');
            if (refKey in resolved) {
              const refVal = resolved[refKey];
              const replaceWith = typeof refVal === 'object' && refVal !== null && ('Dark' in refVal || 'Light' in refVal)
                ? refVal.Light ?? refVal.Dark
                : refVal;
              v = v.replace(m, String(replaceWith));
              changed = true;
            }
          }
        }
      }
      return v;
    }
    if (typeof val === 'object' && val !== null && ('Dark' in val || 'Light' in val)) {
      return {
        Dark: resolveValue(val.Dark),
        Light: resolveValue(val.Light),
      };
    }
    return val;
  }

  let changed = true;
  while (changed) {
    changed = false;
    for (const key of keys) {
      const val = resolved[key];
      const next = resolveValue(val);
      if (JSON.stringify(next) !== JSON.stringify(val)) {
        resolved[key] = next;
        changed = true;
      }
    }
  }

  return resolved;
}

/** Build Light and Dark maps for CSS. Numbers for space/type.size/type.line become "Npx" */
function toThemedMaps(resolved) {
  const isPx = (key) =>
    key.startsWith('Primitives.space.') ||
    key.startsWith('Primitives.type.size.') ||
    key.startsWith('Primitives.type.line.');

  const light = {};
  const dark = {};

  for (const [key, value] of Object.entries(resolved)) {
    const cssName = '--ui-' + key.replace(/\./g, '-');
    const format = (v) => {
      if (typeof v === 'number' && isPx(key)) return `${v}px`;
      return v;
    };

    if (value !== null && typeof value === 'object' && ('Dark' in value || 'Light' in value)) {
      light[cssName] = format(value.Light ?? value.Dark);
      dark[cssName] = format(value.Dark ?? value.Light);
    } else {
      const formatted = format(value);
      light[cssName] = formatted;
      dark[cssName] = formatted;
    }
  }

  return { light, dark };
}

function toCss(light, dark) {
  const lines = [
    '/* Design tokens — generated from variables.json. Do not edit by hand. */',
    ':root, [data-theme="light"] {',
    ...Object.entries(light).map(([name, value]) => `  ${name}: ${value};`),
    '}',
    '',
    '[data-theme="dark"] {',
    ...Object.entries(dark).map(([name, value]) => `  ${name}: ${value};`),
    '}',
  ];
  return lines.join('\n');
}

function toJsExport(resolved) {
  const nested = {};
  for (const [key, value] of Object.entries(resolved)) {
    const parts = key.split('.');
    let cur = nested;
    for (let i = 0; i < parts.length - 1; i++) {
      const p = parts[i];
      if (!cur[p]) cur[p] = {};
      cur = cur[p];
    }
    cur[parts[parts.length - 1]] = value;
  }
  return `/** Design tokens — generated from variables.json. Do not edit. */\nexport const tokens = ${JSON.stringify(nested, null, 2)};\nexport default tokens;\n`;
}

function main() {
  const inputPath = path.join(ROOT, 'variables.json');
  if (!fs.existsSync(inputPath)) {
    console.error('variables.json not found in packages/tokens. Use variables.json as the only token source.');
    process.exit(1);
  }

  const raw = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));
  const flat = flatten(raw);
  const resolved = resolveReferences(flat);
  const { light, dark } = toThemedMaps(resolved);

  if (!fs.existsSync(BUILD)) fs.mkdirSync(BUILD, { recursive: true });

  const css = toCss(light, dark);
  fs.writeFileSync(path.join(BUILD, 'tokens.css'), css, 'utf-8');

  fs.writeFileSync(path.join(BUILD, 'tokens.json'), JSON.stringify(resolved, null, 2), 'utf-8');

  const js = toJsExport(resolved);
  fs.writeFileSync(path.join(BUILD, 'tokens.js'), js, 'utf-8');

  const dts = `/** Design tokens — generated from variables.json. Do not edit. */\ndeclare const tokens: typeof import('./tokens.js').tokens;\nexport { tokens };\nexport default tokens;\n`;
  fs.writeFileSync(path.join(BUILD, 'tokens.d.ts'), dts, 'utf-8');

  console.log('Tokens built from variables.json: build/tokens.css, build/tokens.json, build/tokens.js');
}

main();
