---
title: "A Stylus Alternative for People Who Don't Write CSS"
description: "Stylus is great if you write CSS. If you'd rather click, here's how to restyle websites in Chrome without code, and when to keep Stylus around anyway."
date: "2026-11-26"
tags: ["css", "customize", "arc"]
keywords: ["stylus alternative", "stylish alternative", "user styles without code", "custom css chrome extension", "restyle website chrome"]
image: "/assets/shots2/colors-light.webp"
---

# A Stylus Alternative for People Who Don't Write CSS

The best Stylus alternative if you don't write CSS is a point-and-click tool that makes the same kinds of changes, saved per site. Pagic does that: click to hide, drag to recolor, pick a font, move and resize things, and it writes the styles for you. It also has a Code box for your own CSS, so you can mix the two. If you write CSS every day and want styles other people published, Stylus is still the better tool.

## What Stylus does well

Stylus is a free, open-source manager for user styles: CSS that your browser applies to the sites you choose. It's been around for years, has over a million users on the Chrome Web Store, and can install ready-made themes from style libraries. If a site has a popular community theme, Stylus is the easiest way to get it.

## Where Stylus gets hard

Every change is CSS. To hide a sidebar, you need to find its selector. To recolor a site, you need to find every color it uses. And many modern sites generate class names like `css-1x2y3z` that change when the site updates, so a style you wrote last month quietly stops working.

None of that is a flaw in Stylus. It's a code editor, and it's a good one. It's just not the tool for someone who wants the sidebar gone and doesn't care how.

## How Pagic handles the same jobs without code

| Job | In Stylus | In Pagic |
|---|---|---|
| Hide a sidebar | Find its selector, write `display: none` | Click it, choose Hide |
| Hide every promoted post | Find a selector that matches only those | Hide all like this |
| Dark mode | Write or install a dark theme | Click the moon |
| Tint the whole site | Rewrite each color | Drag the big dot |
| Change one color everywhere | Find each place it's used | Colors → click the color → pick a new one |
| Change the font | Write a `font-family` rule | Aa → pick any installed font |
| Wider or narrower text | Write `max-width` rules | Text width slider |
| Move a widget up | Usually not possible with CSS alone | Drag it with Move |
| Your own CSS | Yes | Yes, in Code |

Pagic picks elements the way a person would: the post, the banner, the sidebar, not the invisible box around it. When it hides "all like this", it matches by what the items have in common, and keeps up with ones the site adds later.

::shot colors | Pagic's color pad and its buttons for hiding, dark mode, fonts and notes | Recoloring a site with two dots instead of a stylesheet.::

## Can I still write CSS in Pagic?

Yes. Turn on **Code** in Pagic's settings and add your own CSS for the site. It's applied last, so it wins over everything else. It's handy for the one change a click can't express, alongside the clicks for everything else.

## Can I import my Stylus styles into Pagic?

Not as a file, but the CSS itself works: copy a style's code from Stylus and paste it into Pagic's Code box for that site. Styles written for Stylus's `@-moz-document` blocks need the wrapper removed, so you paste just the rules inside.

## Which should you use?

- **You write CSS and like it:** Stylus.
- **You want community themes for popular sites:** Stylus.
- **You want to click on things and have them change, and keep it:** Pagic.
- **You're coming from Arc Boosts:** Pagic is closer, since Boosts were point-and-click too. See the [Arc Boosts alternative guide](/blog/arc-boosts-alternative-for-chrome/).

Using both is fine too, as long as they're not restyling the same site at the same time.

::cta Restyle a site without a stylesheet | Pagic is free for one site, with every tool, Code included.::

## Frequently asked questions

**What is the best alternative to Stylus?** If you don't want to write CSS, Pagic, which restyles sites by clicking. If you do, Stylus is still the standard.
**Is Stylish the same as Stylus?** No. Stylus is a fork of Stylish. Stylish was pulled from the Chrome and Firefox stores in 2018 after it was found sending browsing history to its owner, and Stylus says it collects nothing.
**Can Pagic use user styles from userstyles.org or similar sites?** You can paste a style's CSS into Pagic's Code box for that site. Pagic doesn't browse or auto-update style libraries.
**Does Pagic need access to every site like Stylus?** No. Pagic starts with access to no sites and asks for each site you customize.
**Is Pagic free?** It's free for one site at a time, with every tool including Code. Pro covers every site and adds presets.
