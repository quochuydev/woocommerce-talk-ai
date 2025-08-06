🔥 Step 1: Create Firebase Project

  1. Go to https://console.firebase.google.com/
  2. Click "Create a project"
  3. Name it: woocommerce-talk-ai (or your preferred name)
  4. Choose whether to enable Google Analytics (I recommend Yes for tracking)
  5. Click "Create project"

  🔧 Step 2: Add Web App & Get Config

  1. On the project overview page, click the </> (web) icon
  2. App nickname: Chat Widget
  3. Check "Also set up Firebase Hosting"
  4. Click "Register app"
  5. Copy the config object that appears (looks like this):

  const firebaseConfig = {
    apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdefghijklmnop"
  };

  📝 Step 3: Update Your Config File

  Replace the placeholder config in your src/firebase/config.js with your real config:

⏺ Read(src/firebase/config.js)
  ⎿  Read 27 lines (ctrl+r to expand)

⏺ Replace lines 10-15 with your actual Firebase config values from step 2.

  🏗️ Step 4: Initialize Firebase CLI

  # Make sure you're in your project directory
  cd woocommerce-talk-ai

  # Initialize Firebase (this connects your local project to Firebase)
  firebase init

  When prompted, select:
  - ✅ Firestore: Configure security rules and indexes
  - ✅ Functions: Configure a Cloud Functions directory
  - ✅ Hosting: Configure files for Firebase Hosting
  - ✅ Storage: Configure a security rules file for Cloud Storage

  For the prompts:
  - Use existing project → Select your project
  - Firestore rules file → firestore.rules (already exists)
  - Firestore indexes file → firestore.indexes.json (already exists)
  - Functions language → JavaScript
  - Use ESLint → No (we already have linting)
  - Install dependencies → Yes
  - Hosting public directory → widget-dist
  - Single-page app → No
  - Storage rules file → storage.rules (already exists)

  🚀 Step 5: Install Function Dependencies

  cd functions
  npm install
  cd ..

  🧪 Step 6: Test with Firebase Emulators

  # Start Firebase emulators for local development
  firebase emulators:start

  This opens:
  - Emulator UI: http://localhost:4000
  - Firestore: http://localhost:8080
  - Functions: http://localhost:5001
  - Storage: http://localhost:9199
  - Hosting: http://localhost:5000

  ✅ Step 7: Enable Firebase Services

  In Firebase Console:

  1. Authentication:
    - Go to Authentication → Sign-in method
    - Enable Anonymous authentication
  2. Firestore:
    - Go to Firestore Database → Create database
    - Start in test mode (we'll deploy rules later)
  3. Storage:
    - Go to Storage → Get started
    - Start in test mode
  4. Functions (will be enabled when you deploy)

  🎯 Step 8: Quick Test

  Let me know when you've completed steps 1-7, and I'll help you:

  1. Update your Chat component to use Firebase
  2. Test the real-time messaging
  3. Deploy to Firebase Hosting
  4. Show you the live demo

  📋 Checklist - Let me know when you have:

  - ✅ Firebase project created
  - ✅ Web app registered and config copied
  - ✅ Config updated in src/firebase/config.js
  - ✅ firebase init completed
  - ✅ Function dependencies installed
  - ✅ Firebase services enabled (Auth, Firestore, Storage)
  - ✅ Emulators started successfully
