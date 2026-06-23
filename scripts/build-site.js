#!/usr/bin/env node
/*
 * Builds the static site into build/ for DigitalOcean App Platform.
 *
 * 1. Regenerates the world-map dot data (scripts/generate-map.js).
 * 2. Copies everything in site/ to build/.
 *
 * No bundler — the site is plain HTML/CSS/JS with zero runtime dependencies.
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const root = path.join(__dirname, '..');
const SITE = path.join(root, 'site');
const BUILD = path.join(root, 'build');

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

// 1. (Re)generate map data.
execFileSync(process.execPath, [path.join(__dirname, 'generate-map.js')], {
  stdio: 'inherit'
});

// 2. Clean + copy.
fs.rmSync(BUILD, { recursive: true, force: true });
copyDir(SITE, BUILD);

const files = fs.readdirSync(BUILD);
console.log(`Built site -> build/ (${files.length} files: ${files.join(', ')})`);
