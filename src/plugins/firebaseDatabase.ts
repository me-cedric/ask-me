import { initializeApp } from 'firebase/app'
import { getFirestore, Timestamp as ts, GeoPoint as gp } from 'firebase/firestore'
import { getAnalytics } from 'firebase/analytics'
import { GoogleAuthProvider, GithubAuthProvider, TwitterAuthProvider, OAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
  measurementId: process.env.VUE_APP_MEASURMENT_ID
}

export const Timestamp = ts
export const GeoPoint = gp

export const googleAuthProvider = new GoogleAuthProvider()
export const githubAuthProvider = new GithubAuthProvider()
export const twitterAuthProvider = new TwitterAuthProvider()
export const appleAuthProvider = new OAuthProvider('apple.com')

export const firebaseApp = initializeApp(firebaseConfig)

export const db = getFirestore()
export const analytics = getAnalytics(firebaseApp)
