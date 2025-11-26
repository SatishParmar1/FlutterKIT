// Firebase Configuration for FlutterOrbit Academy
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent, isSupported } from "firebase/analytics";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit,
  serverTimestamp,
  doc,
  updateDoc,
  increment,
  setDoc,
  getDoc
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnsESxQcCb7ay_brDbyEVLm8pgRvgpCUc",
  authDomain: "flutterkit-a8bc8.firebaseapp.com",
  projectId: "flutterkit-a8bc8",
  storageBucket: "flutterkit-a8bc8.firebasestorage.app",
  messagingSenderId: "205451948398",
  appId: "1:205451948398:web:9c93d647e2a5cc1f34917f",
  measurementId: "G-WJGYBZPNJR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initialize Analytics only if supported (not in localhost sometimes)
let analytics = null;
isSupported().then(yes => {
  if (yes) {
    analytics = getAnalytics(app);
  }
}).catch(() => {});

// Safe analytics logging
const safeLogEvent = (eventName, params = {}) => {
  if (analytics) {
    try {
      logEvent(analytics, eventName, params);
    } catch (e) {
      console.log('Analytics event skipped:', eventName);
    }
  }
};

// --- NEWSLETTER FUNCTIONS ---

// Subscribe to newsletter
export const subscribeToNewsletter = async (email) => {
  try {
    // Check if email already exists
    const q = query(collection(db, "newsletter"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      return { success: false, message: "This email is already subscribed!" };
    }
    
    // Add new subscriber
    await addDoc(collection(db, "newsletter"), {
      email,
      subscribedAt: serverTimestamp(),
      active: true
    });
    
    // Log analytics event
    safeLogEvent('newsletter_subscribe', { email_domain: email.split('@')[1] });
    
    return { success: true, message: "Successfully subscribed to newsletter!" };
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    return { success: false, message: "Failed to subscribe. Please try again." };
  }
};

// --- FEEDBACK FUNCTIONS ---

// Submit feedback
export const submitFeedback = async (feedbackData) => {
  try {
    await addDoc(collection(db, "feedback"), {
      ...feedbackData,
      submittedAt: serverTimestamp(),
      status: "new"
    });
    
    safeLogEvent('feedback_submit', { type: feedbackData.type });
    
    return { success: true, message: "Thank you for your feedback!" };
  } catch (error) {
    console.error("Error submitting feedback:", error);
    return { success: false, message: "Failed to submit feedback. Please try again." };
  }
};

// --- COMMUNITY STATS FUNCTIONS ---

// Get or initialize community stats
export const getCommunityStats = async () => {
  try {
    const statsRef = doc(db, "stats", "community");
    const statsDoc = await getDoc(statsRef);
    
    if (statsDoc.exists()) {
      return statsDoc.data();
    } else {
      // Initialize stats if they don't exist
      const initialStats = {
        totalLearners: 1247,
        modulesCompleted: 5893,
        hoursLearned: 12450,
        averageStreak: 7
      };
      await setDoc(statsRef, initialStats);
      return initialStats;
    }
  } catch (error) {
    console.error("Error getting community stats:", error);
    // Return fallback stats
    return {
      totalLearners: 1247,
      modulesCompleted: 5893,
      hoursLearned: 12450,
      averageStreak: 7
    };
  }
};

// Update community stats when user completes a module
export const updateCommunityStats = async (statType) => {
  try {
    const statsRef = doc(db, "stats", "community");
    const updateObj = {};
    updateObj[statType] = increment(1);
    await updateDoc(statsRef, updateObj);
  } catch (error) {
    console.error("Error updating community stats:", error);
  }
};

// Track new learner
export const trackNewLearner = async () => {
  try {
    const learnerKey = localStorage.getItem('flutterOrbit_learnerId');
    if (!learnerKey) {
      const newId = `learner_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('flutterOrbit_learnerId', newId);
      // Don't fail if stats update fails
      try {
        await updateCommunityStats('totalLearners');
      } catch (e) {
        console.log('Stats update skipped');
      }
      safeLogEvent('new_learner');
    }
  } catch (error) {
    console.error("Error tracking new learner:", error);
  }
};

// --- LEADERBOARD FUNCTIONS ---

// Submit score to leaderboard
export const submitToLeaderboard = async (userData) => {
  try {
    const { name, streak, modulesCompleted, score } = userData;
    
    // Create a unique ID based on name (in production, use actual user auth)
    const odId = name.toLowerCase().replace(/\s+/g, '_') + '_' + Date.now().toString(36);
    
    await addDoc(collection(db, "leaderboard"), {
      odId,
      name,
      streak,
      modulesCompleted,
      score,
      submittedAt: serverTimestamp()
    });
    
    safeLogEvent('leaderboard_submit', { score });
    
    return { success: true, message: "Score submitted to leaderboard!" };
  } catch (error) {
    console.error("Error submitting to leaderboard:", error);
    return { success: false, message: "Failed to submit score." };
  }
};

// Get top leaderboard entries
export const getLeaderboard = async (limitCount = 10) => {
  try {
    const q = query(
      collection(db, "leaderboard"),
      orderBy("score", "desc"),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    const leaderboard = [];
    
    querySnapshot.forEach((doc) => {
      leaderboard.push({ id: doc.id, ...doc.data() });
    });
    
    return leaderboard;
  } catch (error) {
    console.error("Error getting leaderboard:", error);
    return [];
  }
};

// --- SHARED PROGRESS FUNCTIONS ---

// Share progress (creates a shareable link data)
export const shareProgress = async (progressData) => {
  try {
    const shareDoc = await addDoc(collection(db, "sharedProgress"), {
      ...progressData,
      sharedAt: serverTimestamp(),
      views: 0
    });
    
    safeLogEvent('progress_shared');
    
    return { success: true, shareId: shareDoc.id };
  } catch (error) {
    console.error("Error sharing progress:", error);
    return { success: false, message: "Failed to share progress." };
  }
};

// Get shared progress
export const getSharedProgress = async (shareId) => {
  try {
    const docRef = doc(db, "sharedProgress", shareId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      // Increment view count
      await updateDoc(docRef, { views: increment(1) });
      return { success: true, data: docSnap.data() };
    } else {
      return { success: false, message: "Shared progress not found." };
    }
  } catch (error) {
    console.error("Error getting shared progress:", error);
    return { success: false, message: "Failed to load shared progress." };
  }
};

// --- ANALYTICS EVENTS ---

export const trackEvent = (eventName, eventParams = {}) => {
  safeLogEvent(eventName, eventParams);
};

// Track module completion
export const trackModuleCompletion = (moduleId, moduleName) => {
  trackEvent('module_completed', { module_id: moduleId, module_name: moduleName });
  updateCommunityStats('modulesCompleted');
};

// Track quiz completion
export const trackQuizCompletion = (moduleId, score, totalQuestions) => {
  trackEvent('quiz_completed', { 
    module_id: moduleId, 
    score, 
    total_questions: totalQuestions,
    percentage: Math.round((score / totalQuestions) * 100)
  });
};

// Track flashcard review
export const trackFlashcardReview = (count) => {
  trackEvent('flashcards_reviewed', { count });
};

// Track DartPad usage
export const trackDartPadUsage = (moduleId) => {
  trackEvent('dartpad_opened', { module_id: moduleId });
};

// Track resource click
export const trackResourceClick = (resourceName, resourceType) => {
  trackEvent('resource_clicked', { resource_name: resourceName, resource_type: resourceType });
};

export { app, analytics, db };
