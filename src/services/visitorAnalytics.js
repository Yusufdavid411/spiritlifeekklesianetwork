import { db } from "../firebase/firebaseConfig";
import {
  doc,
  getDoc,
  increment,
  runTransaction,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

const VISITOR_ID_KEY = "sen_visitor_id";
const LAST_TRACKED_DATE_KEY = "sen_last_tracked_date";
const DAILY_VISITORS_COLLECTION = "visitorAnalyticsDaily";
const VISITOR_LOG_COLLECTION = "visitorAnalyticsLogs";

export const getLocalDateKey = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const createVisitorId = () => {
  if (window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

const getVisitorId = () => {
  const existingVisitorId = localStorage.getItem(VISITOR_ID_KEY);

  if (existingVisitorId) {
    return existingVisitorId;
  }

  const visitorId = createVisitorId();
  localStorage.setItem(VISITOR_ID_KEY, visitorId);
  return visitorId;
};

export const trackDailyVisitor = async (pathname = window.location.pathname) => {
  if (pathname.startsWith("/admin")) {
    return;
  }

  const dateKey = getLocalDateKey();
  const lastTrackedDate = localStorage.getItem(LAST_TRACKED_DATE_KEY);

  if (lastTrackedDate === dateKey) {
    return;
  }

  const visitorId = getVisitorId();
  const dailyDocRef = doc(db, DAILY_VISITORS_COLLECTION, dateKey);
  const visitorLogRef = doc(db, VISITOR_LOG_COLLECTION, `${dateKey}_${visitorId}`);

  await runTransaction(db, async (transaction) => {
    const visitorLog = await transaction.get(visitorLogRef);

    if (visitorLog.exists()) {
      return;
    }

    transaction.set(visitorLogRef, {
      date: dateKey,
      visitorId,
      firstPath: pathname,
      createdAt: serverTimestamp(),
    });

    transaction.set(
      dailyDocRef,
      {
        date: dateKey,
        visitors: increment(1),
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  });

  localStorage.setItem(LAST_TRACKED_DATE_KEY, dateKey);
};

export const recordPageView = async (pathname = window.location.pathname) => {
  if (pathname.startsWith("/admin")) {
    return;
  }

  const dateKey = getLocalDateKey();
  const dailyDocRef = doc(db, DAILY_VISITORS_COLLECTION, dateKey);

  await setDoc(
    dailyDocRef,
    {
      date: dateKey,
      pageViews: increment(1),
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
};

export const getDailyVisitorCount = async (dateKey) => {
  const dailyDocRef = doc(db, DAILY_VISITORS_COLLECTION, dateKey);
  const snapshot = await getDoc(dailyDocRef);

  if (!snapshot.exists()) {
    return 0;
  }

  return snapshot.data().visitors || 0;
};
