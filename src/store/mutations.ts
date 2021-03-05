import { MutationTree } from 'vuex'
import { State } from '.'

const mutations: MutationTree<State> = {
  setUser(state, payload) {
    state.user = payload
  },
  setError(state, payload) {
    state.error = payload
  }
}

export default mutations
