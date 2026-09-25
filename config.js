// One place to set the real URLs + switches — edit, commit, push; Pages redeploys automatically.
window.QUESTIO = {
  // true = the TestFlight beta is the front door (primary button → TESTFLIGHT_URL, store link hidden).
  // Flipped to false 2026-09-25: 2.1 is live on the App Store, so "get QuestiO" → APP_STORE_URL.
  BETA_FIRST: false,
  APP_STORE_URL: "https://apps.apple.com/us/app/questio-habit-quests/id6759207289",
  TESTFLIGHT_URL: "https://testflight.apple.com/join/haZpx76g",
  APP_SCHEME: "questio://",
  // Email sign-up form → the joinWaitlist Cloud Function (functions/index.js) → Firestore `waitlist`.
  // Empty string hides the form entirely.
  WAITLIST_URL: "https://joinwaitlist-dmfy7uqf5q-uc.a.run.app",
  // Optional one-liner under the tagline (anniversary, launch day…). Empty hides it.
  // Launch line since 2026-09-25 (2.1 live on the App Store). Clear it after a couple of weeks.
  ANNOUNCEMENT: "new: QuestiO 2.1 is on the App Store 🍋",
};
