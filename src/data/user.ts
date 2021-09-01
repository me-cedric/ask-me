export interface User {
  uid: string
  email: string
  correct: number
  incorrect: number
  unkown: number
  paying: boolean
  emailVerified: boolean
  isAnonymous: boolean
  metadata: UserMetadata
  phoneNumber: string
  displayName: string
  photoURL: string
  providerId: string
}

export interface UserMetadata {
  creationTime?: string
  lastSignInTime?: string
}
