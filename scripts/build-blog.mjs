// Builds the blog from Markdown: blog-src/<slug>.md → blog/<slug>/index.html,
// plus the blog index, RSS, sitemap.xml and llms.txt.
//
//   npm run build
//
// A post whose `date` is after today (or that has `draft: true`) is skipped, so
// posts can be queued: they appear on the first build on or after their date.
// Links to a post that isn't published yet render as plain text until it is.
// See blog-src/README.md for the frontmatter and the shortcodes.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { marked } from "marked";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "blog-src");
const OUT = path.join(ROOT, "blog");
const SITE = "https://pagic.dev";
const AUTHOR = {
  "@type": "Person",
  name: "Konstantin Suvorov",
  url: `${SITE}/about/`,
  sameAs: [
    "https://konsu.dev/",
    "https://github.com/kosuvorov",
    "https://www.linkedin.com/in/kosuvorov",
    "https://www.youtube.com/@kosuvorov",
  ],
};
const PUBLISHER = {
  "@type": "Organization",
  name: "Pagic",
  url: `${SITE}/`,
  logo: { "@type": "ImageObject", url: `${SITE}/assets/pagic.png` },
};

const storeUrl = fs.readFileSync(path.join(ROOT, "config.js"), "utf8").match(/storeUrl:\s*"([^"]+)"/)[1];
const today = process.env.PAGIC_TODAY || localDate(new Date());

function localDate(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function humanDate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}
function rfc822(iso) {
  return new Date(`${iso}T09:00:00Z`).toUTCString();
}
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const stripMd = (s) => s.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*([^*]+)\*\*/g, "$1").replace(/[*_`]/g, "").trim();

// Frontmatter: `key: value` lines, with "quoted" strings and ["inline", "lists"].
function parseFrontmatter(text, file) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) throw new Error(`${file}: missing frontmatter`);
  const data = {};
  for (const line of m[1].split("\n")) {
    if (!line.trim() || line.trim().startsWith("#")) continue;
    const kv = line.match(/^([A-Za-z_]+):\s*(.*)$/);
    if (!kv) throw new Error(`${file}: can't read frontmatter line "${line}"`);
    let value = kv[2].trim();
    if (value.startsWith("[")) value = JSON.parse(value);
    else if (value.startsWith('"')) value = JSON.parse(value);
    else if (value === "true" || value === "false") value = value === "true";
    data[kv[1]] = value;
  }
  return { data, body: text.slice(m[0].length) };
}

// ::shot name | alt text | caption::  → the light and dark screenshots from
// assets/shots2/<name>-light.webp and -dark.webp (or <name>.webp alone).
function shot(name, alt, caption) {
  const dir = path.join(ROOT, "assets/shots2");
  const both = fs.existsSync(path.join(dir, `${name}-light.webp`)) && fs.existsSync(path.join(dir, `${name}-dark.webp`));
  if (!both && !fs.existsSync(path.join(dir, `${name}.webp`))) throw new Error(`No screenshot assets/shots2/${name}`);
  const img = (file, cls) => `<img${cls ? ` class="${cls}"` : ""} src="/assets/shots2/${file}" alt="${esc(alt)}" loading="lazy" decoding="async">`;
  const imgs = both ? img(`${name}-light.webp`, "on-light") + img(`${name}-dark.webp`, "on-dark") : img(`${name}.webp`);
  return `<figure class="post-shot">${imgs}${caption ? `<figcaption>${esc(caption)}</figcaption>` : ""}</figure>`;
}

function installCard(slug, heading, text) {
  const href = `${storeUrl}?utm_source=pagic.dev&utm_medium=blog&utm_campaign=${slug}`;
  return `<aside class="post-cta">
  <img src="/assets/pagic.png" alt="" width="72" height="72" loading="lazy">
  <div>
    <p class="post-cta-title">${esc(heading)}</p>
    <p>${esc(text)}</p>
    <a class="button button-small" href="${href}" data-umami-event="Install" data-umami-event-post="${slug}">Add Pagic to Chrome</a>
  </div>
</aside>`;
}

