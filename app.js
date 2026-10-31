// Before/after slider, feature details, the Simple/Advanced switch, and the
// install links (from config.js). Everything works without it except those.

// Before and after: the range input moves the split; tabs swap the pair.
const slider = document.querySelector(".slider");
const range = slider.querySelector("input");
const before = slider.querySelector(".slider-before");
const after = slider.querySelector(".slider-after");
range.addEventListener("input", () => slider.style.setProperty("--pos", `${range.value}%`));
for (const tab of document.querySelectorAll(".tabs button")) {
  tab.addEventListener("click", () => {
    for (const other of tab.parentElement.children) other.setAttribute("aria-selected", String(other === tab));
    before.src = tab.dataset.before;
    before.alt = `${tab.dataset.alt} as it normally looks`;
    after.src = tab.dataset.after;
    after.alt = `${tab.dataset.alt} with Pagic`;
    range.value = 50;
    slider.style.setProperty("--pos", "50%");
  });
}

// Each selling point opens its details in a dialog.
const dialog = document.querySelector(".detail");
const body = dialog.querySelector(".detail-body");
for (const feature of document.querySelectorAll(".feature")) {
  feature.addEventListener("click", () => {
    body.replaceChildren(document.getElementById(`detail-${feature.dataset.feature}`).content.cloneNode(true));
    dialog.showModal();
  });
}
// A click on the backdrop closes it too.
dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });

// Simple and Advanced
for (const button of document.querySelectorAll(".switch button")) {
  button.addEventListener("click", () => {
    const mode = button.dataset.mode;
    for (const other of button.parentElement.children) other.setAttribute("aria-checked", String(other === button));
    for (const el of document.querySelectorAll(".modes [data-for]")) el.hidden = el.dataset.for !== mode;
  });
}

document.querySelector("[data-year]").textContent = new Date().getFullYear();

// Install links go to the Chrome Web Store once config.js has its address;
// until then they say it's coming soon.
const config = window.PAGIC_CONFIG ?? {};
let store = null;
try {
  const url = new URL(config.storeUrl);
  if (url.protocol === "https:") store = url.href;
} catch {}
for (const link of document.querySelectorAll("[data-install]")) {
  if (store) {
    link.href = store;
    link.dataset.umamiEvent = "Install";
  } else {
    link.href = "#faq";
  }
}
if (!store) {
  for (const label of document.querySelectorAll("[data-install-label]")) label.textContent = "Coming soon to Chrome";
  for (const note of document.querySelectorAll("[data-install-note]")) note.textContent = "Arriving on the Chrome Web Store very soon";
  const small = document.querySelector(".site-header [data-install]");
  small.textContent = "Coming soon";
}

// Umami counts visits on pagic.dev only, once config.js has its details.
const { scriptUrl, websiteId } = config.umami ?? {};
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
