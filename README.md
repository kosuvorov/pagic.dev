# Pagic website

The public website for [pagic.dev](https://pagic.dev), served by GitHub Pages from
the root of `main`. Plain HTML, CSS and a little JavaScript: no build step.

## Preview

```sh
python3 -m http.server 4173
```

Then open http://localhost:4173.

## Before launch

- **Chrome Web Store link:** paste it into `storeUrl` in `config.js`. Until then the
  buttons say "Coming soon to Chrome".
- **Analytics:** paste the Umami script URL and website id into `config.js`. It
  only runs on pagic.dev.
- **Clay icons:** the ones in `assets/icons/` are placeholders. See
  [ICON-PROMPTS.md](ICON-PROMPTS.md) for the prompts, and overwrite the files with the
  same names.
- **Screenshots:** `assets/shots/` holds real screenshots of Pagic. Replace any of
  them with your own at the same size (1600 × 1000, the panels at 2x) and name.

## Publish with GitHub Pages

1. In the repository settings, open **Pages** and publish from the root of `main`.
2. Point the DNS for `pagic.dev` to GitHub Pages: A records `185.199.108.153`,
   `185.199.109.153`, `185.199.110.153`, `185.199.111.153`, and a `www` CNAME to
   `kosuvorov.github.io`.
3. Enable **Enforce HTTPS** once GitHub offers it.

The `CNAME` file already sets the custom domain to `pagic.dev`.
