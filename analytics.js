// Umami counts visits on pagic.dev only, once config.js has its details.
// The homepage does the same in app.js; this is for the other pages.
const { scriptUrl, websiteId } = window.PAGIC_CONFIG?.umami ?? {};
// Skipped for Do Not Track and Global Privacy Control; addresses are sent
// without their query or #part.
const optedOut = navigator.globalPrivacyControl === true || navigator.doNotTrack === "1";
if (scriptUrl && websiteId && !optedOut && /^(www\.)?pagic\.dev$/.test(location.hostname)) {
  const script = document.createElement("script");
  script.defer = true;
  script.src = scriptUrl;
  script.dataset.websiteId = websiteId;
  script.dataset.excludeSearch = "true";
  script.dataset.excludeHash = "true";
  script.dataset.doNotTrack = "true";
  document.head.append(script);
}
