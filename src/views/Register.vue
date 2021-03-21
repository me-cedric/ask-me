<template>
  <ion-page>
    <navbar title="Register"></navbar>

    <ion-content :fullscreen="true" id="content">
      <ion-card>
        <ion-card-content>
          <div
            v-if="validationErrors.length"
            class="notification is-danger is-light"
          >
            <ion-button @click="resetError()" class="delete"></ion-button>
            <div class="content">
              Please resolve the following error(s) before proceeding.
              <ul style="margin-top:0.3em; margin-left: 1em">
                <li
                  v-for="(error, index) in validationErrors"
                  :key="`error-${index}`"
                  v-html="error"
                />
              </ul>
            </div>
          </div>
          <form>
            <div class="field">
              <label class="label">E-mail</label>
              <div class="control">
                <input
                  v-model="email"
                  class="input"
                  type="text"
                  autocomplete="email"
                  placeholder="example@email.com"
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input
                  v-model="password"
                  class="input"
                  type="password"
                  autocomplete="current-password"
                  placeholder="Password"
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Repeat password</label>
              <div class="control">
                <input
                  v-model="passwordRepeat"
                  class="input"
                  type="password"
                  autocomplete="new-password"
                  placeholder="Password"
                />
              </div>
            </div>
            <div class="field">
              <p class="control">
                <ion-button
                  @click.prevent="validate()"
                  class="button is-success"
                >
                  Register
                </ion-button>
              </p>
            </div>
          </form>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonButton,
  IonCard,
  IonCardContent,
  IonPage
} from '@ionic/vue'
import { defineComponent } from 'vue'
import { mapActions } from 'vuex'
import Navbar from '@/components/Navbar.vue'

export default defineComponent({
  name: 'Register',
  components: {
    IonContent,
    IonButton,
    IonCard,
    IonCardContent,
    IonPage,
    Navbar
  },
  data: (): any => ({
    email: null,
    password: null,
    passwordRepeat: null,
    validationErrors: []
  }),
  methods: {
    ...mapActions(['signUpAction']),
    resetError() {
      this.validationErrors = []
    },
    validate() {
      // Clear the errors before we validate again
      this.resetError()
      // email validation
      if (!this.email) {
        this.validationErrors.push('<strong>E-mail</strong> cannot be empty.')
      }
      if (/.+@.+/.test(this.email) != true) {
        this.validationErrors.push('<strong>E-mail</strong> must be valid.')
      }
      // password validation
      if (!this.password) {
        this.validationErrors.push('<strong>Password</strong> cannot be empty')
      }
      if (/.{6,}/.test(this.password) != true) {
        this.validationErrors.push(
          '<strong>Password</strong> must be at least 6 characters long'
        )
      }
      if (!(this.password === this.passwordRepeat)) {
        this.validationErrors.push('<strong>Passwords</strong> did not match')
      }
      // when valid then sign in
      if (this.validationErrors.length <= 0) {
        this.signUp()
      }
    },
    signUp() {
      this.signUpAction({ email: this.email, password: this.password })
    }
  }
})
</script>
