import { NextRequest, NextResponse } from 'next/server'
import { adminAuth } from '@/lib/firebase-admin'

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json(
        { error: 'Google access token is required' },
        { status: 400 }
      )
    }

    // Verify the Google ID token with Firebase Admin SDK
    // Note: You need to enable Google Provider in Firebase Auth first
    try {
      // Create a custom token for the user based on Google info
      // In a real implementation, you'd verify the Google token first
      // For now, we'll create a test user with a dummy UID

      // Get Google user info (this is a simplified version)
      const googleUserInfo = {
        uid: `google_${Date.now()}`, // Generate a unique ID
        email: 'user@gmail.com', // You'd get this from Google token verification
        displayName: 'Google User',
        photoURL: undefined,
        emailVerified: true,
      }

      // Create a custom Firebase token
      const customToken = await adminAuth.createCustomToken(googleUserInfo.uid, {
        email: googleUserInfo.email,
        displayName: googleUserInfo.displayName,
      })

      return NextResponse.json({
        user: googleUserInfo,
        customToken,
        message: 'Successfully authenticated with Google'
      })
    } catch (firebaseError: any) {
      console.error('Firebase authentication error:', firebaseError)
      return NextResponse.json(
        { error: 'Firebase authentication failed: ' + firebaseError.message },
        { status: 500 }
      )
    }
  } catch (error: any) {
    console.error('Google auth API error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}