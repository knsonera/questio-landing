// QuestiO landing — cookieless counters. Sends a "hit" to the joinWaitlist endpoint (functions/index.js in
// the app repo) on page view and on taps of links marked data-stat="…". No cookies, no personal data: the
// payload is the event name, the page, iPhone/Android/other from the user agent, the referrer host and the
// optional ?src= tag on the URL. Sent as text/plain so the browser needs no CORS preflight and
// navigator.sendBeacon can fire during a link tap. A sessionStorage flag stops a refresh from counting twice.
(function () {
  var cfg = window.QUESTIO || {};
  if (!cfg.WAITLIST_URL) return;
  var page = document.body.getAttribute("data-page") || "landing";
  var ua = navigator.userAgent || "";
  var platform = /iPhone|iPad|iPod/i.test(ua) ? "ios" : /Android/i.test(ua) ? "android" : "other";
  var ref = "";
  try { ref = document.referrer ? new URL(document.referrer).hostname : ""; } catch (e) {}
  var params = new URLSearchParams(location.search);
  var src = params.get("src") || params.get("utm_source") || "";
  function hit(event) {
    var payload = JSON.stringify({ kind: "hit", event: event, page: page, platform: platform, ref: ref, src: src });
    try {
      if (navigator.sendBeacon && navigator.sendBeacon(cfg.WAITLIST_URL, new Blob([payload], { type: "text/plain" }))) return;
    } catch (e) {}
    try {
      fetch(cfg.WAITLIST_URL, { method: "POST", headers: { "Content-Type": "text/plain" }, body: payload, keepalive: true }).catch(function () {});
    } catch (e) {}
  }
  var seen = false;
  try { seen = !!sessionStorage.getItem("q_viewed"); if (!seen) sessionStorage.setItem("q_viewed", "1"); } catch (e) {}
  if (!seen) hit("view");
  document.addEventListener("click", function (e) {
    var a = e.target && e.target.closest ? e.target.closest("a[data-stat]") : null;
    if (a) hit(a.getAttribute("data-stat"));
  }, true);
  window.QUESTIO_STATS = { hit: hit };
})();
