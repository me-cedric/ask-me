import { ActionTree } from 'vuex'
import { State } from '.'
import { db, firebaseApp as firebase } from '@/plugins/firebaseDatabase'
import { User, UserMetadata } from '@/data/user'
import { Subject } from '@/data/subject'
import { Question } from '@/data/question'

const subjectsRef = db.collection('subjects')

const actions: ActionTree<State, State> = {
  authAction({ commit }) {
    return firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        db.collection('users') // should be done with cloud function at user creation
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
    return firebase
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .catch((error) => {
        commit('setError', error.message)
      })
  },
  signInAction({ commit }, payload) {
    return firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .catch((error) => {
        commit('setError', error.message)
      })
  },
  socialSignInAction({ commit }, payload) {
    return firebase
      .auth()
      .signInWithPopup(payload)
      .catch((error) => {
        commit('setError', error.message)
      })
  },
  signInAnonymouslyAction({ commit }) {
    return firebase
      .auth()
      .signInAnonymously()
      .catch((error) => {
        commit('setError', error.message)
      })
  },
  signOutAction({ commit }) {
    return firebase
      .auth()
      .signOut()
      .catch((error) => {
        commit('setError', error.message)
      })
  },
  getSubjectsAction({ commit }) {
    return subjectsRef
      .get()
      .then(async (querySnapshot) => {
        const subjects: Subject[] = []
        await querySnapshot.forEach(async (doc) => {
          const subject: Subject = doc.data() as Subject
          subject.id = doc.id
          const questionsSnapshot = await db
            .collection('subjects/' + doc.id + '/questions')
            .get()
          if (subject.questions == null) {
            subject.questions = []
          }
          questionsSnapshot.forEach((q) =>
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
  getSubjectAction({ commit }, payload) {
    return subjectsRef
      .doc(payload)
      .get()
      .then(async (doc) => {
        const subject: Subject = doc.data() as Subject
        subject.id = doc.id
        const questionsSnapshot = await db
          .collection('subjects/' + doc.id + '/questions')
          .get()
        if (subject.questions == null) {
          subject.questions = []
        }
        questionsSnapshot.forEach((q) =>
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
