// QuestiO landing — email sign-up. Mounts on #updates when QUESTIO.WAITLIST_URL is set and posts
// JSON to the joinWaitlist Cloud Function (functions/index.js in the app repo). The section's
// data-source attribute ("landing" | "invite") is stored with the sign-up.
(function () {
  var cfg = window.QUESTIO || {};
  var box = document.getElementById("updates");
  if (!box || !cfg.WAITLIST_URL) return;
  box.classList.remove("hidden");
  var form = box.querySelector("form");
  var msg = box.querySelector(".msg");
  var button = form.querySelector("button");
  var source = box.getAttribute("data-source") || "landing";
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  function say(text, ok) { msg.textContent = text; msg.className = "msg " + (ok ? "ok" : "err"); }
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var email = (form.email.value || "").trim();
    var picked = form.querySelector("input[name=platform]:checked");
    var platform = picked ? picked.value : "unknown";
    if (!EMAIL_RE.test(email) || email.length > 254) {
      say("that email doesn't look right — one more try?", false);
      form.email.focus();
      return;
    }
    button.disabled = true;
    say("one sec…", true);
    fetch(cfg.WAITLIST_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, platform: platform, source: source, website: form.website.value || "" })
    })
      .then(function (r) { return r.json().then(function (d) { return { status: r.status, data: d }; }); })
      .then(function (res) {
        if (res.status === 200 && res.data && res.data.ok) {
          form.innerHTML = "";
          say(platform === "android"
            ? "you're on the list 🍋 we'll write the day android is ready."
            : "you're on the list 🍋 we'll write when there's news.", true);
          return;
        }
        button.disabled = false;
        if (res.status === 429) say("whoa, lots of sign-ups from here today. try again tomorrow?", false);
        else if (res.status === 400) say("that email doesn't look right — one more try?", false);
        else say("hmm, that didn't work. try again?", false);
      })
      .catch(function () { button.disabled = false; say("hmm, that didn't work. try again?", false); });
  });
})();
