import { db } from "../firebase/firebaseConfig";
import {
  doc,
  getDoc,
  increment,
  runTransaction,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

const DEVICE_ID_KEY = "sen_device_id";
const LIKED_POSTS_KEY = "sen_liked_posts";
const PROGRAM_EVENT_ANALYTICS_COLLECTION = "programEventAnalytics";
const RHEMA_ANALYTICS_COLLECTION = "rhemaAnalytics";

const createDeviceId = () => {
  if (window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

export const getDeviceId = () => {
  const existingDeviceId = localStorage.getItem(DEVICE_ID_KEY);

  if (existingDeviceId) {
    return existingDeviceId;
  }

  const deviceId = createDeviceId();
  localStorage.setItem(DEVICE_ID_KEY, deviceId);
  return deviceId;
};

const getPostKey = (department, postId) => `${department}:${postId}`;
const getProgramEventKey = (eventId) => `program-event:${eventId}`;
const getRhemaKey = (rhemaId) => `rhema:${rhemaId}`;

const getLocalDateKey = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const getLikedPostKeys = () => {
  try {
    return JSON.parse(localStorage.getItem(LIKED_POSTS_KEY) || "[]");
  } catch (error) {
    console.error("Could not read liked posts:", error);
    return [];
  }
};

const saveLikedPostKey = (department, postId) => {
  const likedPostKeys = new Set(getLikedPostKeys());
  likedPostKeys.add(getPostKey(department, postId));
  localStorage.setItem(LIKED_POSTS_KEY, JSON.stringify([...likedPostKeys]));
};

export const hasLikedPost = (department, postId) => {
  return getLikedPostKeys().includes(getPostKey(department, postId));
};

export const hasLikedProgramEvent = (eventId) => {
  return getLikedPostKeys().includes(getProgramEventKey(eventId));
};

export const hasLikedRhema = (rhemaId) => {
  return getLikedPostKeys().includes(getRhemaKey(rhemaId));
};

export const recordPostWatch = async (department, postId) => {
  const postRef = doc(db, department, postId);

  await updateDoc(postRef, {
    watchCount: increment(1),
    lastWatchedAt: serverTimestamp(),
  });
};

export const likePostOnce = async (department, postId) => {
  const deviceId = getDeviceId();
  const postRef = doc(db, department, postId);
  const likeRef = doc(db, department, postId, "likes", deviceId);

  const liked = await runTransaction(db, async (transaction) => {
    const likeSnapshot = await transaction.get(likeRef);

    if (likeSnapshot.exists()) {
      return false;
    }

    transaction.set(likeRef, {
      department,
      postId,
      deviceId,
      createdAt: serverTimestamp(),
    });

    transaction.update(postRef, {
      likeCount: increment(1),
      lastLikedAt: serverTimestamp(),
    });

    return true;
  });

  saveLikedPostKey(department, postId);
  return liked;
};

export const getProgramEventAnalytics = async (eventId) => {
  const eventRef = doc(db, PROGRAM_EVENT_ANALYTICS_COLLECTION, String(eventId));
  const snapshot = await getDoc(eventRef);

  if (!snapshot.exists()) {
    return { watchCount: 0, likeCount: 0 };
  }

  const data = snapshot.data();

  return {
    watchCount: data.watchCount || 0,
    likeCount: data.likeCount || 0,
  };
};

export const recordProgramEventWatch = async (eventId, event = {}) => {
  const deviceId = getDeviceId();
  const dateKey = getLocalDateKey();
  const eventKey = String(eventId);
  const eventRef = doc(db, PROGRAM_EVENT_ANALYTICS_COLLECTION, eventKey);
  const viewRef = doc(
    db,
    PROGRAM_EVENT_ANALYTICS_COLLECTION,
    eventKey,
    "dailyViews",
    `${dateKey}_${deviceId}`
  );

  return runTransaction(db, async (transaction) => {
    const viewSnapshot = await transaction.get(viewRef);

    if (viewSnapshot.exists()) {
      return false;
    }

    transaction.set(viewRef, {
      eventId: eventKey,
      deviceId,
      date: dateKey,
      createdAt: serverTimestamp(),
    });

    transaction.set(
      eventRef,
      {
        eventId: eventKey,
        title: event.title || "Untitled Program",
        watchCount: increment(1),
        updatedAt: serverTimestamp(),
        lastWatchedAt: serverTimestamp(),
      },
      { merge: true }
    );

    return true;
  });
};

export const likeProgramEventOnce = async (eventId, event = {}) => {
  const deviceId = getDeviceId();
  const eventKey = String(eventId);
  const eventRef = doc(db, PROGRAM_EVENT_ANALYTICS_COLLECTION, eventKey);
  const likeRef = doc(
    db,
    PROGRAM_EVENT_ANALYTICS_COLLECTION,
    eventKey,
    "likes",
    deviceId
  );

  const liked = await runTransaction(db, async (transaction) => {
    const likeSnapshot = await transaction.get(likeRef);

    if (likeSnapshot.exists()) {
      return false;
    }

    transaction.set(likeRef, {
      eventId: eventKey,
      deviceId,
      createdAt: serverTimestamp(),
    });

    transaction.set(
      eventRef,
      {
        eventId: eventKey,
        title: event.title || "Untitled Program",
        likeCount: increment(1),
        updatedAt: serverTimestamp(),
        lastLikedAt: serverTimestamp(),
      },
      { merge: true }
    );

    return true;
  });

  const likedPostKeys = new Set(getLikedPostKeys());
  likedPostKeys.add(getProgramEventKey(eventId));
  localStorage.setItem(LIKED_POSTS_KEY, JSON.stringify([...likedPostKeys]));
  return liked;
};

export const getRhemaAnalytics = async (rhemaId) => {
  const rhemaRef = doc(db, RHEMA_ANALYTICS_COLLECTION, String(rhemaId));
  const snapshot = await getDoc(rhemaRef);

  if (!snapshot.exists()) {
    return { viewCount: 0, likeCount: 0 };
  }

  const data = snapshot.data();

  return {
    viewCount: data.viewCount || 0,
    likeCount: data.likeCount || 0,
  };
};

export const recordRhemaView = async (rhemaId, rhema = {}) => {
  const deviceId = getDeviceId();
  const dateKey = getLocalDateKey();
  const rhemaKey = String(rhemaId);
  const rhemaRef = doc(db, RHEMA_ANALYTICS_COLLECTION, rhemaKey);
  const viewRef = doc(
    db,
    RHEMA_ANALYTICS_COLLECTION,
    rhemaKey,
    "dailyViews",
    `${dateKey}_${deviceId}`
  );

  return runTransaction(db, async (transaction) => {
    const viewSnapshot = await transaction.get(viewRef);

    if (viewSnapshot.exists()) {
      return false;
    }

    transaction.set(viewRef, {
      rhemaId: rhemaKey,
      deviceId,
      date: dateKey,
      createdAt: serverTimestamp(),
    });

    transaction.set(
      rhemaRef,
      {
        rhemaId: rhemaKey,
        title: rhema.title || "Untitled Rhema",
        viewCount: increment(1),
        updatedAt: serverTimestamp(),
        lastViewedAt: serverTimestamp(),
      },
      { merge: true }
    );

    return true;
  });
};

export const likeRhemaOnce = async (rhemaId, rhema = {}) => {
  const deviceId = getDeviceId();
  const rhemaKey = String(rhemaId);
  const rhemaRef = doc(db, RHEMA_ANALYTICS_COLLECTION, rhemaKey);
  const likeRef = doc(db, RHEMA_ANALYTICS_COLLECTION, rhemaKey, "likes", deviceId);

  const liked = await runTransaction(db, async (transaction) => {
    const likeSnapshot = await transaction.get(likeRef);

    if (likeSnapshot.exists()) {
      return false;
    }

    transaction.set(likeRef, {
      rhemaId: rhemaKey,
      deviceId,
      createdAt: serverTimestamp(),
    });

    transaction.set(
      rhemaRef,
      {
        rhemaId: rhemaKey,
        title: rhema.title || "Untitled Rhema",
        likeCount: increment(1),
        updatedAt: serverTimestamp(),
        lastLikedAt: serverTimestamp(),
      },
      { merge: true }
    );

    return true;
  });

  const likedPostKeys = new Set(getLikedPostKeys());
  likedPostKeys.add(getRhemaKey(rhemaId));
  localStorage.setItem(LIKED_POSTS_KEY, JSON.stringify([...likedPostKeys]));
  return liked;
};
