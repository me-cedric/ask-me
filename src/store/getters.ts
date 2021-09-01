import { GetterTree } from 'vuex'
import { State } from '.'

const getters: GetterTree<State, State> = {
  user(state) {
    return state.user
  },
  isUserAuth(state) {
    return state.user != null && state.userSignedIn == true
  },
  isUserNotAuthed(state) {
    return state.user == null && state.userSignedIn != true
  },
  error(state) {
    return state.error
  },
  subjects(state) {
    return state.subjects
  },
  subject(state) {
    return state.subject
  }
}

export default getters
