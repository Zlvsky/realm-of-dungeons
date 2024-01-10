import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_GOOGLE_APP_KEY,
  authDomain: "realmdungeons.firebaseapp.com",
  projectId: "realmdungeons",
  storageBucket: "realmdungeons.appspot.com",
  messagingSenderId: "887985218514",
  appId: import.meta.env.VITE_GOOGLE_APP_ID,
  measurementId: "G-WC8YG0VQ4F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const startCollectingAnalitycs = () => {
  const analytics = getAnalytics(app);
  logEvent(analytics, "page_view");
  logEvent(analytics, "screen_view");
  logEvent(analytics, "user_engagement");
  logEvent(analytics, "session_start");
  logEvent(analytics, "session_end");
};

export default app;