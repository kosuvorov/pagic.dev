# Blog posts

Each post is `blog-src/<slug>.md` and is published at `https://pagic.dev/blog/<slug>/`.
Run `npm install` once, then `npm run build` to regenerate `blog/`, `sitemap.xml` and `llms.txt`.
Never edit the generated files in `blog/` by hand.

## Frontmatter

```
---
title: "Primary keyword first, about 50-60 characters"
seoTitle: "Optional <title> if the title is too long for search results"
description: "140-155 characters, with the primary keyword and the payoff"
date: "2026-11-15"          # YYYY-MM-DD. A future date queues the post until that day.
updated: "2026-12-01"       # optional, when a post is refreshed
draft: true                 # optional, never publish
tags: ["youtube", "hide"]   # used for "Keep reading"
keywords: ["...", "..."]
image: "/assets/shots2/edit-light.webp"   # social preview
ctaTitle: "Optional heading of the closing install card"
ctaText: "Optional text of the closing install card"
---
```

## Body

- Start with `# Title` (the template renders it as the only H1), then a 40-60 word answer to the main question.
- Questions people search as `##` headings. Four or more get a table of contents.
- End with `## Frequently asked questions`, one item per line: `**Question?** Answer.` It becomes FAQPage schema.
- Link posts as `/blog/<slug>/`. A link to a queued post shows as plain text until that post is published.
- `::shot name | alt text | caption::` on its own line shows `assets/shots2/<name>-light.webp` and `-dark.webp`.
- `::cta Heading | Text::` on its own line adds an install card in the middle of a post.
- Hyphens only, never em or en dashes (the build warns). No prices of Pagic in amounts.
