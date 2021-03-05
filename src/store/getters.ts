import { GetterTree } from 'vuex'
import { State } from '.'

const getters: GetterTree<State, State> = {
  getUser(state) {
    return state.user
  },
  isUserAuth(state) {
    return !!state.user
  },
  getError(state) {
    return state.error
  }
}

export default getters
