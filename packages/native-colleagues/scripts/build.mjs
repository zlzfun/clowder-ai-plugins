import { build } from 'esbuild';
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
const result = await build({
  entryPoints: ['src/mcp-entrypoint.mjs'], outfile: 'dist/mcp-entrypoint.mjs',
  bundle: true, platform: 'node', format: 'esm', target: 'node20', metafile: true,
  banner: { js: "import { createRequire } from 'node:module'; const require = createRequire(import.meta.url);" },
});
const notices = new Map();
for (const input of Object.keys(result.metafile.inputs).filter((path) => path.includes('node_modules/'))) {
  let directory = dirname(resolve(input));
  while (directory.includes('node_modules')) {
    let manifest;
    try { manifest = JSON.parse(await readFile(resolve(directory, 'package.json'), 'utf8')); } catch { /* nested source directory */ }
    if (manifest?.name) {
      if (!notices.has(manifest.name)) {
        const licenses = (await readdir(directory)).filter((name) => /^licen[cs]e(?:$|[.-])/i.test(name));
        if (!licenses.length) throw new Error(`Bundled dependency has no license text: ${manifest.name}`);
        notices.set(manifest.name, `${manifest.name}@${manifest.version}\n\n${(await Promise.all(licenses.map((name) => readFile(resolve(directory, name), 'utf8')))).join('\n')}`);
      }
      break;
    }
    directory = dirname(directory);
  }
}
await writeFile('dist/THIRD_PARTY_NOTICES.txt', [...notices.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([, text]) => text).join('\n\n---\n\n'));
