import { ActionTree } from 'vuex'
import { State } from '.'
import { db } from '@/plugins/firebaseDatabase'
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signInAnonymously, signOut } from "firebase/auth"
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { User, UserMetadata } from '@/data/user'
import { Subject } from '@/data/subject'
import { Question } from '@/data/question'

const subjectsRef = collection(db, 'subjects')
const auth = getAuth()

const actions: ActionTree<State, State> = {
  authAction({ commit }) {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        // should be done with cloud function at user creation
        getDoc(doc(collection(db, 'users'), user.uid))
          .then((userDoc) => {
            const userData = userDoc.data()
            return setDoc(doc(collection(db, 'users')), {
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
            getDoc(doc(collection(db, 'users'), user.uid))
          )
          .then((userDoc) => {
            commit('setUser', userDoc.data())
            commit('setUserSignInStatus', true)
          })
      } else {
        commit('setUser', null)
        commit('setUserSignInStatus', false)
      }
    })
  },
  signUpAction({ commit }, payload) {
    return createUserWithEmailAndPassword(auth, payload.email, payload.password)
      .catch((error) => {
        commit('setError', error.message)
      })
  },
  signInAction({ commit }, payload) {
    return signInWithEmailAndPassword(auth, payload.email, payload.password)
      .catch((error) => {
        commit('setError', error.message)
      })
  },
  socialSignInAction({ commit }, payload) {
    return signInWithPopup(auth, payload)
      .catch((error) => {
        commit('setError', error.message)
      })
  },
  signInAnonymouslyAction({ commit }) {
    return signInAnonymously(auth)
      .catch((error) => {
        commit('setError', error.message)
      })
  },
  signOutAction({ commit }) {
    return signOut(auth)
      .catch((error) => {
        commit('setError', error.message)
      })
  },
  getSubjectsAction({ commit }) {
    return getDoc(doc(subjectsRef))
      .then(async (querySnapshot) => {
        const subjects: Subject[] = []
        await querySnapshot.data().forEach(async (document: any) => {
          const subject: Subject = document.data() as Subject
          subject.id = document.id
          const questionsSnapshot = await getDoc(doc(collection(db, 'subjects/' + document.id + '/questions')))
          if (subject.questions == null) {
            subject.questions = []
          }
          questionsSnapshot.data().forEach((q: any) =>
            subject.questions.push(q.data() as Question)
          )
          subjects.push(subject)
        })
        commit('setSubjects', subjects)
      })
      .catch((error) => {
        commit('setError', error.message)
      })
  },
  getSubjectAction({ commit }) {
    return getDoc(doc(subjectsRef))
      .then(async (document) => {
        const subject: Subject = document.data() as Subject
        subject.id = document.id
        const questionsSnapshot = await getDoc(doc(collection(db, 'subjects/' + document.id + '/questions')))
        if (subject.questions == null) {
          subject.questions = []
        }
        questionsSnapshot.data().forEach((q: any) =>
          subject.questions.push(q.data() as Question)
        )
        commit('setSubject', subject)
      })
      .catch((error) => {
        commit('setError', error.message)
      })
  }
}

export default actions
