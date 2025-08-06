// Firebase Auth for anonymous sessions
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { auth } from './config';

// Sign in anonymously for chat sessions
export const signInAnonymous = async () => {
  try {
    const userCredential = await signInAnonymously(auth);
    return userCredential.user.uid;
  } catch (error) {
    console.error('Anonymous sign-in failed:', error);
    throw error;
  }
};

// Listen to auth state changes
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      callback(user.uid);
    } else {
      callback(null);
    }
  });
};

// Get current user session ID
export const getCurrentSessionId = () => {
  return auth.currentUser?.uid || null;
};