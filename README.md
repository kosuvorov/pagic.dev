# pagic.dev

The website for [Pagic](https://pagic.dev), a browser extension that recolors,
declutters and rearranges any website.

Plain HTML, CSS and JavaScript with no build step. It's hosted on GitHub Pages from
the root of `main`, so every push goes live.

## Run locally

```sh
python3 -m http.server 4173
```

Then open http://localhost:4173.

## Files

| Path | What it is |
| --- | --- |
| `index.html` | The landing page |
| `privacy.html` | The privacy policy |
| `styles.css`, `app.js` | Styles, the before/after slider, feature dialogs and the Simple/Advanced switch |
| `config.js` | The Chrome Web Store link and Umami analytics. While `storeUrl` is empty, the install buttons read "Coming soon to Chrome". Analytics only run on pagic.dev |
| `assets/icons/` | Clay icons, 512 px WebP. Prompts are in [ICON-PROMPTS.md](ICON-PROMPTS.md) |
| `assets/shots/` | Screenshots of Pagic, 1600 × 1000 (the panels at 2x) |
| `assets/social-card.png` | The link preview image, 1200 × 630 |
| `CNAME` | The custom domain |

## Domain

`pagic.dev` is registered at Porkbun and points to GitHub Pages: four A records
(`185.199.108.153` to `185.199.111.153`) and a `www` CNAME to `kosuvorov.github.io`.
HTTPS is enforced.