// FAQ: a "## Frequently asked questions" section whose items each open with a
// **bold question**, answer on the same line.
function extractFaqs(md) {
  const faqs = [];
  let inFaq = false;
  for (const line of md.split("\n")) {
    const h2 = line.match(/^##\s+(.*\S)\s*$/);
    if (h2) { inFaq = /frequently asked|^faq$/i.test(h2[1]); continue; }
    if (/^#{1,6}\s/.test(line)) { inFaq = false; continue; }
    if (!inFaq) continue;
    const q = line.match(/^\s*\*\*(.+?)\*\*\s*(.+\S)\s*$/);
    if (q) faqs.push({ question: stripMd(q[1]), answer: stripMd(q[2]) });
  }
  return faqs;
}

// --- Read every post --------------------------------------------------------

const all = fs.readdirSync(SRC).filter((f) => f.endsWith(".md") && f !== "README.md").map((file) => {
  const slug = file.replace(/\.md$/, "");
  const { data, body } = parseFrontmatter(fs.readFileSync(path.join(SRC, file), "utf8"), file);
  for (const key of ["title", "description", "date"]) if (!data[key]) throw new Error(`${file}: needs ${key}`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date)) throw new Error(`${file}: date must be YYYY-MM-DD`);
  for (const [n, line] of body.split("\n").entries()) {
    if (/[–—]/.test(line)) console.warn(`⚠ ${file}:${n + 1} has an en or em dash; use " - "`);
  }
  if (data.description.length > 160) console.warn(`⚠ ${file}: description is ${data.description.length} characters (aim for 140-155)`);
  return { slug, file, ...data, tags: data.tags || [], body, updated: data.updated || data.date };
});

const published = all.filter((p) => !p.draft && p.date <= today).sort((a, b) => (b.date + b.slug).localeCompare(a.date + a.slug));
const queued = all.filter((p) => !published.includes(p)).sort((a, b) => a.date.localeCompare(b.date));
const publishedSlugs = new Set(published.map((p) => p.slug));
const allSlugs = new Set(all.map((p) => p.slug));

// --- Render each published post ----------------------------------------------

const articleTemplate = fs.readFileSync(path.join(ROOT, "scripts/article-template.html"), "utf8");
const indexTemplate = fs.readFileSync(path.join(ROOT, "scripts/blog-index-template.html"), "utf8");

fs.mkdirSync(OUT, { recursive: true });
for (const dir of fs.readdirSync(OUT)) {
  // Clear out posts that were unpublished or renamed.
  const full = path.join(OUT, dir);
  if (fs.statSync(full).isDirectory() && !publishedSlugs.has(dir)) fs.rmSync(full, { recursive: true });
}

for (const post of published) {
  let md = post.body.replace(/^\s*# .*\n+/, ""); // the template renders the H1
  md = md.replace(/^::shot (.+?)::[ \t]*$/gm, (_, args) => shot(...args.split("|").map((s) => s.trim())));
  md = md.replace(/^::cta(?: (.+?))?::[ \t]*$/gm, (_, args) => {
    const [heading, text] = (args || "").split("|").map((s) => s.trim());
    return installCard(post.slug, heading || "Try it on your own pages", text || "Pagic is free for one site, with every tool. No account needed.");
  });
  // Links to posts: /blog/<slug>/. Unknown slugs fail the build; queued ones become plain text for now.
  md = md.replace(/\[([^\]]+)\]\(\/blog\/([a-z0-9-]+)\/?(#[^)]*)?\)/g, (full, text, slug, hash) => {
    if (!allSlugs.has(slug)) throw new Error(`${post.file}: links to /blog/${slug}/, which doesn't exist`);
    return publishedSlugs.has(slug) ? `[${text}](/blog/${slug}/${hash || ""})` : text;
  });

  let html = marked.parse(md);
  const toc = [];
  html = html.replace(/<h2>(.+?)<\/h2>/g, (_, inner) => {
    const id = inner.replace(/<[^>]+>/g, "").toLowerCase().replace(/&[a-z]+;/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    toc.push({ id, text: inner.replace(/<[^>]+>/g, "") });
    return `<h2 id="${id}">${inner}</h2>`;
  });
  html = html.replace(/<table>/g, '<div class="table-wrap"><table>').replace(/<\/table>/g, "</table></div>");
  html = html.replace(/<a href="(https?:\/\/(?!pagic\.dev)[^"]+)"/g, '<a href="$1" rel="noopener" target="_blank"');

  const words = post.body.split(/\s+/).length;
  const minutes = Math.max(2, Math.round(words / 230));
  const tocHtml = toc.length >= 4
    ? `<nav class="post-toc" aria-label="In this article"><p>In this article</p><ol>${toc.map((t) => `<li><a href="#${t.id}">${t.text}</a></li>`).join("")}</ol></nav>`
    : "";

  const url = `${SITE}/blog/${post.slug}/`;
  const image = post.image ? `${SITE}${post.image}` : `${SITE}/assets/social-card.png`;
  const faqs = extractFaqs(post.body);
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      image,
      datePublished: post.date,
      dateModified: post.updated,
      author: AUTHOR,
      publisher: PUBLISHER,
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      keywords: post.keywords || undefined,
      about: { "@type": "SoftwareApplication", name: "Pagic", applicationCategory: "BrowserApplication", url: `${SITE}/` },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Pagic", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog/` },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
  ];
  if (faqs.length) {
    schema.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
    });
  }

  const related = published
    .filter((p) => p !== post)
    .map((p) => ({ p, score: p.tags.filter((t) => post.tags.includes(t)).length }))
    .sort((a, b) => b.score - a.score || b.p.date.localeCompare(a.p.date))
    .slice(0, 3)
    .map(({ p }) => `<li><a href="/blog/${p.slug}/">${esc(p.title)}</a></li>`)
    .join("");

  const seoTitle = post.seoTitle || (post.title.length <= 52 ? `${post.title} | Pagic` : post.title);
  const dateLine = post.updated !== post.date
    ? `Updated <time datetime="${post.updated}">${humanDate(post.updated)}</time>`
    : `<time datetime="${post.date}">${humanDate(post.date)}</time>`;

  const page = articleTemplate
    .replaceAll("{{SEO_TITLE}}", esc(seoTitle))
    .replaceAll("{{TITLE}}", esc(post.title))
    .replaceAll("{{DESCRIPTION}}", esc(post.description))
    .replaceAll("{{URL}}", url)
    .replaceAll("{{IMAGE}}", image)
    .replaceAll("{{DATE_ISO}}", post.date)
    .replaceAll("{{UPDATED_ISO}}", post.updated)
    .replaceAll("{{DATE_LINE}}", dateLine)
    .replaceAll("{{MINUTES}}", String(minutes))
    .replaceAll("{{SCHEMA}}", JSON.stringify(schema, null, 2).replace(/</g, "\\u003c"))
    .replaceAll("{{TOC}}", tocHtml)
    .replaceAll("{{CTA}}", installCard(post.slug, post.ctaTitle || "Make the page yours", post.ctaText || "Pagic is a free Chrome extension: hide anything, pick your colors, leave notes, and it stays that way every visit."))
    .replaceAll("{{RELATED}}", related ? `<nav class="post-related" aria-label="More from the blog"><p>Keep reading</p><ul>${related}</ul></nav>` : "")
    .replace("{{CONTENT}}", () => html);

  fs.mkdirSync(path.join(OUT, post.slug), { recursive: true });
  fs.writeFileSync(path.join(OUT, post.slug, "index.html"), page);
  console.log(`✓ blog/${post.slug}/`);
}

