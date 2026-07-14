const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const vendorDir = path.join(root, 'vendor');
const fontsDir = path.join(vendorDir, 'fonts');

function copy(from, to) {
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(from, to);
  console.log(`Copied ${path.relative(root, from)} -> ${path.relative(root, to)}`);
}

const copyJobs = [
  {
    from: path.join(path.dirname(require.resolve('jszip/package.json')), 'dist', 'jszip.min.js'),
    to: path.join(vendorDir, 'jszip.min.js')
  },
  {
    from: path.join(path.dirname(require.resolve('pako/package.json')), 'dist', 'pako.min.js'),
    to: path.join(vendorDir, 'pako.min.js')
  }
];

const fontJobs = [
  ...[400, 500, 600, 700].map((weight) => ({
    family: 'Inter',
    from: path.join(path.dirname(require.resolve('@fontsource/inter/package.json')), 'files', `inter-latin-${weight}-normal.woff2`),
    to: path.join(fontsDir, `inter-latin-${weight}-normal.woff2`),
    weight
  })),
  ...[500, 600, 700].map((weight) => ({
    family: 'Space Grotesk',
    from: path.join(path.dirname(require.resolve('@fontsource/space-grotesk/package.json')), 'files', `space-grotesk-latin-${weight}-normal.woff2`),
    to: path.join(fontsDir, `space-grotesk-latin-${weight}-normal.woff2`),
    weight
  })),
  ...[400, 500, 600, 700].map((weight) => ({
    family: 'JetBrains Mono',
    from: path.join(path.dirname(require.resolve('@fontsource/jetbrains-mono/package.json')), 'files', `jetbrains-mono-latin-${weight}-normal.woff2`),
    to: path.join(fontsDir, `jetbrains-mono-latin-${weight}-normal.woff2`),
    weight
  }))
];

fs.mkdirSync(vendorDir, { recursive: true });
fs.mkdirSync(fontsDir, { recursive: true });

for (const job of copyJobs) {
  copy(job.from, job.to);
}

for (const job of fontJobs) {
  copy(job.from, job.to);
}

const fontCss = [
  ...[500, 600, 700].map((weight) => `@font-face {\n  font-family: 'Space Grotesk';\n  font-style: normal;\n  font-weight: ${weight};\n  font-display: swap;\n  src: url('./fonts/space-grotesk-latin-${weight}-normal.woff2') format('woff2');\n}`),
  ...[400, 500, 600, 700].map((weight) => `@font-face {\n  font-family: 'Inter';\n  font-style: normal;\n  font-weight: ${weight};\n  font-display: swap;\n  src: url('./fonts/inter-latin-${weight}-normal.woff2') format('woff2');\n}`),
  ...[400, 500, 600, 700].map((weight) => `@font-face {\n  font-family: 'JetBrains Mono';\n  font-style: normal;\n  font-weight: ${weight};\n  font-display: swap;\n  src: url('./fonts/jetbrains-mono-latin-${weight}-normal.woff2') format('woff2');\n}`)
].join('\n\n');

fs.writeFileSync(path.join(vendorDir, 'fonts.css'), `${fontCss}\n`, 'utf8');
console.log(`Wrote ${path.relative(root, path.join(vendorDir, 'fonts.css'))}`);
