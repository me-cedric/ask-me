import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
  measurementId: process.env.VUE_APP_MEASURMENT_ID
}

const { Timestamp, GeoPoint } = firebase.firestore
export { Timestamp, GeoPoint }

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
export const githubAuthProvider = new firebase.auth.GithubAuthProvider()
export const twitterAuthProvider = new firebase.auth.TwitterAuthProvider()
export const appleAuthProvider = new firebase.auth.OAuthProvider('apple.com')

export const firebaseApp = firebase.initializeApp(firebaseConfig)

export const db = firebaseApp.firestore()
