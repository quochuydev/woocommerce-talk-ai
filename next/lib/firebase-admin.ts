import * as admin from 'firebase-admin'

console.log(`debug:process.env.FIREBASE_PROJECT_ID`, process.env.FIREBASE_PROJECT_ID)
console.log(`debug:process.env.FIREBASE_CLIENT_EMAIL`, process.env.FIREBASE_CLIENT_EMAIL)
console.log(`debug:process.env.FIREBASE_PRIVATE_KEY length`, process.env.FIREBASE_PRIVATE_KEY?.length)

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    })
  } catch (error) {
    console.error('Firebase admin initialization error:', error)
  }
}

export const db = admin.firestore()
export const adminAuth = admin.auth()

export default admin
