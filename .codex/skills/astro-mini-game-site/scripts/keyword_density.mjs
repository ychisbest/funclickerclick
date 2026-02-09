#!/usr/bin/env node
/**
 * Approximate keyword phrase density for an Astro page by stripping frontmatter,
 * <script> blocks, and HTML tags, then counting words and phrase occurrences.
 *
 * Usage:
 *   node scripts/keyword_density.mjs src/pages/index.astro "fun clicker"
 */

import fs from 'node:fs';

function usage() {
  console.error('Usage: node scripts/keyword_density.mjs <file> "<phrase>"');
  process.exit(2);
}

const filePath = process.argv[2];
const phrase = process.argv[3];
if (!filePath || !phrase) usage();

const raw = fs.readFileSync(filePath, 'utf8');

// Drop the first frontmatter block if present.
let body = raw.replace(/^---[\s\S]*?---/, '');
// Drop inline scripts.
body = body.replace(/<script[\s\S]*?<\/script>/gi, ' ');
// Drop tags and simple Astro expressions.
const text = body
  .replace(/<[^>]+>/g, ' ')
  .replace(/\{[^}]+\}/g, ' ')
  .replace(/&[a-z]+;/gi, ' ');

const words = text
  .toLowerCase()
  .replace(/[^a-z0-9\s]+/g, ' ')
  .split(/\s+/)
  .filter(Boolean);

const phraseWords = phrase
  .toLowerCase()
  .replace(/[^a-z0-9\s]+/g, ' ')
  .split(/\s+/)
  .filter(Boolean);

let phraseCount = 0;
if (phraseWords.length === 1) {
  for (const w of words) if (w === phraseWords[0]) phraseCount++;
} else {
  for (let i = 0; i <= words.length - phraseWords.length; i++) {
    let ok = true;
    for (let j = 0; j < phraseWords.length; j++) {
      if (words[i + j] !== phraseWords[j]) {
        ok = false;
        break;
      }
    }
    if (ok) phraseCount++;
  }
}

const wordCount = words.length;
const density = wordCount ? (phraseCount / wordCount) * 100 : 0;

console.log(
  JSON.stringify(
    {
      file: filePath,
      phrase,
      wordCount,
      phraseCount,
      densityPercent: Number(density.toFixed(2)),
    },
    null,
    2,
  ),
);

