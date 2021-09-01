import { MutationTree } from 'vuex'
import { State } from '.'

const mutations: MutationTree<State> = {
  setUser(state, payload) {
    state.user = payload
  },
  setSubjects(state, payload) {
    state.subjects = payload
  },
  setSubject(state, payload) {
    state.subject = payload
  },
  setQuestions(state, payload) {
    state.questions = payload
  },
  setError(state, payload) {
    state.error = payload
  },
  setUserSignInStatus(state, payload) {
    state.userSignedIn = payload
  }
}

export default mutations
