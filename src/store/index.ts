import { Subject } from '@/data/subject'
import { User } from '@/data/user'
import { createStore } from 'vuex'
import '@/plugins/firebaseDatabase'
// import { vuexfireMutations, firestoreAction } from 'vuexfire'
// import { db } from '@/plugins/firebaseDatabase'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import { Question } from '@/data/question'

export interface State {
  subjects: Subject[]
  questions: Question[]
  users: User[]
  user?: User
  error?: string
}

const initialState = (): State => ({
  subjects: [], // Will be bound as an array
  questions: [],
  user: null, // Will be bound as an object
  users: [],
  error: null
})

export default createStore<State>({
  state: initialState(),
  mutations /*:  {
    ...vuexfireMutations,
  } */,
  actions /*:  {
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
  } */,
  getters,
  modules: {}
})
