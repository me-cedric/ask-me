import { Subject } from '@/data/subject'
import { User } from '@/data/user'
import { createStore } from 'vuex'
import '@/plugins/firebaseDatabase'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { collection } from 'firebase/firestore'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import { Question } from '@/data/question'
import { db } from '@/plugins/firebaseDatabase'

export interface State {
  subjects: Subject[]
  subject: Subject
  questions: Question[]
  userSignedIn?: boolean
  users: User[]
  user?: User
  error?: string
}

const initialState = (): State => ({
  subjects: [], // Will be bound as an array
  subject: null,
  questions: [],
  userSignedIn: null, // Will be bound as an object
  user: null, // Will be bound as an object
  users: [],
  error: null
})

export default createStore<State>({
  state: initialState(),
  mutations :  {
    ...vuexfireMutations,
    ...mutations
  },
  actions :  {
    bindSubjects: firestoreAction(({ bindFirestoreRef }) =>
      bindFirestoreRef('subjects', collection(db, 'subjects'))
    ),
    unbindSubjects: firestoreAction(({ unbindFirestoreRef }) => {
      unbindFirestoreRef('subjects')
    }),
    bindUsers: firestoreAction(({ bindFirestoreRef }) =>
      bindFirestoreRef('users', collection(db, 'users'))
    ),
    unbindUsers: firestoreAction(({ unbindFirestoreRef }) => {
      unbindFirestoreRef('users')
    }),
    ...actions
  },
  getters,
  modules: {}
})
