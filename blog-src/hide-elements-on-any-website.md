---
title: "How to Permanently Hide Any Element on a Website"
description: "Hide ads, banners, sidebars, pop-ups and feeds on any website in Chrome, and keep them hidden after you reload. Four ways, from DevTools to one click."
date: "2026-11-24"
tags: ["hide", "customize", "focus"]
keywords: ["hide element on website", "permanently hide element chrome", "remove element from website", "element hider extension", "block elements on a page"]
image: "/assets/shots2/before.webp"
ctaTitle: "Hide it once, gone every visit"
ctaText: "Pagic hides anything you click on and remembers it per site, including the ones the site adds later. Free for one site."
---

# How to Permanently Hide Any Element on a Website

To permanently hide an element on a website, use an extension that hides what you click and saves it for that site, so it stays hidden after reloads. In Pagic you open **Edit page**, click the element and choose **Hide**, or **Hide all like this** for repeating things like feed posts. DevTools and ad blocker zappers also remove elements, but only until you reload. Here are all four ways and when each makes sense.

## Why does a hidden element come back after reload?

Every time you load a page, the site sends it fresh. If you deleted something with DevTools or a quick zapper, your browser forgets as soon as the page reloads. To hide something for good, a tool has to remember what you hid and hide it again on every visit, ideally before you even see it.

## Way 1: Chrome DevTools (temporary)

Right-click the element, choose **Inspect**, then press <kbd>Delete</kbd> on the highlighted line. It's gone until you reload.

**Use it for:** a one-off, like a pop-up that won't let you read one article. **Downside:** it's fiddly to find the right line, and it comes back on reload.

## Way 2: An ad blocker's zapper or element picker

uBlock Origin Lite has an element zapper that removes what you click, until you reload. Some ad blockers also have an element picker that writes a permanent filter rule. 

**Use it for:** ads and things that look like ads. **Downside:** filter rules are hard to read and edit later, and these tools are built for blocking, not for keeping track of what you changed on a site.

## Way 3: A user style with CSS (permanent, needs code)

With Stylus you can write a rule like `.sidebar { display: none !important; }` for a site, and it's applied every visit.

**Use it for:** if you're comfortable with CSS and the site's class names are stable. **Downside:** you need to find a selector that works, and many sites use generated class names that change.

## Way 4: Pagic (permanent, one click)

1. Open the site, click Pagic's icon and **Customize this site**.
2. Click the eraser to open **Edit page** with Hide picked.
3. Point at what you want gone. Pagic outlines the smallest *meaningful* thing under your pointer: a post, a banner, a sidebar, not some invisible wrapper box. Press <kbd>↑</kbd> to step out to a bigger box, <kbd>↓</kbd> to step back in.
4. Click to hide it. It turns to dust, and the page closes the gap it left.

Then it's saved. Next visit, it's hidden before you see it.

::shot edit | An ad picked on a news page with Pagic's menu: Hide, Hide all like this, Edit text, Resize, Move, Style | The breadcrumb above the selection shows exactly what's picked.::

### Hide every item like it

Feeds, comment sections and ad slots repeat. **Hide all like this** (or <kbd>Alt</kbd>-click in Hide mode) hides every matching item, and keeps hiding new ones the site adds as you scroll. Point at it first, and Pagic outlines every match so you can see what will go.

### Hide several things at once

In Hide mode, **drag across the page**: everything you pass over gets picked. Then press Enter to hide them all. <kbd>Shift</kbd>-click adds or removes single items.

### Change your mind

Everything you hid is listed under **Changes**. Point at a change to outline its element, switch it off for a moment, or undo it. <kbd>⌘Z</kbd> undoes the last one. Holding the eye button shows the page without Pagic.

## What people commonly hide

- Cookie banners and newsletter pop-ups that come back every visit.
- Sticky headers and "app download" bars that eat half a phone-sized window.
- Recommended feeds: [YouTube Shorts](/blog/how-to-hide-youtube-shorts/), [the LinkedIn feed](/blog/hide-linkedin-feed/), trends on X.
- Sidebars full of "related" links on news sites.
- Comment sections, or blur them until you point at them with **Style → Blur until hover**.

A note on cookie banners: hiding one doesn't accept or reject anything. The site just doesn't get your answer, and what it does without one is up to the site.

## Does hiding an element block it from loading?

No. Hiding stops you from seeing it; the site still loads it. To stop ads and trackers from loading at all, use an ad blocker alongside. The two do different jobs and work fine together.

::cta Hide the one thing you scroll past every day | Pagic is free for one site, with every tool. No account.::

## Frequently asked questions

**How do I hide an element on a website permanently?** Use an extension that saves what you hide per site. In Pagic, open Edit page, click the element and choose Hide. It stays hidden on every visit.
**Why does Inspect → Delete not stick?** DevTools changes only the copy of the page you have open. Reloading downloads a fresh copy from the site.
**Can I hide all ads or posts of one kind?** Yes. Pagic's Hide all like this hides every matching item, including ones the site loads later as you scroll.
**Will the hidden element come back if the site changes?** If the site redesigns that part of the page, the old change may not match anymore. Pagic marks it "not here", and you hide the new version in a click.
**Does hiding elements make pages load faster?** Not much, because the site still sends them. An ad blocker is what stops things from loading.
