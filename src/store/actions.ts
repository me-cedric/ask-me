import { ActionTree } from 'vuex'
import { State } from '.'
import { db, firebaseApp as firebase } from '@/plugins/firebaseDatabase'
import { User, UserMetadata } from '@/data/user'

const actions: ActionTree<State, State> = {
  authAction({ commit }) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        db.collection('users')
          .doc(user.uid)
          .get()
          .then((userDoc) => {
            const userData = userDoc.data()
            return db
              .collection('users')
              .doc(user.uid)
              .set({
                emailVerified: user.emailVerified,
                isAnonymous: user.isAnonymous,
                metadata: {
                  creationTime: (user.metadata as UserMetadata).creationTime,
                  lastSignInTime: (user.metadata as UserMetadata).lastSignInTime
                },
                phoneNumber: user.phoneNumber,
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                providerId: user.providerId,
                uid: user.uid,
                correct: userData != null ? userData.correct : 0,
                incorrect: userData != null ? userData.incorrect : 0,
                unkown: userData != null ? userData.unkown : 0,
                paying: userData != null ? userData.paying : false
              } as User)
          })
          .then(() =>
            db
              .collection('users')
              .doc(user.uid)
              .get()
              .then((userDoc) => commit('setUser', userDoc.data()))
          )
      } else {
        commit('setUser', null)
      }
    })
  },
  signUpAction({ commit }, payload) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .catch((error) => {
        commit('setError', error.message)
      })
  },
  signInAction({ commit }, payload) {
    firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .catch((error) => {
        commit('setError', error.message)
      })
  },
  signInAnonymouslyAction({ commit }) {
    firebase
      .auth()
      .signInAnonymously()
      .catch((error) => {
        commit('setError', error.message)
      })
  },
  signOutAction({ commit }) {
    firebase
      .auth()
      .signOut()
      .catch((error) => {
        commit('setError', error.message)
      })
  }
}

export default actions
