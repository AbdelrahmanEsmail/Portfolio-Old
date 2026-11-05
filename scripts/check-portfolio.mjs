import assert from 'node:assert/strict';
import { access, readFile, readdir } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const root = new URL('../', import.meta.url);
const moduleUrl = (source) => `data:text/javascript;base64,${Buffer.from(ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText).toString('base64')}`;

const contentUrl = moduleUrl(await readFile(new URL('app/content.ts', root), 'utf8'));
const { projects, homeProjectSlugs, projectFilters, heroStats, experience } = await import(contentUrl);
const detailsSource = (await readFile(new URL('app/project-details.ts', root), 'utf8'))
  .replace(/from ['"]\.\/content['"]/, `from ${JSON.stringify(contentUrl)}`);
const { projectDetails } = await import(moduleUrl(detailsSource));
const { projectArchitectures } = await import(moduleUrl(await readFile(new URL('app/project-architecture.ts', root), 'utf8')));

const slugs = new Set();
const kinds = new Set(['Product', 'Tool', 'Experiment']);
const mediaKinds = new Set(['screen', 'app-store', 'demo', 'photo', 'reference', 'source', 'studio', 'illustration']);
const nodeKinds = new Set(['client', 'edge', 'service', 'worker', 'data', 'queue', 'external']);
const assets = new Set();
const collectAsset = (src) => {
  if (!src.startsWith('http')) {
    const path = src.slice(src.indexOf('/assets/') + 1);
    assert.ok(src.includes('/assets/'), `Expected a public asset path: ${src}`);
    assets.add(path);
  }
};

for (const project of projects) {
  assert.ok(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.slug), `Invalid slug: ${project.slug}`);
  assert.ok(!slugs.has(project.slug), `Duplicate project slug: ${project.slug}`);
  slugs.add(project.slug);
  assert.ok(project.title && project.description && project.label, `Incomplete project: ${project.slug}`);
  assert.ok(!project.kind || kinds.has(project.kind), `Invalid project kind: ${project.slug}`);
  assert.ok(project.categories.length && project.categories.every((value) => value !== 'All' && projectFilters.includes(value)), `Invalid categories: ${project.slug}`);
  assert.ok(project.technologies.length, `Missing technology list: ${project.slug}`);
  if (project.image) { assert.ok(project.imageAlt, `Missing image alt: ${project.slug}`); collectAsset(project.image); }
  if (project.liveUrl) assert.equal(new URL(project.liveUrl).protocol, 'https:', `Invalid live URL: ${project.slug}`);
  for (const link of project.appLinks ?? []) {
    assert.equal(new URL(link.googlePlay).hostname, 'play.google.com');
    assert.equal(new URL(link.appStore).hostname, 'apps.apple.com');
  }
  const details = projectDetails[project.slug];
  assert.ok(details?.overview && details.highlights?.length, `Missing case study: ${project.slug}`);
  assert.ok(details.screens.length >= 2, `Project needs multiple gallery images: ${project.slug}`);
  assert.equal(new Set(details.screens.map((screen) => screen.src)).size, details.screens.length, `Duplicate gallery images: ${project.slug}`);
  for (const screen of details.screens) {
    assert.ok(screen.alt && screen.caption, `Missing gallery description: ${project.slug}`);
    assert.ok(!screen.kind || mediaKinds.has(screen.kind), `Invalid gallery kind: ${project.slug}`);
    collectAsset(screen.src);
  }
  const architecture = projectArchitectures[project.slug];
  assert.ok(architecture?.caption.title && architecture.caption.description, `Missing architecture: ${project.slug}`);
  assert.ok(architecture.lanes.length >= 2 && architecture.lanes.every((lane) => lane.label && lane.nodes.length), `Incomplete architecture lanes: ${project.slug}`);
  const nodes = architecture.lanes.flatMap((lane) => lane.nodes);
  const nodeIds = new Set(nodes.map((node) => node.id));
  assert.equal(nodeIds.size, nodes.length, `Duplicate architecture nodes: ${project.slug}`);
  assert.ok(nodes.every((node) => /^[a-z0-9-]+$/.test(node.id) && node.label && nodeKinds.has(node.kind)), `Invalid architecture node: ${project.slug}`);
  assert.ok(architecture.edges.length && architecture.edges.every((edge) => nodeIds.has(edge.from) && nodeIds.has(edge.to) && edge.from !== edge.to), `Invalid architecture connection: ${project.slug}`);
  assert.ok(architecture.provenance.sources.length && ['za-studio', 'local-source'].includes(architecture.provenance.kind), `Missing architecture provenance: ${project.slug}`);
}

assert.deepEqual(new Set(Object.keys(projectDetails)), slugs, 'Project and case-study records differ');
assert.deepEqual(new Set(Object.keys(projectArchitectures)), slugs, 'Project and architecture records differ');
assert.equal(homeProjectSlugs.length, 5, 'The homepage must contain five selected projects');
assert.equal(new Set(homeProjectSlugs).size, 5, 'Homepage selection contains duplicates');
assert.ok(homeProjectSlugs.every((slug) => slugs.has(slug)), 'Unknown homepage project');
assert.equal(Number(heroStats[0].value), projects.length, 'Hero project count is stale');
assert.equal(Number(heroStats[3].value), experience.length, 'Hero career count is stale');
const inventory = JSON.parse(await readFile(new URL('docs/project-inventory.json', root), 'utf8'));
const covered = new Set(inventory.directories.flatMap((entry) => entry.projects));
assert.deepEqual(covered, slugs, 'Directory inventory and portfolio coverage differ');
if (process.argv.includes('--workspace')) {
  const directories = (await readdir(join(homedir(), 'code'), { withFileTypes: true }))
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith('.')).map((entry) => entry.name);
  assert.deepEqual(new Set(directories), new Set(inventory.directories.map((entry) => entry.directory)), 'The ~/code directory inventory needs updating');
  console.log(`Workspace verified: ${directories.length} directories accounted for.`);
}
await Promise.all([...assets].map(async (path) => {
  const file = new URL(`public/${path}`, root);
  await access(file).catch(() => { throw new Error(`Missing media: ${fileURLToPath(file)}`); });
}));
console.log(`Portfolio verified: ${projects.length} projects, ${Object.keys(projectDetails).length} case studies, ${Object.keys(projectArchitectures).length} architectures, ${assets.size} media files.`);
