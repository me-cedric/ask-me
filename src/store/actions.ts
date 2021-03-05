import { ActionTree } from 'vuex'
import { State } from '.'
import { firebaseApp } from '@/plugins/firebaseDatabase'

const actions: ActionTree<State, State> = {
  signUpAction({ commit }, payload) {
    firebaseApp
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then((response) => {
        commit('setUser', response.user)
      })
      .catch((error) => {
        commit('setError', error.message)
      })
  },
  signInAction({ commit }, payload) {
    return firebaseApp
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then((response) => {
        commit('setUser', response.user)
      })
      .catch((error) => {
        commit('setError', error.message)
      })
  }
}

export default actions
