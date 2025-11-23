import { useState, useCallback, useEffect } from 'react'

interface GoogleUser {
  uid: string
  email: string
  displayName: string
  photoURL?: string
  emailVerified: boolean
  token: string // Firebase ID token
}

export function useGoogleAuth() {
  const [user, setUser] = useState<GoogleUser | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Initialize Google Identity Services
  useEffect(() => {
    // Load Google Identity Services script
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    document.head.appendChild(script)

    script.onload = () => {
      console.log('[GoogleAuth] Google Identity Services loaded')
    }

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [])

  const signInWithGoogle = useCallback(async () => {
    if (!window.google) {
      setError('Google Identity Services not loaded')
      return null
    }

    setLoading(true)
    setError(null)

    try {
      // Initialize Google Sign-In
      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: '1034611317296-mnmmr130ffa0fhnvcun81drmra641nud.apps.googleusercontent.com', // From Firebase config
        scope: 'openid email profile',
        callback: async (response: any) => {
          if (response.error) {
            setError(response.error_description || 'Google Sign-In failed')
            setLoading(false)
            return
          }

          try {
            // Exchange token for Firebase ID token via your backend
            const firebaseResponse = await fetch('/api/auth/google', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                token: response.access_token,
              }),
            })

            if (!firebaseResponse.ok) {
              throw new Error('Failed to authenticate with Firebase')
            }

            const result = await firebaseResponse.json()
            console.log(`debug:firebaseResponse`, result)
            const { user: firebaseUser, idToken } = result

            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
              photoURL: firebaseUser.photoURL,
              emailVerified: firebaseUser.emailVerified,
              token: idToken,
            })

            console.log('[GoogleAuth] Successfully signed in', { user: firebaseUser })
          } catch (error) {
            console.error('[GoogleAuth] Firebase authentication failed', error)
            setError('Authentication failed')
          } finally {
            setLoading(false)
          }
        },
      })

      client.requestAccessToken()
    } catch (error) {
      console.error('[GoogleAuth] Sign-in error', error)
      setError('Failed to sign in with Google')
      setLoading(false)
      return null
    }
  }, [])

  const signOut = useCallback(() => {
    setUser(null)
    setError(null)
    console.log('[GoogleAuth] Signed out')
  }, [])

  return {
    user,
    loading,
    error,
    signInWithGoogle,
    signOut,
    isAuthenticated: !!user,
  }
}

// Add type declarations for Google Identity Services
declare global {
  interface Window {
    google?: {
      accounts: {
        oauth2: {
          initTokenClient: (config: any) => {
            requestAccessToken: () => void
          }
        }
      }
    }
  }
}
