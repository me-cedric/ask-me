import { MutationTree } from 'vuex'
import { State } from '.'

const mutations: MutationTree<State> = {
  setUser(state, payload) {
    state.user = payload
  },
  setSubjects(state, payload) {
    state.subjects = payload
  },
  setQuestions(state, payload) {
    state.questions = payload
  },
  setError(state, payload) {
    state.error = payload
  }
}

export default mutations
