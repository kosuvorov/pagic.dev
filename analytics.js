// Shared website analytics. Nothing here is loaded by the browser extension.
(() => {
  "use strict";
  const { scriptUrl, websiteId } = window.PAGIC_CONFIG?.umami || {};
  const production = ["pagic.dev", "www.pagic.dev"].includes(location.hostname);
  const optedOut = navigator.globalPrivacyControl === true
    || ["1", "yes"].includes(navigator.doNotTrack || window.doNotTrack);
  if (!production || !scriptUrl || !websiteId || optedOut) return;

  let url;
  try {
    url = new URL(scriptUrl);
    if (url.protocol !== "https:") return;
  } catch { return; }

  // Only fixed product labels are added as event properties, never form values.
  const pending = [];
  let failed = false;
  function track(name, data = {}) {
    if (failed) return;
    if (!window.umami?.track) {
      if (pending.length < 30) pending.push([name, data]);
      return;
    }
    try {
      Promise.resolve(window.umami.track(name, data)).catch(() => {});
    } catch { /* Analytics failure must not interrupt the page. */ }
  }
  window.PagicAnalytics = Object.freeze({ track });

  function annotate(selector, name, data = {}) {
    document.querySelectorAll(selector).forEach((element) => {
      if (element.hasAttribute("data-umami-event")) return;
      element.setAttribute("data-umami-event", name);
      for (const [key, value] of Object.entries(data)) {
        element.setAttribute(`data-umami-event-${key}`, value);
      }
    });
  }
  for (const section of ["possibilities", "how-it-works", "pricing"]) {
    annotate(`.site-header a[href="#${section}"]`, "Navigation clicked", { section });
  }
  annotate('a[href="#playground"]', "Demo opened", { placement: "hero" });
  annotate('a[href="playground/"]', "Playground opened", { placement: "pricing" });
  annotate('#screenshot-source', "Reader source opened");
  annotate('.site-footer a[href="https://github.com/kosuvorov/pagic"]', "Source repository opened");
  for (const page of ["privacy", "terms", "support"]) {
    annotate(`a[href="/${page}/"]`, "Information link clicked", { page });
  }
  annotate('a[href="mailto:support@pagic.dev"]', "Support email clicked");
  annotate('a[href="https://polar.sh/kanstantsin-suvorau/portal"]', "Customer portal opened");
  annotate('.information-page .brand, .information-footer > a[href="/"]', "Home link clicked");
  annotate('.guide a[href="../"]', "Playground return clicked");

  // A toggle event represents an actual open, including keyboard activation.
  document.querySelectorAll("details[data-analytics-topic]").forEach((details) => {
    details.addEventListener("toggle", () => {
      if (details.open) track("Details opened", { topic: details.dataset.analyticsTopic });
    });
  });
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting || entry.intersectionRatio < 0.2) continue;
        track("Section viewed", { section: entry.target.id });
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.2 });
    for (const id of ["playground", "possibilities", "reader", "how-it-works", "pricing", "get-pagic"]) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
  }

  const script = document.createElement("script");
  script.src = url.href;
  script.defer = true;
  script.dataset.websiteId = websiteId;
  script.dataset.domains = "pagic.dev,www.pagic.dev";
  script.dataset.doNotTrack = "true";
  script.dataset.excludeSearch = "true";
  script.dataset.excludeHash = "true";
  script.referrerPolicy = "no-referrer";
  script.addEventListener("load", () => {
    for (const [name, data] of pending.splice(0)) track(name, data);
  }, { once: true });
  script.addEventListener("error", () => {
    failed = true;
    pending.length = 0;
  }, { once: true });
  document.head.append(script);
})();