// --- Blog index --------------------------------------------------------------

const cards = published.map((p) => `
      <a class="post-card" href="/blog/${p.slug}/">
        <span class="post-card-date"><time datetime="${p.date}">${humanDate(p.date)}</time></span>
        <span class="post-card-title">${esc(p.title)}</span>
        <span class="post-card-desc">${esc(p.description)}</span>
      </a>`).join("");
const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": `${SITE}/blog/`,
  name: "The Pagic blog",
  description: "Guides to customizing websites in Chrome: hiding distractions, dark mode for any site, Arc Boosts alternatives, reading, notes and highlights.",
  url: `${SITE}/blog/`,
  author: AUTHOR,
  publisher: PUBLISHER,
  blogPost: published.map((p) => ({ "@type": "BlogPosting", headline: p.title, url: `${SITE}/blog/${p.slug}/`, datePublished: p.date, dateModified: p.updated })),
};
fs.writeFileSync(path.join(OUT, "index.html"), indexTemplate
  .replace("{{SCHEMA}}", JSON.stringify(blogSchema, null, 2).replace(/</g, "\\u003c"))
  .replace("{{CARDS}}", () => cards));
console.log(`✓ blog/ (${published.length} posts)`);

// --- RSS ---------------------------------------------------------------------

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>The Pagic blog</title>
  <link>${SITE}/blog/</link>
  <atom:link href="${SITE}/blog/rss.xml" rel="self" type="application/rss+xml"/>
  <description>Guides to customizing websites in Chrome, from the maker of Pagic.</description>
  <language>en</language>
${published.map((p) => `  <item>
    <title>${esc(p.title)}</title>
    <link>${SITE}/blog/${p.slug}/</link>
    <guid>${SITE}/blog/${p.slug}/</guid>
    <pubDate>${rfc822(p.date)}</pubDate>
    <description>${esc(p.description)}</description>
  </item>`).join("\n")}
</channel>
</rss>
`;
fs.writeFileSync(path.join(OUT, "rss.xml"), rss);

// --- Sitemap -----------------------------------------------------------------

const latest = published[0]?.date || today;
const pages = [
  { loc: "/", lastmod: latest },
  { loc: "/blog/", lastmod: latest },
  ...published.map((p) => ({ loc: `/blog/${p.slug}/`, lastmod: p.updated })),
  { loc: "/about/", lastmod: "2026-11-15" },
  { loc: "/support/", lastmod: "2026-10-31" },
  { loc: "/privacy/", lastmod: "2026-10-31" },
  { loc: "/terms/", lastmod: "2026-10-31" },
];
fs.writeFileSync(path.join(ROOT, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url><loc>${SITE}${p.loc}</loc><lastmod>${p.lastmod}</lastmod></url>`).join("\n")}
</urlset>
`);
console.log(`✓ sitemap.xml (${pages.length} URLs)`);

// --- llms.txt ----------------------------------------------------------------

const llmsHead = fs.readFileSync(path.join(ROOT, "scripts/llms-head.md"), "utf8").trimEnd();
fs.writeFileSync(path.join(ROOT, "llms.txt"), `${llmsHead}

## Guides

${published.map((p) => `- [${p.title}](${SITE}/blog/${p.slug}/): ${p.description}`).join("\n")}
`);
console.log("✓ llms.txt");

if (queued.length) {
  console.log(`\nQueued (${queued.length}):`);
  for (const p of queued) console.log(`  ${p.date}  ${p.slug}${p.draft ? " (draft)" : ""}`);
}
