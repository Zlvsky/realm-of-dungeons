import { FirebaseApp, initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCG42ipOT3VKGOpVlqavEBYKwOWyFgGRr4",
  authDomain: "realmdungeons.firebaseapp.com",
  projectId: "realmdungeons",
  storageBucket: "realmdungeons.appspot.com",
  messagingSenderId: "887985218514",
  appId: "1:887985218514:web:e07106cea12749e9a61e0b",
  measurementId: "G-WC8YG0VQ4F",
};

export const startCollectingAnalitycs = (app: FirebaseApp) => {
  const analytics = getAnalytics(app);
  logEvent(analytics, "page_view");
  logEvent(analytics, "screen_view");
  logEvent(analytics, "user_engagement");
  logEvent(analytics, "session_start");
  logEvent(analytics, "session_end");
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
startCollectingAnalitycs(app);

export default app;