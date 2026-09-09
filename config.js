// One place to set the real URLs + switches — edit, commit, push; Pages redeploys automatically.
window.QUESTIO = {
  // While the App Store still carries the pre-redesign 1.0.x app, the TestFlight beta is the
  // front door: the primary button goes to TESTFLIGHT_URL and the App Store link is hidden.
  // Flip to false the day 2.1.0 is live on the App Store.
  BETA_FIRST: true,
  APP_STORE_URL: "https://apps.apple.com/us/app/questio-habit-quests/id6759207289",
  TESTFLIGHT_URL: "https://testflight.apple.com/join/haZpx76g",
  APP_SCHEME: "questio://",
  // Email sign-up form → the joinWaitlist Cloud Function (functions/index.js) → Firestore `waitlist`.
  // Empty string hides the form entirely.
  WAITLIST_URL: "https://joinwaitlist-dmfy7uqf5q-uc.a.run.app",
  // Optional one-liner under the tagline (anniversary, launch day…). Empty hides it.
  ANNOUNCEMENT: "two years of habit buddies today 🍋 the beta is open.",
};
