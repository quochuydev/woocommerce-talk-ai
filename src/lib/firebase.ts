import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
}

// Validate Firebase config
const isConfigValid = Object.values(firebaseConfig).every(value => value !== undefined && value !== '')

if (!isConfigValid) {
  console.error('[Firebase] Invalid Firebase configuration. Make sure all environment variables are set:', {
    apiKey: firebaseConfig.apiKey ? '✓' : '✗',
    authDomain: firebaseConfig.authDomain ? '✓' : '✗',
    projectId: firebaseConfig.projectId ? '✓' : '✗',
    storageBucket: firebaseConfig.storageBucket ? '✓' : '✗',
    messagingSenderId: firebaseConfig.messagingSenderId ? '✓' : '✗',
    appId: firebaseConfig.appId ? '✓' : '✗',
    measurementId: firebaseConfig.measurementId ? '✓' : '✗',
  })
  throw new Error('Firebase configuration is incomplete. Check your .env file.')
}

// Initialize Firebase
// Note: Only using Firestore for real-time messages
// Firebase Functions are deprecated - using Next.js API instead
console.log('[Firebase] Initializing with project:', firebaseConfig.projectId)
const app = initializeApp(firebaseConfig)
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null
const db = getFirestore(app)
console.log('[Firebase] Initialization complete')

export { app, analytics, db }
