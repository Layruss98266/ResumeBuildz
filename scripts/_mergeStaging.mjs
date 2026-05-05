import fs from 'node:fs';

const seoFile = 'lib/blogSeo.ts';
const postsFile = 'lib/blogPosts.ts';

// Read all 4 staging parts for blogSeo entries
const seoStaging = [
  fs.readFileSync('scripts/_staging-blogSeo.txt', 'utf8'),
  fs.readFileSync('scripts/_staging-blogSeo-part2.txt', 'utf8'),
  fs.readFileSync('scripts/_staging-blogSeo-part3.txt', 'utf8'),
  fs.readFileSync('scripts/_staging-blogSeo-part4.txt', 'utf8'),
].join('\n');

// Sanitise &amp; back to & in staging content (category display names)
const cleanSeoStaging = seoStaging.replace(/&amp;/g, '&');

// Read current blogSeo.ts
let seo = fs.readFileSync(seoFile, 'utf8');

// Deduplicate: if an entry already exists in seo, don't add again. Parse slugs.
const existingSlugs = new Set();
for (const m of seo.matchAll(/^\s{2}'([a-z0-9-]+)':\s*\{/gm)) {
  existingSlugs.add(m[1]);
}
console.log('Existing seo slugs:', existingSlugs.size);

// Extract staging entries as blocks
const stagingBlocks = [];
const blockRe = /(  '[a-z0-9-]+':\s*\{[\s\S]*?\n  \},)/g;
for (const m of cleanSeoStaging.matchAll(blockRe)) {
  const block = m[1];
  const slug = block.match(/^  '([a-z0-9-]+)':/)[1];
  if (existingSlugs.has(slug)) {
    console.log('skip (already registered):', slug);
    continue;
  }
  stagingBlocks.push(block);
}
console.log('Staging seo blocks to add:', stagingBlocks.length);

// Insert before closing `};` of BLOG_SEO (which precedes export function)
seo = seo.replace(/\n};\n\nexport function getBlogSeo/, `\n${stagingBlocks.join('\n')}\n};\n\nexport function getBlogSeo`);
fs.writeFileSync(seoFile, seo);
console.log('blogSeo.ts merged');

// --- blogPosts.ts ---
let posts = fs.readFileSync(postsFile, 'utf8');
const postsStaging = fs.readFileSync('scripts/_staging-blogPosts.txt', 'utf8');

const existingPostSlugs = new Set();
for (const m of posts.matchAll(/^\s{4}slug:\s*'([a-z0-9-]+)'/gm)) {
  existingPostSlugs.add(m[1]);
}
console.log('Existing post slugs:', existingPostSlugs.size);

const postBlockRe = /(  \{\n    slug:\s*'[a-z0-9-]+',[\s\S]*?\n  \},)/g;
const postBlocks = [];
for (const m of postsStaging.matchAll(postBlockRe)) {
  const block = m[1];
  const slug = block.match(/slug:\s*'([a-z0-9-]+)'/)[1];
  if (existingPostSlugs.has(slug)) {
    console.log('skip post (already registered):', slug);
    continue;
  }
  postBlocks.push(block);
}
console.log('Staging post blocks to add:', postBlocks.length);

// Insert before the BLOG_POSTS closing `];`
posts = posts.replace(/\n\];\n\n\/\*\*\n \* "Virtual" posts\./, `\n${postBlocks.join('\n')}\n];\n\n/**\n * "Virtual" posts.`);
fs.writeFileSync(postsFile, posts);
console.log('blogPosts.ts merged');
