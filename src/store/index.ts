import { Subject } from '@/data/subject'
import { User } from '@/data/user'
import { createStore } from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db } from './firebaseDatabase'

interface State {
  subjects: Subject[]
  users: User[]
  user?: User
}

export default createStore<State>({
  state: {
    subjects: [], // Will be bound as an array
    // user: null, // Will be bound as an object
    users: []
  },
  mutations: {
    ...vuexfireMutations
  },
  actions: {
    bindSubjects: firestoreAction(({ bindFirestoreRef }) =>
      bindFirestoreRef('subjects', db.collection('subjects'))
    ),
    unbindSubjects: firestoreAction(({ unbindFirestoreRef }) => {
      unbindFirestoreRef('subjects')
    }),
    bindUsers: firestoreAction(({ bindFirestoreRef }) =>
      bindFirestoreRef('users', db.collection('users'))
    ),
    unbindUsers: firestoreAction(({ unbindFirestoreRef }) => {
      unbindFirestoreRef('users')
    })
  },
  modules: {}
})
