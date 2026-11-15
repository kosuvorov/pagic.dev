// Tells Bing, Yandex and other IndexNow engines (Bing also feeds ChatGPT search
// and Copilot) that pages changed, so they're crawled within hours, not weeks.
//   node scripts/indexnow.mjs https://pagic.dev/blog/some-post/ [more URLs]
// The key file 40db8662135f2874a2419cb4bb1de96f.txt at the site root proves the site is ours.
const key = "40db8662135f2874a2419cb4bb1de96f";
const urls = process.argv.slice(2);
if (!urls.length) {
  console.error("Usage: node scripts/indexnow.mjs <url> [url...]");
  process.exit(1);
}
const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: "pagic.dev", key, keyLocation: `https://pagic.dev/${key}.txt`, urlList: urls }),
});
console.log(`IndexNow: ${res.status} ${res.statusText} for ${urls.length} URL(s)`);
if (!res.ok && res.status !== 202) process.exit(1);
